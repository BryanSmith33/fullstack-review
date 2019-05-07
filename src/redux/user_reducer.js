const initialState = {
	id: null,
	username: '',
	firstname: '',
	balance: null
}

const UPDATE_USER = 'UPDATE_USER'
const CLEAR_USER = 'CLEAR_USER'

export function updateUser(user) {
	return {
		type: UPDATE_USER,
		payload: user
	}
}

export function clearUser() {
	return {
		type: CLEAR_USER
	}
}

export default function reducer(state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case UPDATE_USER:
			const { user_id: id, username, firstname, balance } = payload
			return { ...state, username, firstname, balance, id }
		case CLEAR_USER:
			return { ...state, id: null, balance: null, firstname: '', username: '' }
		default:
			return state
	}
}
