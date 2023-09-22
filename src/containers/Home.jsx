import React from 'react'
import Navbar from '../components/Navbar'
import HomeContent from '../components/HomeContent'

function Home() {
    document.title = 'Home'
	return (
		<>
			<Navbar />
            <HomeContent/>
		</>
	)
}

export default Home
