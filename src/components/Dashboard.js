import React from 'react';
import { withRouter } from "react-router-dom";
import UserSessionHandler from '../utilities/userSessionHandler';
import APIUtils from '../utilities/APIUtils';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    const userSession = UserSessionHandler.getCurrentSession();
    
    // User cannot access dashboard if not logged in
    if (userSession == null) {
      this.props.history.push('/auth');
    };

    this.state = {
      userId: userSession,

      // Storing the most recent API call timestamps to visualise them
      APICallTimestamps: [],
      mostRecentAPICalls: []
    };
  };

  /**
   * Loading in all user's API call timestamp data upon page load.
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
        _mostRecentAPICalls = [];
      for (let i = startIndex; i < _APICallTimestamps.length; i += 1) {
        promises.push(
          APIUtils.getAPICallTimestampData(temp.state.userId, _APICallTimestamps[i])
          .then(function(_res) {
            _mostRecentAPICalls.push(_res.data);
          })
        )
      };

      // Once all done, update state !
      return Promise.all(promises)
      .then(function() {
        temp.setState({ APICallTimestamps: _APICallTimestamps, mostRecentAPICalls: _mostRecentAPICalls });
      });
    });
  };

  render() {
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
                  Table of most recent API calls and their timestamps
                </div>

                <div className="column">
                  Time series plot of API calls made over the day
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