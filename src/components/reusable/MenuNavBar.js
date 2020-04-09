import React from 'react';
import { withRouter } from "react-router-dom";
import UserSessionHandler from '../../utilities/userSessionHandler';

// Render components
import { Menu } from 'semantic-ui-react'

class MenuNavBar extends React.Component {

  constructor(props) {
    super(props);

    this.MENU_ITEMS = {
      'dashboard': {
        div: <Menu.Item name='dashboard' key={1} onClick={this.onMenuItemClick}>Dashboard</Menu.Item>,
        route: '/'
      },
    
      'login': {
        div: <Menu.Item name='login' key={2} onClick={this.onMenuItemClick}>Log In</Menu.Item>,
        route: '/auth'
      },

      'getStarted': {
        div: <Menu.Item name='getStarted' key={3} onClick={this.onMenuItemClick}>Getting Started</Menu.Item>,
        route: '/getstarted'
      },

      'logout': {
        div: <Menu.Item name='logout' key={4} onClick={this.onMenuItemClick}>Log Out</Menu.Item>,
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

      // Log the user out if requested
      if (name == "logout") {
        UserSessionHandler.removeCurrentSession();
        this.setState({ loggedIn: false });
      };

      this.props.history.push(this.MENU_ITEMS[name].route);
    };
  };

  /**
   * Ensuring that the logged in state is correct
   */
  componentDidUpdate() {
    let actuallyLoggedIn = UserSessionHandler.getCurrentSession() != null;
    if (actuallyLoggedIn != this.state.loggedIn) {
      this.setState({ loggedIn: actuallyLoggedIn });
    };
  };

  render() {

    const { loggedIn } = this.state;

    let menuItems = [
      // Show dashboard or login tab depending on current authenticated status
      loggedIn ? this.MENU_ITEMS.dashboard.div : this.MENU_ITEMS.login.div,
      
      this.MENU_ITEMS.getStarted.div
    ];

    // Show logout option if logged in
    if (loggedIn) {
      menuItems.push(this.MENU_ITEMS.logout.div);
    };

    return (
      <Menu className="menuNavBar">
        { menuItems }
      </Menu>
    );
  };
};

export default withRouter(MenuNavBar);