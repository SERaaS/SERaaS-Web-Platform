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
      mostRecentAPICall: {}
    };
  };

  /**
   * Loading in all user's API call timestamp data upon page load.
   */
  componentDidMount() {
    const temp = this;

    return APIUtils.getAPICallTimestamps(temp.state.userId)
    .then(function(res) {

      // Getting the most recent API call's metadata
      return APIUtils.getAPICallTimestampData(temp.state.userId, res.data[res.data.length - 1])
      .then(function(_res) {
        temp.setState({ APICallTimestamps: res.data, mostRecentAPICall: _res.data });
      })
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