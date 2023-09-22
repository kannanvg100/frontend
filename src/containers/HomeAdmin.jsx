import React from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import AdminDashboard from '../components/AdminDashboard'

function HomeAdmin() {
    document.title = 'Admin Dashboard'
	return (
		<>
			<NavbarAdmin />
			<AdminDashboard />
		</>
	)
}

export default HomeAdmin
