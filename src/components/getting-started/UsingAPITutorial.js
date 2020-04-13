import React from 'react';

class UsingAPITutorial extends React.Component {

  render() {

    const { userId } = this.props;

    return (
      <div>
        <p>The SERaaS product is the singular API endpoint that any registered SERaaS
        user can have access to. The highlighted input query parameters of the API endpoint are defined below.</p>

        <p>It is required that the audio file must be sent as a POST form-data key-value pair, where its key is named
          as <span className="highlight">file</span>. Note that when sending in the audio file, the length
          should be no more than 10 seconds to allow for a sufficient response time from SERaaS for processing.</p>

        {/* API Endpoint URL */}
        <h3 style={{ border: "dashed", padding: "10px", borderRadius: "10px" }}>POST <span style={{ marginLeft: "30px" }}>{ `${window.location.protocol}//${window.location.hostname}` }/analyse/<span className="highlight">userId</span>/<span className="highlight">emotions</span>/<span className="highlight">period</span></span></h3>

        {/* Input Parameters */}
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
              <td className="">{userId}<br /><span className="lowerCase">In your case</span><br /><span className="lowerCase"><b>String</b></span></td>
            </tr>
            <tr className="">
              <td className="">emotions</td>
              <td className="">These are the list of emotions you would like to examine from your audio file<br /><span className="lowerCase">e.g. <b>/analyse/{userId}/angry,happy</b> would output both the angry and happy emotion statistics.</span></td>
              <td>Yes</td>
              <td className="">all, neutral, calm, happy, sad, angry, fearful, disgusted, surprised<br /><span className="lowerCase"><b>String</b></span></td>
            </tr>
            <tr className="">
              <td className="">period</td>
              <td className="">If specified, breaks down the audio file into smaller audio file chunks for the interval given, and analyses each individually<br /><span className="lowerCase">e.g. <b>{ `${window.location.protocol}//${window.location.hostname}` }/analyse/{userId}/all/2</b> would output all the emotional statistics for every 2 seconds of the audio file.</span></td>
              <td>No</td>
              <td className="">1 -> Length of Audio File (in seconds)<br /><span className="lowerCase"><b>Integer</b></span></td>
            </tr>
          </tbody>
        </table>

        {/* Output Body */}
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
    )
  };
};

export default UsingAPITutorial;