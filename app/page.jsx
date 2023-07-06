'use client'
import React from 'react'
import Image from 'next/image'
import Nav from './components/Nav'
import Feed from './components/Feed'
import Header from './components/Header'
import SignIn from './components/SignIn'

export default function Home() {
	return (
		<main className='min-h-screen bg-black-primary-80'>
			<Nav signIn={<SignIn />} />
			<Header />
			<Feed />
		</main>
	)
}
