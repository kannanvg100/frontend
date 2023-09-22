import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './containers/Login'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Signup from './containers/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PrivateRoute, PrivateRouteAdmin } from './components/PrivateRoute'
import LoginAdmin from './containers/LoginAdmin'
import HomeAdmin from './containers/HomeAdmin'
import Error404 from './containers/Error404'

function App() {
	return (
		<BrowserRouter>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme="light"
			/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="" element={<PrivateRoute />}>
					<Route path="/profile" element={<Profile />} />
				</Route>
				<Route path="/admin/login" element={<LoginAdmin />} />
				<Route path="" element={<PrivateRouteAdmin />}>
					<Route path="/admin/" element={<HomeAdmin />} />
				</Route>
				<Route path='*' element={<Error404 />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
