import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginAdminMutation } from '../slices/adminApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

function LoginAdmin() {
    document.title = 'Login'
	const [userData, setUserData] = useState({ email: 'admin@gmail.com', password: '1111' })

	const navigate = useNavigate()
	const despatch = useDispatch()

	const [loginAdmin, { isLoading }] = useLoginAdminMutation()

	const { userInfo } = useSelector((state) => state.auth)

	useEffect(() => {
		if (userInfo?.isAdmin) navigate('/admin')
	}, [userInfo, navigate])

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			if (!userData.email.trim() || !userData.password.trim()) {
				return toast.error('Please fill all fields')
			}
			const res = await loginAdmin(userData).unwrap()
			despatch(setCredentials({ ...res }))
			navigate('/admin')
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}

	return (
		<div className="border-2 p-6 rounded-lg w-[350px] text-center mx-auto mt-36">
			<h1 className="text-3xl font-bold text-gray-700">Admin Login</h1>
			<form onSubmit={handleLogin}>
				<input
					type="text"
					className="border-2 border-gray-300 block w-full p-2 rounded-md mt-4"
					placeholder="Email address"
					value={userData.email}
					onChange={(e) => setUserData({ ...userData, email: e.target.value })}
				/>
				<input
					type="password"
					className="border-2 border-gray-300 block w-full p-2 rounded-md mt-4"
					placeholder="Password"
					value={userData.password}
					onChange={(e) => setUserData({ ...userData, password: e.target.value })}
				/>
				<button type="submit" className="border-2 border-gray-300 p-2 px-10 rounded-md mt-4 font-bold">
					{isLoading ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	)
}

export default LoginAdmin
