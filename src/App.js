import React from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { HashRouter } from 'react-router-dom'
import router from './router'

function App() {
	return (
		<HashRouter>
			<Navbar />
			{router}
		</HashRouter>
	)
}

export default App
