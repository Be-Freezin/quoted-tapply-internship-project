'use client'
import React from 'react'

import Nav from '../components/Nav'
import Feed from '../components/Feed'
import Header from '../components/Header'
import SignIn from '../components/SignIn'

export default function Home() {
	return (
		<main className='min-h-screen bg-yellow-primary-100'>
			<Nav signIn={<SignIn />} />
			<Header />
			<Feed />
		</main>
	)
}
