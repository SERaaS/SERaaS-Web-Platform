import React from 'react';
import { Form, Button } from 'semantic-ui-react'
import APIUtils from '../utilities/APIUtils';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    // Storing extra metadata to check if credentials are valid
    this.state = {
      username: { text: '', valid: false },
      password: { text: '', valid: false },
    };
  }

  isInvalidCredentials() {
    return !this.state.username.valid || !this.state.password.valid;
  };

  onChangeUsernameField = (req) => {
    this.setState({ username: { text: req.target.value, valid: req.target.value !== '' } });
  };

  onChangePasswordField = (req) => {
    const _password = req.target.value;
    let validPassword = true;

    // Password's length must be greater than 7
    if (_password === '' || _password.length < 7) {
      validPassword = false;
    }

    this.setState({ password: { text: _password, valid: validPassword } });
  };

  onClickRegisterButton = async () => {

    if (this.isInvalidCredentials()) {
      alert('Invalid username or password.');
      return;
    };

    try {
      const user = await APIUtils.register(this.state.username, this.state.password);

      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  onClickLoginButton = async () => {

    if (this.isInvalidCredentials()) {
      alert('Invalid username or password.');
      return;
    };

    try {
      const user = await APIUtils.login(this.state.username, this.state.password);

      console.log(user);
    } catch (err) {
      console.log(err);
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

export default LoginPage;