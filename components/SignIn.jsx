'use client'

import React, { useState, useContext } from 'react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'
import { UserAuth } from '../context/AuthContext'

const SignIn = () => {
	const { signIn } = UserAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')

		try {
			await signIn(email, password)
			router.push('/profile')
		} catch (e) {
			setError(e.message)
			console.log(e.message)
		}
	}

	return (
		<div className=' text-center '>
			<form onSubmit={handleSubmit} className='flex flex-col'>
				<input
					type='text'
					placeholder='Email'
					value={email}
					id='email'
					className='border-2 border-stone-700 p-1 mb-2 rounded-lg'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					className='border-2 border-stone-700 p-1 rounded-lg'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type='submit'
					className='px-4 py-2 mx-auto m-4 w-full  rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70 transition-all duration-200 focus:outline-none  active:scale-95 shadow-md active:shadow-lg shadow-blue-primary-70'
				>
					Log In
				</button>
			</form>
			<p className='text-white-primary-100'>
				Don't have an account?{' '}
				<Link href='/signup' className='underline text-yellow-primary-100'>
					Sign up!
				</Link>
			</p>
		</div>
	)
}

export default SignIn
