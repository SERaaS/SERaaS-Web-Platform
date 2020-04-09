import React from 'react';
import APIUtils from '../../utilities/APIUtils';

import { Dropdown, Progress, Message } from 'semantic-ui-react'
import EmotionPlot from '../reusable/EmotionPlot';

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
      doingAPICall: false,
      percentageProgressOfAPICall: 0,

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

    // Cannot make API call more than once
    if (this.state.didAPICall) {
      return;
    };

    const audioFile = new FormData();
    audioFile.append("file", this.state.selectedFile);

    const { APICallInputParameters } = this.state;
    let specifiedPeriod = APICallInputParameters.specifiedPeriod;
    specifiedPeriod = specifiedPeriod  === 0 ? null : specifiedPeriod;

    // Required for accessing "this" functions after API call
    const temp = this;

    // Continuously updating the progress bar percentage
    temp.setState({ doingAPICall: true, percentageProgressOfAPICall: 0 });
    const progressBarInterval = setInterval(function() {
      // Continously move up till 95%
      if (temp.state.percentageProgressOfAPICall < 95) {
        temp.setState({ percentageProgressOfAPICall: temp.state.percentageProgressOfAPICall += 3 });
      };
    }, 100);

    // Making the API call
    return APIUtils.query(audioFile, this.props.userId, APICallInputParameters.selectedEmotions, specifiedPeriod)
    .then(function(res) {
      temp.setState({ doingAPICall: false, didAPICall: true, APICallOutputBody: res.data.emotions, selectedEmotionToPlot: res.data.emotions[0].emotion });
      clearInterval(progressBarInterval);
    })
    .catch(function(err) {
      alert("Error occurred upon sample API call attempt.");
      temp.setState({ doingAPICall: false, didAPICall: false });
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

    const { APICallInputParameters, doingAPICall, percentageProgressOfAPICall, didAPICall, APICallOutputBody, selectedEmotionToPlot } = this.state,
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
            
            {
              !doingAPICall ?

              <div>
                <br /><br /><button className="ui primary button">Make Sample API Call</button>
              </div>

              :

              // Show progress bar if in the middle of the API call
              <div><br /><br /><Progress percent={percentageProgressOfAPICall} autoSuccess /></div>
            }
          </form>

          :

          // Display plot of output body if API call made
          <div>
            <br /><h5>Select Emotion to Plot</h5>
            <Dropdown
              placeholder="Plot Emotion"
              selection
              options={plotableEmotions}
              onChange={this.onEmotionsDropdownChange}
              defaultValue={selectedEmotionToPlot}
            />

            <EmotionPlot emotion={selectedEmotionToPlot} outputBody={APICallOutputBody} specifiedPeriod={APICallInputParameters.specifiedPeriod != 0} />
          </div>
        }
      </div>
    );
  };
};

export default MakeSampleAPICall;