import React from 'react';
import { withRouter } from "react-router-dom";
import UserSessionHandler from '../utilities/userSessionHandler';
import APIUtils from '../utilities/APIUtils';

// UI dedicated components to build up the Dashboard
import TableAPICallToTimestamps from './dashboard/TableAPICallToTimestamps';
import TimeSeriesAPICallsPlot from './dashboard/TimeSeriesAPICallsPlot';
import EmotionBreakdownPlots from './dashboard/EmotionBreakdownPlots';
import TimeSeriesEmotionProbsPlot from './dashboard/TimeSeriesEmotionProbsPlot';

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
      mostRecentAPICallTimestampData: []
    };
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

        // Once all done, update state !
        temp.setState({ APICallTimestamps: _APICallTimestamps, mostRecentAPICallTimestampData: _mostRecentAPICallTimestampData });
      });
    });
  };

  render() {

    const { mostRecentAPICallTimestampData } = this.state;

    return (
      <div className='dashboardContent'>
        <div className="ui segment">
          <div className="ui vertical segment">
            <h1>Dashboard</h1>
          </div>
      
          <main className="mainContent">
            <TableAPICallToTimestamps mostRecentAPICallTimestampData={mostRecentAPICallTimestampData} style={{ marginTop: "20px" }} />
            
            <div class="ui divider"></div>

            <TimeSeriesAPICallsPlot mostRecentAPICallTimestampData={mostRecentAPICallTimestampData} style={{ marginTop: "20px" }} />

            <div class="ui divider"></div>

            <TimeSeriesEmotionProbsPlot mostRecentAPICallTimestampData={mostRecentAPICallTimestampData} style={{ marginTop: "20px" }} />
          
            <div class="ui divider"></div>

            <EmotionBreakdownPlots mostRecentAPICallTimestampData={mostRecentAPICallTimestampData} style={{ marginTop: "20px" }} />
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);