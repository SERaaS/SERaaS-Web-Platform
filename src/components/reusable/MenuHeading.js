import React from 'react';
import logo from '../../assets/logo.png';

class MenuHeading extends React.Component {

  render() {

    return (
      <div className="menuHeading">
        <div className="ui segment">
          <h1 className="ui title">
            <img src={logo} width={40} style={{ marginRight: "10px", float: "left" }} />
            Speech Emotion Recognition as a Service
          </h1>
        </div>
      </div>
    );
  };
};

export default MenuHeading;