import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutAdminMutation } from '../slices/adminApiSlice'
import { toast } from 'react-toastify'
import { logout } from '../slices/authSlice'
function Navbar() {
	const { userInfo } = useSelector((state) => state.auth)
	const navigate = useNavigate()
	const despatch = useDispatch()
	const [logoutAdmin] = useLogoutAdminMutation()
	async function handleLogout() {
		try {
			await logoutAdmin()
			despatch(logout())
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}
	return (
		<div className="border-b-2 py-3 shadow-sm">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-3xl font-bold text-gray-700">Admin Home</h1>
				{userInfo.isAdmin ? (
					<div className="flex gap-5">
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
								navigate('/admin/login')
							}}>
							Login
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
