import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
function PrivateRoute() {
	const { userInfo } = useSelector((state) => state.auth)
	return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}
function PrivateRouteAdmin() {
	const { userInfo } = useSelector((state) => state.auth)
	return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export { PrivateRoute, PrivateRouteAdmin }
