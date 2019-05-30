const bcrypt = require('bcryptjs')

module.exports = {
	register: async (req, res) => {
		const { firstname, lastname, email, username, password } = req.body
		const db = req.app.get('db')
		const { session } = req
		const userFound = await db.check_user_email({ email })
		if (userFound[0]) return res.status(409).send('Email already exists')
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)
		const createdUser = await db.register_user({
			firstname,
			lastname,
			email,
			username,
			password: hash
		})
		session.user = { id: createdUser[0].login_id, username: createdUser[0].username }
		res.status(200).send(session.user)
	},
	login: async (req, res) => {
		const { username, password } = req.body
		const db = req.app.get('db')
		const { session } = req
		const userFound = await db.check_username({ username })
		if (!userFound[0]) return res.status(401).send('User does not exist')
		const authenticated = bcrypt.compareSync(password, userFound[0].password)
		if (authenticated) {
			session.user = { id: userFound[0].login_id, username: userFound[0].username }
			res.status(200).send(session.user)
		} else {
			return res.status(401).send('Inccorect username or password')
		}
	},
	getDetails: async (req, res) => {
		const db = req.app.get('db')
		const { session } = req
		if (session.user) {
			const details = await db.get_user_details({ id: session.user.id })
			const { firstname, email, balance, user_id } = details[0]
			return res.status(200).send({
				firstname,
				email,
				balance,
				user_id,
				username: session.user.username
			})
		}
		return res.status(401).send('Please Log In')
	},
	getUser: (req, res) => {
		const { session } = req
		if (session.user) {
			return res.status(200).send(session.user)
		}
	},
	logout: (req, res) => {
		req.session.destroy()
		res.sendStatus(200)
	}
}
