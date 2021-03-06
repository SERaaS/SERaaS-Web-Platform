import React from 'react';
import UserSessionHandler from '../utilities/userSessionHandler';

// Components for building up getting started page
import UsingAPITutorial from './getting-started/UsingAPITutorial';
import BasicCodeForAPIQueries from './getting-started/BasicCodeForAPIQueries';
import MakeSampleAPICall from './getting-started/MakeSampleAPICall';

class GettingStarted extends React.Component {

  constructor(props) {
    super(props);

    const userSession = UserSessionHandler.getCurrentSession();

    this.state = {
      // What to show for the API endpoint descriptor
      userId: userSession || 'your-own-unique-user-ID-here',
      loggedIn: userSession != null
    };
  };

  render() {

    return (
      <div className="gettingStarted">
        <div className="ui segment">
          <div className="ui vertical segment">
            <h1>Getting Started with SERaaS</h1>
          </div>

          <main className="mainContent">
            
            {/* Diagram of SERaaS Process */}
            <br /><div className="ui steps">
              <div className="active step">
                <i aria-hidden="true" className="upload icon"></i>
                <div className="content">
                  <div className="title">Your System</div>
                  <div className="description">Send audio file</div>
                </div>
              </div>
              <div className="step">
                <i aria-hidden="true" className="file audio icon"></i>
                <div className="content">
                  <div className="title">SERaaS</div>
                  <div className="description">Processes emotions from audio file</div>
                </div>
              </div>
              <div className="step">
                <i aria-hidden="true" className="info icon"></i>
                <div className="content"><div className="title">Emotional Statistics</div></div>
              </div>
            </div>

            {/* How a user uses the API */}
            <div className="usingAPI">
              <div className="ui vertical segment">
                <h3>Using the API</h3>
              </div>

              <div className="ui basic segment">
                <UsingAPITutorial userId={this.state.userId} />
              </div>
            </div>

            {/* Example code for using the API */}
            <div className="apiQueryCode">
              <div className="ui vertical segment">
                <h3>Basic Code for API Query</h3>
              </div>

              <div className="ui basic segment">
                <BasicCodeForAPIQueries />
              </div>
            </div>

            {/* Make a sample API call from the Web Platform */}
            <div className="sampleAPICall">
              <div className="ui vertical segment">
                <h3>Make Sample API Call</h3>
              </div>

              <div className="ui basic segment">
                <MakeSampleAPICall userId={this.state.userId} loggedIn={this.state.loggedIn} />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };
};

export default GettingStarted;