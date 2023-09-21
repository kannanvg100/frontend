const initialState = {
	isAuthenticated: false,
	token: null,
	user: null,
	error: null,
}

const data = JSON.parse(localStorage.getItem('data'))
if (data) {
	initialState.isAuthenticated = true
	initialState.user = data?.user
	initialState.token = data?.token
}
console.log("📄 > file: authReducer.js:7 > initialState:", initialState)

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isAuthenticated: true,
				token: action.payload.accessToken,
				user: action.payload.user,
				error: null,
			}
		case 'LOGIN_FAILURE':
			return {
				...state,
				isAuthenticated: false,
				token: null,
				user: null,
				error: action.payload,
			}
		case 'LOGOUT':
			return initialState
		default:
			return state
	}
}

export default authReducer
