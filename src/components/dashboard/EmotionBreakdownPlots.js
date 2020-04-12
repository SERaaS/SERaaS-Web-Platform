import React from 'react';
import EmotionPlot from '../reusable/EmotionPlot';
import { Dropdown } from 'semantic-ui-react';

class EmotionBreakdownPlots extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {

      // Saving the current API being selected for plotting.
      selectedAPICall: null,

      // Associated emotion with API call
      selectedEmotion: null
    };
  };

  /**
   * Sets the current API call being selected for emotion breakdown
   * plotting.
   */
  onAPICallDropdownChange = (event, { value }) => {
    this.setState({ selectedAPICall: value });
  };

  /**
   * Sets the current emotion being selected for emotion breakdown
   * plotting.
   */
  onEmotionDropdownChange = (event, { value }) => {
    this.setState({ selectedEmotion: value });
  };

  /**
   * Builds a dropdown list of API calls available for emotion breakdown
   * plots.
   */
  buildDropdownAPICallsListing = (temp, mostRecentAPICallTimestampData) => {
    return mostRecentAPICallTimestampData.map(function(it) {
      return { key: it._id, value: it._id, text: it._id };
    });
  };

  /**
   * Builds a dropdown list of plotable emotions for the selected API call.
   */
  buildDropdownEmotionsListing = (temp, foundAPICall, selectedAPICall) => {
    if (selectedAPICall === null) {
      return;
    };

    let plotableEmotions = new Set();
    foundAPICall.output.forEach(function(it) {
      plotableEmotions.add(it.emotion);
    });

    plotableEmotions = Array.from(plotableEmotions);
    return plotableEmotions.map(function(it) {
      return { key: it, value: it, text: it };
    });
  };

  render() {

    const { mostRecentAPICallTimestampData } = this.props,
      { selectedAPICall, selectedEmotion } = this.state,
      temp = this;

    let dropdownAPICallsListing = [],
      dropdownEmotionsListing = [],
      foundAPICall = null;
    if (mostRecentAPICallTimestampData.length > 0) {
      dropdownAPICallsListing = temp.buildDropdownAPICallsListing(temp, mostRecentAPICallTimestampData);
      foundAPICall = mostRecentAPICallTimestampData.find(function(it) { return it._id === selectedAPICall });

      dropdownEmotionsListing = temp.buildDropdownEmotionsListing(temp, foundAPICall, selectedAPICall);
    };
    
    return (
      <div>
          <h3>Plot of Emotions for an API Call</h3>

          <h5>Select API Call To Plot</h5>
          <Dropdown
            placeholder="Select API Call"
            selection
            options={dropdownAPICallsListing}
            onChange={this.onAPICallDropdownChange}
            defaultValue={selectedAPICall}
          />

          <h5>Select Emotion To Plot</h5>
          <Dropdown
            placeholder="Plot Emotion"
            selection
            options={dropdownEmotionsListing}
            onChange={this.onEmotionDropdownChange}
            defaultValue={selectedAPICall}
          />

          {
            (foundAPICall !== null && selectedEmotion !== null) ?

            <EmotionPlot emotion={selectedEmotion} outputBody={foundAPICall.output} selectedAPICall={foundAPICall.paramPeriodicQuery !== -1} />

            : ""
          }
      </div>
    );
  };
};

export default EmotionBreakdownPlots;