import React from 'react';
import { withRouter } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'
import APIUtils from '../utilities/APIUtils';
import UserSessionHandler from '../utilities/userSessionHandler';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    // Storing extra metadata to check if credentials are valid
    this.state = {
      username: { text: '', valid: false },
      password: { text: '', valid: false }
    };
  }

  /**
   * Checking if the username or password fail generic validation checks.
   */
  isInvalidCredentials() {
    return !this.state.username.valid || !this.state.password.valid;
  };

  /**
   * Update the username state upon change.
   */
  onChangeUsernameField = (req) => {
    this.setState({ username: { text: req.target.value, valid: req.target.value !== '' } });
  };

  /**
   * Update the password state upon change.
   */
  onChangePasswordField = (req) => {
    const _password = req.target.value;
    let validPassword = true;

    // Password's length must be greater than 7
    if (_password === '' || _password.length < 7) {
      validPassword = false;
    }

    this.setState({ password: { text: _password, valid: validPassword } });
  };

  /**
   * Attempt to register user upon button press.
   */
  onClickRegisterButton = async () => {

    if (this.isInvalidCredentials()) {
      alert('Invalid username or password.');
      return;
    };

    try {
      const res = await APIUtils.register(this.state.username.text, this.state.password.text);

      // Set new user as current user and redirect to dashboard
      UserSessionHandler.setCurrentSession(res.data._id);
      this.props.history.push('/dashboard');
    } catch (err) {
      alert('Error occurred upon registration attempt.');
    }
  };

  /**
   * Attempt to login user upon button press.
   */
  onClickLoginButton = async () => {

    if (this.isInvalidCredentials()) {
      alert('Invalid username or password.');
      return;
    };

    try {
      const res = await APIUtils.login(this.state.username.text, this.state.password.text);

      // Set logged user as current user and redirect to dashboard
      UserSessionHandler.setCurrentSession(res.data._id);
      this.props.history.push('/dashboard');
    } catch (err) {
      alert('Error occurred upon login attempt.');
    }
  };
  
  render() {
    return (
      <div className="loginPage">
        <div className="ui segment">
          <h1>Login Page</h1>
        </div>

        <Form className='ui segment'>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username' onChange={this.onChangeUsernameField} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' type='password' onChange={this.onChangePasswordField} />
          </Form.Field>
          <Button type='submit' color='blue' onClick={this.onClickRegisterButton}>Register</Button>
          <Button type='submit' color='blue' onClick={this.onClickLoginButton}>Login</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(LoginPage);