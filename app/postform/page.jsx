'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserAuth } from '../../context/AuthContext'
import Nav from '../../components/Nav'

const page = () => {
	const { addPost, setNewPost, newPost, user } = UserAuth()

	const router = useRouter()

	useEffect(() => {
		if (user && user.displayName) {
			setNewPost({ ...newPost, author: user.displayName })
		}
	}, [user, setNewPost])
	return (
		<>
			<Nav />
			<div className='min-h-screen flex flex-col justify-evenly items-center bg-yellow-primary-100  mx-auto'>
				<h1 className='text-2xl font-bold'>Post a quote!</h1>
				<form onSubmit={addPost}>
					<div className='flex flex-col justify-evenly items-center w-full h-5/6 mx-auto'>
						<label
							htmlFor='Author'
							className='flex flex-col items-center justify-between w-5/6 '
						>
							<span className='font-bold'>Author:</span>
							<input
								type='text'
								placeholder='Author'
								value={newPost.author}
								className='border-2 border-stone-700 p-1  rounded-lg '
								onChange={(e) =>
									setNewPost({ ...newPost, author: e.target.value })
								}
							/>
						</label>
						<label
							htmlFor='title'
							className='flex flex-col items-center justify-between h-5/6 w-5/6'
						>
							<span className='font-bold'>Title:</span>
							<input
								type='text'
								placeholder='Title'
								value={newPost.title}
								onChange={(e) =>
									setNewPost({ ...newPost, title: e.target.value })
								}
								className='border-2 border-stone-700 p-1  rounded-lg'
							/>
						</label>
						<label
							htmlFor='textarea'
							className='flex flex-col items-center justify-between w-5/6 '
						>
							<span className='font-bold'>Body:</span>
							<textarea
								type='textarea'
								rows='10'
								cols='40'
								placeholder='Body'
								value={newPost.body}
								onChange={(e) =>
									setNewPost({ ...newPost, body: e.target.value })
								}
								className='border-2 border-stone-700 p-1 mb-2 rounded-lg'
							/>
						</label>
						<label
							htmlFor='datetime-local'
							className='flex flex-col items-center justify-between w-5/6'
						>
							<span className='font-bold'>Date:</span>
							<input
								type='datetime-local'
								placeholder='date'
								value={newPost.date}
								onChange={(e) =>
									setNewPost({ ...newPost, date: e.target.value })
								}
								className='border-2 border-stone-700 p-1 mb-2 rounded-lg'
							/>
						</label>
						<button
							type='submit'
							className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70  transition-all duration-200 focus:outline-none transform active:scale-95'
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default page
