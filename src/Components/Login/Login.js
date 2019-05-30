import React, { Component } from 'react'
import axios from 'axios'
import { updateUser } from '../../redux/userReducer'
import { connect } from 'react-redux'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

class Login extends Component {
	componentDidMount() {
		axios.get('/auth/user').then((res) => {
			this.props.updateUser(res.data)
			this.props.history.push('/details')
		})
		this.props.id && this.props.history.push('/details')
	}

	render() {
		return (
			<div>
				<LoginForm />
				<RegisterForm />
			</div>
		)
	}
}

function mapStateToProps(reduxState) {
	return reduxState
}

export default connect(
	mapStateToProps,
	{ updateUser }
)(Login)
