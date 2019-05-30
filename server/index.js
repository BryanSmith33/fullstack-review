require('dotenv').config()
const express = require('express'),
	session = require('express-session'),
	massive = require('massive'),
	auth_ctrl = require('./controllers/auth_controller')
const app = express()
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())
app.use(
	session({
		secret: SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 60
		}
	})
)

massive(CONNECTION_STRING).then((database) => {
	app.set('db', database)
	console.log('database set!', database.listTables())
	app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT} ✌️`))
})

app.post('/auth/register', auth_ctrl.register)
app.post('/auth/login', auth_ctrl.login)
app.get('/auth/details', auth_ctrl.getDetails)
app.get('/auth/user', auth_ctrl.getUser)
app.get('/auth/logout', auth_ctrl.logout)
