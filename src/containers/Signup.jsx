import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSignupMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

function Signup() {
	const [userData, setUserData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
	const { userInfo } = useSelector((state) => state.auth)
    const despatch = useDispatch()
	const navigate = useNavigate()
	const [userSignup] = useSignupMutation()

	useEffect(() => {
		if (userInfo) navigate('/')
	}, [userInfo, navigate])

	const handleLogin = async (e) => {
		e.preventDefault()
		if (!userData.name.trim() || !userData.email.trim() || !userData.password.trim() || !userData.confirmPassword.trim()) {
			return toast.error('Please fill all fields')
		}
		if (userData.password.trim() !== userData.confirmPassword.trim()) {
			return toast.error('Passwords do not match')
		}
		try {
			const res = await userSignup(userData).unwrap()
            despatch(setCredentials({ ...res }))
			navigate('/')
		} catch (error) {
			toast.error(error?.data?.message || error.error)
		}
	}

	return (
		<div className="border-2 p-6 rounded-lg w-[350px] text-center mx-auto mt-36">
			<h1 className="text-3xl font-bold text-gray-700">Signup</h1>
			<form onSubmit={handleLogin}>
				<input
					type="text"
					className="border-2 border-gray-300 block w-full p-2 rounded-md mt-4"
					placeholder="Name"
					value={userData.name}
					onChange={(e) => setUserData({ ...userData, name: e.target.value})}
				/>
				<input
					type="text"
					className="border-2 border-gray-300 block w-full p-2 rounded-md mt-4"
					placeholder="Email address"
					value={userData.email}
					onChange={(e) => setUserData({ ...userData, email: e.target.value})}
				/>
				<input
					type="password"
					className="border-2 border-gray-300 block w-full p-2 rounded-md mt-4"
					placeholder="Password"
					value={userData.password}
					onChange={(e) => setUserData({ ...userData, password: e.target.value})}
				/>
				<input
					type="password"
					className="border-2 border-gray-300 block w-full p-2 rounded-md mt-4"
					placeholder="Confirm password"
					value={userData.confirmPassword}
					onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value})}
				/>
				<button type="submit" className="border-2 border-gray-300 p-2 px-10 rounded-md mt-4 font-bold">
					Signup
				</button>
                <br />
				<button
					className="mt-4 text-blue-500 hover:underline"
					onClick={() => {
						navigate('/login')
					}}>
					Login
				</button>
			</form>
		</div>
	)
}

export default Signup
