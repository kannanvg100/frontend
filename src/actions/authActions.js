export const login = (userData) => {
    return async (dispatch) => {
        try {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			})
			const data = await response.json()
			if (response.ok) {
                localStorage.setItem('data', JSON.stringify(data))
				dispatch({ type: 'LOGIN_SUCCESS', payload: data.token })
                
			} else dispatch({ type: 'LOGIN_FAILURE', payload: data.error })
		} catch (error) {
			console.error(error)
		}
	}
}

export const signup = (userData) => {
	return async (dispatch) => {
		try {
			const response = await fetch('http://localhost:3000/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			})
			const data = await response.json()
			if (response.ok) {
				localStorage.setItem('data', JSON.stringify(data))
				dispatch({ type: 'LOGIN_SUCCESS', payload: data.token })
			} else dispatch({ type: 'LOGIN_FAILURE', payload: data.error })
		} catch (error) {
			console.error(error)
		}
	}
}

export const logout = () => {
    localStorage.removeItem("data");
	return { type: 'LOGOUT' }
}
