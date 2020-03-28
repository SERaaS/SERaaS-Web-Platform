import React from 'react';
import { withRouter } from "react-router-dom";
import UserSessionHandler from '../utilities/userSessionHandler';

// Render components
import { Menu } from 'semantic-ui-react'

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.MENU_ITEMS = {
      'dashboard': {
        div: <Menu.Item name='dashboard' onClick={this.onMenuItemClick}>Dashboard</Menu.Item>,
        route: '/dashboard'
      },
    
      'login': {
        div: <Menu.Item name='login' onClick={this.onMenuItemClick}>Log In</Menu.Item>,
        route: '/auth'
      }
    };

    // Storing whether user is logged in for appropriate tab display
    this.state = {
      loggedIn: UserSessionHandler.getCurrentSession() != null
    };
  };

  /**
   * Routing the user to the appropriate component.
   */
  onMenuItemClick = (event, { name }) => {
    
    if (this.MENU_ITEMS[name]) {
      this.props.history.push(this.MENU_ITEMS[name].route);
    }
  };

  render() {

    // Show dashboard or login tab depending on current authenticated status
    let menuItems = [this.state.loggedIn ? this.MENU_ITEMS.dashboard.div : this.MENU_ITEMS.login.div];

    return (
      <div className="loginPage">
        <div className="ui segment">
          <h1>Home Page</h1>
        </div>

        <Menu>
          <Menu.Item
            name='home'
            onClick={this.onMenuItemClick}
          >
            Home
          </Menu.Item>

          { menuItems }
        </Menu>

        <div className="ui segment">
          This is the home page of Speech Emotion Recognition as a Service's Web Platform!
        </div>
      </div>
    );
  };
};

export default withRouter(Home);