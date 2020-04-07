import React from 'react';
import UserSessionHandler from '../utilities/userSessionHandler';

// Components for building up getting started page
import UsingAPITutorial from './getting-started/UsingAPITutorial';
import BasicCodeForAPIQueries from './getting-started/BasicCodeForAPIQueries';
import MakeSampleAPICall from './getting-started/MakeSampleAPICall';

class GettingStarted extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: UserSessionHandler.getCurrentSession() || 'your-own-unique-user-ID-here'
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

            <div className="usingAPI">
              <div className="ui vertical segment">
                <h3>Using the API</h3>
              </div>

              <div className="ui basic segment">
                <UsingAPITutorial userId={this.state.userId} />
              </div>
            </div>

            <div className="apiQueryCode">
              <div className="ui vertical segment">
                <h3>Basic Code for API Query</h3>
              </div>

              <div className="ui basic segment">
                <BasicCodeForAPIQueries />
              </div>
            </div>

            <div className="sampleAPICall">
              <div className="ui vertical segment">
                <h3>Make Sample API Call</h3>
              </div>

              <div className="ui basic segment">
                <MakeSampleAPICall userId={this.state.userId} />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };
};

export default GettingStarted;