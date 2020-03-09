import React from 'react';
import { Form, Button } from 'semantic-ui-react'

class LoginPage extends React.Component {
  render() {
    return (
			<Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' type='email' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' type='password' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default LoginPage;