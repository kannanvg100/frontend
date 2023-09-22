import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUpdateMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

function Signup() {
    document.title = 'Update Profile'
	const [userData, setUserData] = useState({ _id: '', name: '', email: '', password: '', confirmPassword: '', profileImage: '' })
	const { userInfo } = useSelector((state) => state.auth)
	const [userUpdate, { isLoading }] = useUpdateMutation()
	const despatch = useDispatch()
	const navigate = useNavigate()
    const imageInput = useRef()
    const displayImage = useRef()

	useEffect(() => {
		setUserData({ _id: userInfo?._id, name: userInfo?.name, email: userInfo?.email, password: '', confirmPassword: '', profileImage: `api/images/${userInfo?.profileImage}` })
        console.log(userInfo)
    }, [userInfo, navigate])

	const handleUpdate = async (e) => {
		e.preventDefault()
		if (!userData.name.trim() || !userData.email.trim()) {
			return toast.error('Please fill Name and Email fields')
		}
		if (userData.password.trim() !== userData.confirmPassword.trim()) {
			return toast.error('Passwords do not match')
		}
		try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('email', userData.email);
            formData.append('password', userData.password);
            formData.append('image', userData.profileImage);
			const res = await userUpdate(formData).unwrap()
			despatch(setCredentials({ ...res }))
			navigate('/')
		} catch (error) {
			toast.error(error?.data?.message || error.error)
		}
	}

	return (
		<div className="border-2 p-6 rounded-lg w-[350px] text-center mx-auto mt-24">
			<h1 className="text-3xl font-bold text-gray-700">Update Profile</h1>
			<form onSubmit={handleUpdate}>
                <div className='relative'>
                    <img src={`${userData.profileImage}`} alt="profile_pic" ref={displayImage}
                    onClick={() => imageInput.current.click()} 
                    className='h-[150px] w-[150px] object-cover inline my-2 rounded-full cursor-pointer'/>
                </div>

				<input type="file" ref={imageInput} name="image" className='hidden'
                onChange={(e)=>{
                    const file = e.target.files[0]
                    setUserData({...userData, profileImage: file})
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
					{isLoading ? 'Updating...' : 'Update'}
				</button>
			</form>
		</div>
	)
}

export default Signup
