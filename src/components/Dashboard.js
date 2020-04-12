import React from 'react';
import { withRouter } from "react-router-dom";
import UserSessionHandler from '../utilities/userSessionHandler';
import APIUtils from '../utilities/APIUtils';

// UI dedicated components to build up the Dashboard
import TableAPICallToTimestamps from './dashboard/TableAPICallToTimestamps';
import TimeSeriesAPICallsPlot from './dashboard/TimeSeriesAPICallsPlot';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    const userSession = UserSessionHandler.getCurrentSession();
    
    // User cannot access dashboard if not logged in
    if (userSession == null) {
      this.props.history.push('/auth');
    };

    this.EMOTIONS_AVAILABLE = [ 'neutral', 'calm', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised' ];

    this.state = {
      userId: userSession,

      // Storing the most recent API call timestamps to visualise them
      APICallTimestamps: [],
      
      // Includes individual API call timestamp metadata
      mostRecentAPICallTimestampData: [],

      // Most recent emotion probabilities queried over time
      emotionsOverTime: []
    };
  };

  /**
   * Generate the emotions' probabilities queried over time, from the
   * most recent API calls.
   */
  generateEmotionProbabilitiesOverTime = (mostRecentAPICallTimestampData) => {
    let emotionsOverTime = {};

    mostRecentAPICallTimestampData.forEach(function(it) {
      const uniqueEmotions = {};
      
      it.output.forEach(function(_it) {
        if (!uniqueEmotions[_it.emotion]) {
          uniqueEmotions[_it.emotion] = _it.probability;
        };
      });

      for (let emotion in uniqueEmotions) {
        if (uniqueEmotions.hasOwnProperty(emotion)) {
          if (!emotionsOverTime[emotion]) {
            emotionsOverTime[emotion] = [];
          }

          emotionsOverTime[emotion].push({ probability: uniqueEmotions[emotion], timestamp: it.dateCreated });
        };
      };
    });

    return emotionsOverTime;
  };

  /**
   * Loading in all user's API call timestamp data and generating associated
   * statistics (i.e. Emotions' probabilities queried over time) upon page load.
   */
  componentDidMount() {
    const temp = this,
      MOST_RECENT_API_CALLS_COUNT = 10

    return APIUtils.getAPICallTimestamps(temp.state.userId)
    .then(function(res) {

      // Returns a list of IDs corresponding to an API call timestamp
      const _APICallTimestamps = res.data,
        // Starting the loop from the 10th last index
        startIndex = _APICallTimestamps.length > 10 ? _APICallTimestamps.length - MOST_RECENT_API_CALLS_COUNT - 1 : 0; 
      
      // Retrieve the last 10 API calls' timestamp metadata
      let promises = [],
        _mostRecentAPICallTimestampData = [];
      for (let i = startIndex; i < _APICallTimestamps.length; i += 1) {
        promises.push(
          APIUtils.getAPICallTimestampData(temp.state.userId, _APICallTimestamps[i])
          .then(function(_res) {
            _mostRecentAPICallTimestampData.push(_res.data);
          })
        )
      };

      return Promise.all(promises)
      .then(function() {

        // Sort by most recent
        _mostRecentAPICallTimestampData = _mostRecentAPICallTimestampData.sort(function(a, b) { return new Date(b.dateCreated) - new Date(a.dateCreated) });

        // Generate emotions' probabilities queried over time statistic
        let _emotionsOverTime = temp.generateEmotionProbabilitiesOverTime(_mostRecentAPICallTimestampData);

        // Once all done, update state !
        temp.setState({ APICallTimestamps: _APICallTimestamps, mostRecentAPICallTimestampData: _mostRecentAPICallTimestampData, emotionsOverTime: _emotionsOverTime });
      });
    });
  };

  render() {

    const { mostRecentAPICallTimestampData, emotionsOverTime } = this.state;
    console.log(mostRecentAPICallTimestampData);
    console.log(emotionsOverTime);

    return (
      <div className='dashboardContent'>
        <div className="ui segment">
          <div className="ui vertical segment">
            <h1>Dashboard</h1>
          </div>
      
          <main className="mainContent">
            <div className="ui equal width center aligned padded grid">
              <div className="row">
                <div className="column">
                  <TableAPICallToTimestamps mostRecentAPICallTimestampData={mostRecentAPICallTimestampData} />
                </div>

                <div className="column">
                  <TimeSeriesAPICallsPlot mostRecentAPICallTimestampData={mostRecentAPICallTimestampData} />
                </div>
              </div>
              <div className="row">
                <div className="column">
                  Most recent 10 API calls (selectable via Dropdown) emotion (also selectable via Dropdown) breakdown plots 
                </div>

                <div className="column">
                  Time series plot of Emotion (selectable via Dropdown) queried's probabilities over time (aggregated from most recent 10 API calls)
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);