import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Components/Home'
import Details from './Components/Details'
import Login from './Components/Login/Login'

export default (
	<Switch>
		<Route exact path='/' component={Home} />
		<Route path='/login' component={Login} />
		<Route path='/details' component={Details} />
	</Switch>
)
