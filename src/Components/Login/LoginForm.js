import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: ''
		}
	}
	handleLoginInfoUpdate = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleUserLogin = (e) => {
		e.preventDefault()
		const { username, password } = this.state
		axios
			.post('/auth/login', { username, password })
			.then((res) => {
				this.props.history.push('/details')
			})
			.catch((err) => {
				console.log(err)
			})
		e.target.username.value = ''
		e.target.password.value = ''
	}
	render() {
		return (
			<>
				<h1>Login</h1>
				<form onSubmit={this.handleUserLogin}>
					<input
						type='text'
						name='username'
						placeholder='username'
						onChange={this.handleLoginInfoUpdate}
					/>
					<input
						type='password'
						name='password'
						placeholder='password'
						onChange={this.handleLoginInfoUpdate}
					/>
					<button>Log In</button>
				</form>
			</>
		)
	}
}

export default withRouter(LoginForm)
