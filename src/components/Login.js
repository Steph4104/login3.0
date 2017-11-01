import React, { Component } from 'react'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import logo from '../img/govt-of-canada-logo.png';

import { Link } from 'react-router-dom'

class Login extends Component {

  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: ''
  }

  render() {

    return (
      <div>
<img src={logo} alt='Government canada logo'/>
        <h1 className='mv3'>{this.state.login ? 'GCTools Sign In' : 'Sign Up'}</h1>
        <div className='flex flex-column'>
          {!this.state.login &&
<div>
	<label htmlFor='username'>Username</label>
          <input
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
		name='username'
            placeholder='Your name'
          />
</div>}
	<label htmlFor='email'>Username or Email</label>
          <input
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type='text'
		name='email'
            placeholder='Your email address'
          /><br/>
<label htmlFor="password">Password</label><br/>
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
name='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flex mt3'>

          <div
            className='pointer  button'
          
          >
<Link to='/search' className='pointer  button'> {this.state.login ? 'Sign In' : 'create account' }</Link>
           
          </div>
</div>

<div className='remember'><input type="checkbox" name="remember" value="remember" /><label htmlFor='remember'>Remember me</label>
</div>
<div className='problems'><a href='#'>Problems with sign in?</a></div>
<div className="noaccount"> Don't have an account?  </div>
          <span
            className='register'
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login ? 'Register' : 'Already have an account?'}
          </span>

        
      </div>
    )
  }

 _confirm = async () => {
  const { name, email, password } = this.state
  if (this.state.login) {
    const result = await this.props.signinUserMutation({
      variables: {
        email,
        password
      }
    })
    const id = result.data.signinUser.user.id
    const token = result.data.signinUser.token
    this._saveUserData(id, token)
  } else {
    const result = await this.props.createUserMutation({
      variables: {
        name,
        email,
        password
      }
    })
    const id = result.data.signinUser.user.id
    const token = result.data.signinUser.token
    this._saveUserData(id, token)
  }
  this.props.history.push(`/`)
}


  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

}



export default Login

