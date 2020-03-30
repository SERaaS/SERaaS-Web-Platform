import React from 'react';

class Home extends React.Component {

  render() {

    return (
      <div className="homePage">
        <div className="ui segment">
          <h1>Home Page</h1>
        </div>

        <div className="ui segment">
          This is the home page of Speech Emotion Recognition as a Service's Web Platform!
        </div>
      </div>
    );
  };
};

export default Home;