import React from 'react';
import UserSessionHandler from '../utilities/userSessionHandler';

class Home extends React.Component {

  constructor(props) {
    super(props);

    // Storing whether user is logged in for appropriate tab display
    this.state = {
      loggedIn: UserSessionHandler.getCurrentSession() == true
    };
  };

  render() {

    return (
      <div className="loginPage">
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