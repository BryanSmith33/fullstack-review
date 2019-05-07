import React, { Component } from 'react'
import axios from 'axios'
import { updateUser } from '../redux/user_reducer'
import { connect } from 'react-redux'

class Login extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: ''
		}
	}

	componentDidMount() {
		axios.get('/auth/user').then((res) => {
			console.log(res.data)
			this.props.updateUser(res.data)
			this.props.history.push('/details')
		})
		this.props.id && this.props.history.push('/details')
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
			<div>
				<h1>Log In</h1>
				<form onSubmit={this.handleUserLogin}>
					<input
						type='text'
						name='username'
						placeholder='username'
						onChange={this.handleLoginInfoUpdate}
					/>
					<input
						type='text'
						name='password'
						placeholder='password'
						onChange={this.handleLoginInfoUpdate}
					/>
					<button>Log in</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (reduxState) => {
	return {
		id: reduxState.id
	}
}

const mapDispatchToProps = {
	updateUser
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
