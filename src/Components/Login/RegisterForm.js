import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class RegisterForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			firstname: '',
			lastname: '',
			email: ''
		}
	}

	handleUserRegister = (e) => {
		e.preventDefault()
		const { firstname, lastname, email, username, password } = this.state
		axios
			.post('/auth/register', { firstname, lastname, email, username, password })
			.then((res) => {
				this.props.history.push('/details')
			})
			.catch((err) => {
				console.log(err)
			})
		e.target.firstname.value = ''
		e.target.lastname.value = ''
		e.target.email.value = ''
		e.target.password.value = ''
		e.target.username.value = ''
	}

	handleRegisterInfoUpdate = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	render() {
		return (
			<>
				<h1>Sign Up</h1>
				<form onSubmit={this.handleUserRegister}>
					<input
						type='text'
						placeholder='first name'
						name='firstname'
						onChange={this.handleRegisterInfoUpdate}
					/>
					<input
						type='text'
						placeholder='last name'
						name='lastname'
						onChange={this.handleRegisterInfoUpdate}
					/>
					<input
						type='text'
						placeholder='email'
						name='email'
						onChange={this.handleRegisterInfoUpdate}
					/>
					<input
						type='text'
						placeholder='username'
						name='username'
						onChange={this.handleRegisterInfoUpdate}
					/>
					<input
						type='password'
						placeholder='password'
						name='password'
						onChange={this.handleRegisterInfoUpdate}
					/>
					<button>Register</button>
				</form>
			</>
		)
	}
}

export default withRouter(RegisterForm)
