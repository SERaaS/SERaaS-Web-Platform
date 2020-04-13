import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

class EmotionPlot extends React.Component {

  /**
   * Formats a SERaaS API call output body to a plotable list by recharts
   */
  formatData = (outputBody, specifiedPeriod) => {

    if (specifiedPeriod) {
      // Time series plot if timestamps are available
      return outputBody.map(function(emotionObject) {
        return { name: emotionObject.duration.from, probability: emotionObject.probability };
      });

    } else {
      return outputBody.map(function(emotionObject, i) {
        return { name: `${emotionObject.emotion} ${i + 1}`, probability: emotionObject.probability };
      });
    };
  };

  render() {

    const { emotion, outputBody, specifiedPeriod } = this.props;
    let emotionData = this.formatData(outputBody.filter(function(emotionObject) {
      return emotionObject.emotion === emotion
    }), specifiedPeriod);

    if (emotionData.length === 0) {
      return (
        <p style={{ marginTop: "20px" }}>
          Invalid emotion <b>{emotion}</b> selected.
        </p>
      );
    } else {
      return (
        <LineChart width={400} height={300} data={emotionData}
          margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="probability" stroke="#8884d8" />
        </LineChart>
      )
    }
  };
};

export default EmotionPlot;