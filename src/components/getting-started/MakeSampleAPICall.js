import React from 'react';
import APIUtils from '../../utilities/APIUtils';
import { Dropdown } from 'semantic-ui-react'

class MakeSampleAPICall extends React.Component {

  constructor(props) {
    super(props);

    this.defaultSelectedEmotion = "all";

    this.defaultAPICallInputParameters = {
      selectedEmotions: [ this.defaultSelectedEmotion ],
      specifiedPeriod: 0
    };

    this.EMOTIONS_AVAILABLE = [ 'neutral', 'calm', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised' ];

    this.state = {
      // Storing current file being selected for sample API call
      selectedFile: null,

      // Storing associated input params for sample API call
      APICallInputParameters: this.defaultAPICallInputParameters,

      // User can only make API call once per refresh
      didAPICall: false,
      APICallOutputBody: null,
      selectedEmotionToPlot: this.EMOTIONS_AVAILABLE[0]
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
      temp.setState({ didAPICall: true, APICallOutputBody: res.data, selectedEmotionToPlot: APICallInputParameters.selectedEmotions[0] });
    })
    .catch(function(err) {
      temp.setState({ didAPICall: true, APICallOutputBody: { error: err } });
    });
  };

  /**
   * Sets the currently selected emotion to plot after API call is made.
   */
  onEmotionsDropdownChange = (event, { value }) => {
    this.setState({ selectedEmotionToPlot: value })
  };

  /**
   * Generates a list of dropdowns of the emotions available for plotting after API call is made.
   */
  getPlotableEmotions = (selectedEmotions) => {
    const allSelected = selectedEmotions.indexOf("all") >= 0,
      emotionsMapper = allSelected ? this.EMOTIONS_AVAILABLE : selectedEmotions;

    return emotionsMapper.map(function(emotion) {
      return { key: emotion, value: emotion, text: emotion };
    });
  };

  render() {

    const { APICallInputParameters, didAPICall, selectedEmotionToPlot } = this.state,
      selectedEmotions = APICallInputParameters.selectedEmotions;
    let selectedEmotionsString = selectedEmotions.length === 0 ? "all" : selectedEmotions.join(),
      plotableEmotions = this.getPlotableEmotions(selectedEmotions);

    return (
      <div>
        {/* API Endpoint URL */}  
        <h3 style={{ border: "dashed", padding: "10px", borderRadius: "10px" }}>POST <span style={{ marginLeft: "30px" }}>TODO_ADD_URL_HERE/analyse/<span className="highlight">{this.props.userId}</span>/<span class="highlight">{selectedEmotionsString}</span>/<span class="highlight">{APICallInputParameters.specifiedPeriod}</span></span></h3>

        {
          !didAPICall ? 
        
          <form onSubmit={this.onFormButtonClick} className="ui form">
            <br /><div className="fields">
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

          :

          <div>
            <br /><h5>Select Emotion to Plot</h5>
            <Dropdown
              placeholder="Plot Emotion"
              selection
              options={plotableEmotions}
              onChange={this.onEmotionsDropdownChange}
              defaultValue={selectedEmotionToPlot}
            />
          </div>
        }
      </div>
    );
  };
};

export default MakeSampleAPICall;