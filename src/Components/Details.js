import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from '../redux/user_reducer'

class Details extends Component {
	componentDidMount() {
		axios
			.get('/auth/details')
			.then((res) => {
				this.props.updateUser(res.data)
			})
			.catch((err) => {
				this.props.history.push('/login')
			})
	}

	render() {
		return (
			<div>
				<h1>Details</h1>
				{this.props.firstname && (
					<>
						<h3>Name: {this.props.firstname}</h3>
						<h3>Balance: ${this.props.balance}</h3>
					</>
				)}
			</div>
		)
	}
}

const mapStateToProps = (reduxState) => {
	return {
		firstname: reduxState.firstname,
		balance: reduxState.balance
	}
}

const mapDispatchToProps = {
	updateUser
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Details)
