import React from 'react';
import { Form, Button } from 'semantic-ui-react'
import APIUtils from '../utilities/APIUtils';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  onChangeUsernameField = (req) => {
    this.setState({ username: req.target.value });
  }

  onChangePasswordField = (req) => {
    this.setState({ password: req.target.value });
  }

  onClickRegisterButton = async () => {
    try {
      const user = await APIUtils.register(this.state.username, this.state.password);

      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }

  onClickLoginButton = async () => {
    try {
      const user = await APIUtils.login(this.state.username, this.state.password);

      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }
  
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