const initialState = {
	username: '',
	firstname: '',
	balance: null,
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

function reducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_USER:
			const { username, firstname, balance } = action.payload
			return { username, firstname, balance }
		case CLEAR_USER:
			return { ...initialState }
		default:
			return state
	}
}

export default reducer
