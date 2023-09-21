import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { logout } from '../slices/authSlice'
function Navbar() {
	const { userInfo } = useSelector((state) => state.auth)
	const navigate = useNavigate()
	const despatch = useDispatch()
	const [logoutUser] = useLogoutMutation()
	async function handleLogout() {
		try {
			await logoutUser()
			despatch(logout())
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}
	return (
		<div className="border-b-2 py-3 shadow-sm">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-3xl font-bold text-gray-700">User Home</h1>
				{userInfo ? (
					<div className="flex gap-5">
						<button
							type="button"
							className="hover:underline"
							onClick={() => {
								navigate('/profile')
							}}>
							{userInfo?.name}
						</button>
						<button type="button" className="hover:underline" onClick={handleLogout}>
							Logout
						</button>
					</div>
				) : (
					<div className='flex gap-5'>
						<button
							type="button"
							className="hover:underline"
							onClick={() => {
								navigate('/login')
							}}>
							Login
						</button>
						<button
							type="button"
							className="hover:underline"
							onClick={() => {
								navigate('/signup')
							}}>
							Signup
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
