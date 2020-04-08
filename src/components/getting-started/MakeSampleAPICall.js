import React from 'react';
import APIUtils from '../../utilities/APIUtils';

class MakeSampleAPICall extends React.Component {

  constructor(props) {
    super(props);

    this.defaultAPICallInputParameters = {
      selectedEmotions: [],
      specifiedPeriod: 0
    };

    this.EMOTIONS_AVAILABLE = [ 'all', 'neutral', 'calm', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised' ];

    this.state = {
      // Storing current file being selected for sample API call
      selectedFile: null,

      // Storing associated input params for sample API call
      APICallInputParameters: this.defaultAPICallInputParameters,

      // User can only make API call once per refresh
      didAPICall: false,
      APICallOutputBody: null
    };
  };

  /**
   * Sets the currently selected period for the sample API call.
   */
  onInputPeriodChange = (event) => {
    this.setState({ APICallInputParameters: { ...this.state.APICallInputParameters, specifiedPeriod: event.target.value } });
  };

  /**
   * Sets the currently selected file for the sample API call.
   */
  onInputFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  /**
   * Performs the sample API call upon button press.
   */
  onFormButtonClick = (event) => {
    event.preventDefault();

    const { didAPICall } = this.state;
    if (didAPICall) {
      return;
    };

    const audioFile = new FormData();
    audioFile.append("file", this.state.selectedFile);

    const { APICallInputParameters } = this.state;
    let specifiedPeriod = APICallInputParameters.specifiedPeriod;
    specifiedPeriod = specifiedPeriod  === 0 ? null : specifiedPeriod

    // Required for accessing "this" functions after API call
    const temp = this;

    return APIUtils.query(audioFile, this.props.userId, APICallInputParameters.selectedEmotions, specifiedPeriod)
    .then(function(res) {
      temp.setState({ didAPICall: true, APICallOutputBody: res.data });
    })
    .catch(function(err) {
      temp.setState({ didAPICall: true, APICallOutputBody: { error: err } });
    });
  };

  render() {

    // TODO: Display results in a graph showcasing the change of emotions overtime

    return (
      <div>
        <form onSubmit={this.onFormButtonClick} className="ui form">

          {/* API Endpoint URL */}  
          <h3 style={{ border: "dashed", padding: "10px", borderRadius: "10px" }}>POST <span style={{ marginLeft: "30px" }}>TODO_ADD_URL_HERE/analyse/<span className="highlight">{this.props.userId}</span>/<span class="highlight">emotions</span>/<span class="highlight">period</span></span></h3>

          <div className="fields">
            <div className="eight wide disabled field">
              <label>User ID</label>
              <div className="ui disabled input"><input type="text" placeholder={this.props.userId} /></div>
            </div>
          </div>
          <div className="fields">
            <div className="eight wide disabled field">
              <label>Emotions Selected</label>
              <div className="ui disabled input"><input type="text" placeholder="all" /></div>
            </div>
          </div>
          <div className="fields">
            <div className="two wide field">
              <label>Period</label>
              <div className="ui input"><input type="number" min="0" placeholder="0" onChange={this.onInputPeriodChange} /></div>
            </div>
          </div>

          <br /><div className="ui input">
            <input type="file" onChange={this.onInputFileChange} />
          </div>
          <br /><br /><button className="ui primary button">Make Sample API Call</button>
        </form>
      </div>
    );
  };
};

export default MakeSampleAPICall;