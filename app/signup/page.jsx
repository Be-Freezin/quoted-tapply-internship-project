'use client'
import React, { useState } from 'react'
import Nav from '../../components/Nav'

import { useRouter } from 'next/navigation'
import { UserAuth } from '../../context/AuthContext'

const page = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	const { createUser, newUser, setNewUser } = UserAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		try {
			await createUser(email, password, displayName)
		} catch (e) {
			setError(e.message)
			console.log(e.message)
		}

		return router.push('/profile')
	}
	return (
		<>
			<Nav />
			<div className='flex flex-col h-screen justify-center p-16 items-center text-center mx-0 my-0 bg-white-primary-100 '>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col h-1/3 justify-evenly'
				>
					<input
						type='text'
						placeholder='Name'
						value={displayName}
						// onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
						className='border-2 border-stone-700 p-1 rounded-lg'
						onChange={(e) => setDisplayName(e.target.value)}
					/>
					<input
						type='text'
						placeholder='Email'
						value={email}
						// onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
						className='border-2 border-stone-700 p-1 rounded-lg'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						// onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
						className='border-2 border-stone-700 p-1 rounded-lg'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className='w-full flex-col justify-between'>
						<button
							type='submit'
							className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70 transition-all duration-200 focus:outline-none  active:scale-95 shadow-md active:shadow-lg shadow-black-primary-70'
						>
							Sign up!
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default page
