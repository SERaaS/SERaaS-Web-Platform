import React from 'react';

class EmotionPlot extends React.Component {

  render() {

    const { emotion, outputBody } = this.props;
    let emotionData = outputBody.filter(function(emotionObject) {
      return emotionObject.emotion === emotion
    });

    console.log(emotionData);

    if (emotionData.length === 0) {
      return (
        <p>
          Invalid emotion {emotion} selected.
        </p>
      );
    } else {
      return (
        <p>
          Wuuuu.
        </p>
      )
    }
  };
};

export default EmotionPlot;