import React from 'react';
import { withRouter } from "react-router-dom";
import UserSessionHandler from '../../utilities/userSessionHandler';

// Render components
import { Menu } from 'semantic-ui-react'

class MenuNavBar extends React.Component {

  constructor(props) {
    super(props);

    this.MENU_ITEMS = {
      'home': {
        div: <Menu.Item name='home' onClick={this.onMenuItemClick}>Home</Menu.Item>,
        route: '/'
      },

      'dashboard': {
        div: <Menu.Item name='dashboard' onClick={this.onMenuItemClick}>Dashboard</Menu.Item>,
        route: '/dashboard'
      },
    
      'login': {
        div: <Menu.Item name='login' onClick={this.onMenuItemClick}>Log In</Menu.Item>,
        route: '/auth'
      },

      'getStarted': {
        div: <Menu.Item name='getStarted' onClick={this.onMenuItemClick}>Getting Started</Menu.Item>,
        route: '/getstarted'
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
    };
  };

  render() {

    let menuItems = [
      this.MENU_ITEMS.home.div,
      this.MENU_ITEMS.getStarted.div,

      // Show dashboard or login tab depending on current authenticated status
      this.state.loggedIn ? this.MENU_ITEMS.dashboard.div : this.MENU_ITEMS.login.div
    ];

    return (
      <Menu className="menuNavBar">
        { menuItems }
      </Menu>
    );
  };
};

export default withRouter(MenuNavBar);