import React, { useEffect, useRef, useState } from 'react'
import {
	useGetUsersMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useCreateUserMutation,
} from '../slices/adminApiSlice'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

function AdminDashboard() {
	const [getUsers] = useGetUsersMutation()
	const [users, setUsers] = useState([])
	const [userData, setUserData] = useState(null)
	const [userCreate] = useCreateUserMutation()

	const [userUpdate] = useUpdateUserMutation()
	const [userDelete] = useDeleteUserMutation()
	const imageInput = useRef()
	const displayImage = useRef()
	const [action, setAction] = useState(null)
	const [search, setSearch] = useState('')

	const navigate = useNavigate()
    const location = useLocation()

	async function handleUpdate(e) {
		e.preventDefault()
		if (!userData.name.trim() || !userData.email.trim()) {
			return toast.error('Please fill Name and Email fields')
		}
		if (userData.password.trim() !== userData.confirmPassword.trim()) {
			return toast.error('Passwords do not match')
		}
		try {
			const formData = new FormData()
			formData.append('_id', userData._id)
			formData.append('name', userData.name)
			formData.append('email', userData.email)
			formData.append('password', userData.password)
			formData.append('image', userData.profileImage)
			const res = await userUpdate(formData).unwrap()
			setUserData(null)
		} catch (error) {
			toast.error(error?.data?.message || error.error)
		}
	}

	async function handleDelete(e) {
		e.preventDefault()
		try {
			const res = await userDelete({ _id: userData._id }).unwrap()
			setUserData(null)
		} catch (error) {
			toast.error(error?.data?.message || error.error)
		}
	}

	async function handleCreate(e) {
		e.preventDefault()
		if (!userData.name.trim() || !userData.email.trim()) {
			return toast.error('Please fill Name and Email fields')
		}
		if (userData.password.trim() !== userData.confirmPassword.trim()) {
			return toast.error('Passwords do not match')
		}
		try {
			const formData = new FormData()
			formData.append('name', userData.name)
			formData.append('email', userData.email)
			formData.append('password', userData.password)
			formData.append('image', userData.profileImage)
			const res = await userCreate(formData).unwrap()
			setUserData(null)
		} catch (error) {
			toast.error(error?.data?.message || error.error)
		}
	}

	function handleSearch(e) {
		e.preventDefault()
		navigate(`/admin/?search=${search}`)
        setUserData({})
        setAction(null)
	}

    useEffect(() => {
		const getAllUsers = async () => {
            const queryParams = new URLSearchParams(location.search);
            const search = queryParams.get('search') || ''
			const res = await getUsers(search).unwrap()
			setUsers(res)
		}
		getAllUsers()
	}, [])

	useEffect(() => {
		const getAllUsers = async () => {
            const queryParams = new URLSearchParams(location.search);
            const search = queryParams.get('search') || ''
			const res = await getUsers(search).unwrap()
			setUsers(res)
		}
		getAllUsers()
	}, [userData])
	return (
		<div className="container mx-auto mt-6 md:flex">
			<div className="md:w-[50%]">
				<div className="flex justify-between items-end">
					<p className="text-xl font-bold text-gray-700">All Users</p>
					<div className="flex gap-2 items-end">
						<button
							className="text-blue-600 font-bold border-2 rounded py-1 px-2"
							onClick={() => {
								setUserData({
									_id: '',
									name: '',
									email: '',
									password: '',
									confirmPassword: '',
									profileImage: '/api/images/default_profile_image.jpg',
								})
								setAction('create')
							}}>
							Add User
						</button>
						<div className="flex gap-2 items-end">
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search"
								className="border-2 border-gray-300 block w-full p-1 rounded mt-4"
							/>
							<button className="border-2 py-1 px-2 rounded" onClick={handleSearch}>
								Search
							</button>
						</div>
					</div>
				</div>
				{users.length > 0 ? (
					users.map((user) => (
						<div
							key={user._id}
							className="border-2 p-4 rounded-lg mt-4 hover:shadow-md hover:bg-slate-50 cursor-pointer"
							onClick={() => {
								setUserData({
									_id: user._id,
									name: user.name,
									email: user.email,
									password: '',
									confirmPassword: '',
									profileImage: `api/images/${user.profileImage}`,
								})
								setAction('update')
							}}>
							<p className="text-sm font-bold text-gray-700">{user.name}</p>
							<p className="text-gray-500">{user.email}</p>
						</div>
					))
				) : (
					<div className="text-center">
						<h5 className="text-xl font-bold text-gray-700">No users found</h5>
					</div>
				)}
			</div>
			<div className="md:w-[50%] p-6">
				{action && (
					<div className="text-center w-[350px] mx-auto">
						{action === 'create' ? (
							<h1 className="text-xl font-bold text-gray-700 text-left">Create New User</h1>
						) : (
							<h1 className="text-xl font-bold text-gray-700 text-left">Update User Details</h1>
						)}
						<form onSubmit={handleUpdate}>
							<div className="relative">
								<img
									src={`${userData.profileImage}`}
									alt="profile_pic"
									ref={displayImage}
									onClick={() => imageInput.current.click()}
									className="h-[150px] w-[150px] object-cover inline my-2 rounded-full cursor-pointer"
								/>
							</div>

							<input
								type="file"
								ref={imageInput}
								name="image"
								className="hidden"
								onChange={(e) => {
									const file = e.target.files[0]
									setUserData({ ...userData, profileImage: file })
									const reader = new FileReader()
									reader.readAsDataURL(file)
									reader.onloadend = () => {
										displayImage.current.src = reader.result
									}
								}}></input>
							<input
								type="text"
								className="border-2 border-gray-300 block w-full p-2 rounded-md mt-4"
								placeholder="Name"
								value={userData.name}
								onChange={(e) => setUserData({ ...userData, name: e.target.value })}
							/>
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
								placeholder="New password"
								value={userData.password}
								onChange={(e) => setUserData({ ...userData, password: e.target.value })}
							/>
							<input
								type="password"
								className="border-2 border-gray-300 block w-full p-2 rounded-md mt-4"
								placeholder="Confirm password"
								value={userData.confirmPassword}
								onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
							/>
							<div className="flex gap-5 justify-center items-end mt-4">
								<button
									type="submit"
									onClick={() => setUserData(null)}
									className=" border-2 font-bold rounded py-1 px-2">
									Cancel
								</button>
								{action === 'create' ? (
									<button
										type="submit"
										onClick={handleCreate}
										className="text-blue-600 font-bold border-2 rounded py-1 px-2">
										Create
									</button>
								) : (
									<>
										<button
											type="submit"
											onClick={handleDelete}
											className="text-red-600 font-bold border-2 rounded py-1 px-2">
											Delete
										</button>
										<button
											type="submit"
											className="text-blue-600 font-bold border-2 rounded py-1 px-2">
											Update
										</button>
									</>
								)}
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	)
}

export default AdminDashboard
