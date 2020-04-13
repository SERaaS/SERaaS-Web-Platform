import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

class TimeSeriesEmotionProbsPlot extends React.Component {

  constructor(props) {
    super(props);
  
    this.EMOTIONS_AVAILABLE = [ 'neutral', 'calm', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised' ];
  
    this.state = {

      // Storing the currently selected emotion to plot
      selectedEmotion: null
    };
  };

  /**
   * Sets the current emotion being selected for the time
   * series of emotion probabilities plotting.
   */
  onEmotionDropdownChange = (event, { value }) => {
    this.setState({ selectedEmotion: value });
  };

  /**
   * Creates an list of lists for the last 24 hours, sorted
   * in ascending order.
   */
  getTheLast24Hours = () => {
    const currentHour = new Date().getHours();

    let beforeThisHour = [],
      afterThisHour = [];
    for (let i = 0; i < 24; i += 1) {
      let _hour = i >= 10 ? `${i}:00` : `0${i}:00`;

      if (i <= currentHour) {
        if (i === currentHour) {
          _hour = "Now";
        };

        beforeThisHour.push({ hour: _hour, queriesMade: 0, probability: 0 });
      } else {
        afterThisHour.push({ hour: _hour, queriesMade: 0, probability: 0 });
      };      
    };

    // [24 Hours Before Now -> Now]
    return afterThisHour.concat(beforeThisHour);
  };

  /**
   * Builds a plottable list of emotions' probabilities queried per hour.
   */
  buildTimeSeriesEmotionProbsPlot = (temp, mostRecentAPICallTimestampData) => {
    const now = new Date(),
      hoursListing = temp.getTheLast24Hours();

    let timeSeriesEmotionProbsPlot = {};

    mostRecentAPICallTimestampData.forEach(function(it) {
      const hoursPassed = parseInt(((now.getTime() - new Date(it.dateCreated)) / 1000) / 3600),

        // Dates are sorted by ascending order to the current hour,
        // so current hour - hoursPassed = index
        hourListingIndex = hoursListing.length - hoursPassed - 1;

      if (hourListingIndex >= 0) {

        // Unique emotions queried for this single API call
        let uniqueEmotions = {}

        it.output.forEach(function(emotionObject) {
          const emotion = emotionObject.emotion;

          if (!uniqueEmotions[emotion]) {
            if (!timeSeriesEmotionProbsPlot[emotion]) {
            
              // Building up an hour listing for each emotion queried
              timeSeriesEmotionProbsPlot[emotion] = JSON.parse(JSON.stringify(hoursListing));
            };
  
            timeSeriesEmotionProbsPlot[emotion][hourListingIndex].probability += emotionObject.probability;
            timeSeriesEmotionProbsPlot[emotion][hourListingIndex].queriesMade ++;

            uniqueEmotions[emotion] = true;
          };
        });
      };
    });

    // Averaging the emotion probabilities queried to get a single aggregated result
    for (let emotion in timeSeriesEmotionProbsPlot) {
      if (timeSeriesEmotionProbsPlot.hasOwnProperty(emotion)) {
        timeSeriesEmotionProbsPlot[emotion].forEach(function(it) {
          if (it.queriesMade > 0) {
            it.probability /= it.queriesMade;
          };
        });
      };
    };

    return timeSeriesEmotionProbsPlot;
  };

  render() {

    const { mostRecentAPICallTimestampData } = this.props,
      { selectedEmotion } = this.state,
      temp = this;

    let timeSeriesEmotionProbsPlot = [],
      dropdownEmotionsListing = [];
    if (mostRecentAPICallTimestampData.length > 0) {
      timeSeriesEmotionProbsPlot = temp.buildTimeSeriesEmotionProbsPlot(temp, mostRecentAPICallTimestampData);
      dropdownEmotionsListing = Object.keys(timeSeriesEmotionProbsPlot).map(function(it) { return { key: it, value: it, text: it } });
    };

    return (
      <div>
        <h3>Emotion Probabilities Queried Over The Last 24 Hours</h3>

        <h5>Select Emotion To Plot</h5>
          <Dropdown
            placeholder="Plot Emotion"
            selection
            options={dropdownEmotionsListing}
            onChange={this.onEmotionDropdownChange}
            defaultValue={selectedEmotion}
          />

          {
            selectedEmotion !== null ?
          
            <ResponsiveContainer width="95%" height={300}>
              <LineChart data={timeSeriesEmotionProbsPlot[selectedEmotion]}
                margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>

                <XAxis dataKey="hour"/>
                <YAxis/>
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="probability" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>

            : ""
          }
      </div>
    );
  };
};

export default TimeSeriesEmotionProbsPlot;