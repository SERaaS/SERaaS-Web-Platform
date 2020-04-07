import React from 'react';
import UserSessionHandler from '../utilities/userSessionHandler';

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
                <p>The SERaaS product is the singular API endpoint that any registered SERaaS
                user can have access to. The highlighted input query parameters of the API endpoint are defined below.</p>

                <h3 style={{ border: "dashed", padding: "10px", borderRadius: "10px" }}>POST <span style={{ marginLeft: "30px" }}>TODO_ADD_URL_HERE/analyse/<span className="highlight">userId</span>/<span class="highlight">emotions</span>/<span class="highlight">period</span></span></h3>

                <h5>Input Query Parameters</h5>
                <table className="ui celled table">
                  <thead className="">
                    <tr className="">
                      <th className=""></th>
                      <th className="">Description</th>
                      <th className="">Required</th>
                      <th className="">Parameters</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr className="">
                      <td className="">userId</td>
                      <td className="">This is the unique ID of the user making the query</td>
                      <td>Yes</td>
                      <td className="">{this.state.userId}<br /><span className="lowerCase">In your case</span><br /><span className="lowerCase"><b>String</b></span></td>
                    </tr>
                    <tr className="">
                      <td className="">emotions</td>
                      <td className="">These are the list of emotions you would like to examine from your audio file<br /><span className="lowerCase">e.g. <b>TODO_ADD_URL_HERE/analyse/{this.state.userId}/angry</b> would output just the angry emotion statistic.</span></td>
                      <td>Yes</td>
                      <td className="">all, neutral, calm, happy, sad, angry, fearful, disgusted, surprised<br /><span className="lowerCase"><b>String</b></span></td>
                    </tr>
                    <tr className="">
                      <td className="">period</td>
                      <td className="">If specified, breaks down the audio file into smaller audio file chunks for the interval given, and analyses each individually<br /><span className="lowerCase">e.g. <b>TODO_ADD_URL_HERE/analyse/{this.state.userId}/all/2</b> would output all the emotional statistics for every 2 seconds of the audio file.</span></td>
                      <td>No</td>
                      <td className="">1 -> Length of Audio File (in seconds)<br /><span className="lowerCase"><b>Integer</b></span></td>
                    </tr>
                  </tbody>
                </table>

                <h5>Output Body</h5>
                <p>Note that the output body is a JSON object. It is an array of an emotion objects. A single emotion object is defined below.</p>

                <table className="ui celled table">
                  <thead className="">
                    <tr className="">
                      <th className=""></th>
                      <th className="">Description</th>
                      <th className="">Output</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr className="">
                      <td className="">emotion</td>
                      <td className="">The emotion analysed from the file. For each emotion queried, a separate emotion object is made for it.<br /><span className="lowerCase">e.g. <b>happy</b> means that the current emotion being analysed is happiness.</span></td>
                      <td className="">neutral, calm, happy, sad, angry, fearful, disgusted, surprised<br /><span className="lowerCase"><b>String</b></span></td>
                    </tr>
                    <tr className="">
                      <td className="">probability</td>
                      <td className="">How much of the emotion was shown from the file; this is the emotional statistic percentage.<br /><span className="lowerCase">e.g. <b>72</b> means that the audio file is highly correlated with the emotion being analysed.</span></td>
                      <td className="">0 -> 100<br /><span className="lowerCase"><b>Integer</b></span></td>
                    </tr>
                    <tr className="">
                      <td className="">duration</td>
                      <td className="">Only added if period is specified. Indicates the period of audio being analysed. For each period of the audio file, a separate emotion object is made for it.<br /><span className="lowerCase">e.g. <b>{"{ from: '00:02', to: '00:04'}"}</b> means that the period was 2s, and the current section of the audio file being analysed is from <b>00:02</b> to <b>00:04</b>.</span></td>
                      <td className="">00:00 -> Length of Audio File<br /><span className="lowerCase"><b>Object of Strings</b></span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="apiQueryCode">
              <div className="ui vertical segment">
                <h3>Basic Code for API Query</h3>
              </div>

              <div className="ui basic segment">

              </div>
            </div>

            <div className="sampleAPICall">
              <div className="ui vertical segment">
                <h3>Make Sample API Call</h3>
              </div>

              <div className="ui basic segment">

              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };
};

export default GettingStarted;