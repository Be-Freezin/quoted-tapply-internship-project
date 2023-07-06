'use client'
import React, { useState, useEffect } from 'react'
import { UserAuth } from '../../context/AuthContext'

import Nav from '../../components/Nav'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

const Profile = () => {
	const {
		user,

		displayName,
		setDisplayName,
		handleUpdateProfile,

		handlePhotoUpload,
		handleFileChange,
		defaultPhoto,
	} = UserAuth()

	const userPhotoURL = user?.photoURL || defaultPhoto
	const userName = user?.displayName || ''

	return (
		<div className=' flex flex-col w-full min-h-screen justify-center items-center bg-yellow-primary-100'>
			<Nav />

			<div className='flex flex-col justify-around items-center my-auto h-full '>
				<Image
					src={userPhotoURL}
					alt='Picture of the author'
					width={200}
					height={200}
					className='rounded-full mb-8'
				/>
				<div className='text-center mb-16'>
					<p className='font-bold text-5xl text-center mb-5 '>
						Welcome, {userName}
					</p>
					<p className=''>
						Here you can update your basic profile information.
					</p>
				</div>
				<form
					onSubmit={handleUpdateProfile}
					className='h-full flex flex-col justify-between'
				>
					<div className='flex flex-col justify-evenly h-full'>
						<label
							htmlFor='text'
							className='flex flex-col items-center justify-between  '
						>
							<span className='font-bold mb-2'>Update username</span>
							<input
								type='text'
								value={displayName}
								placeholder='Username'
								className='border-2 border-stone-700 p-1 rounded-lg'
								onChange={(e) => setDisplayName(e.target.value)}
							/>
						</label>
						<button
							type='submit'
							className='px-4 py-2 mx-auto m-4 w-full  rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70 transition-all duration-200 focus:outline-none  active:scale-95 shadow-md active:shadow-lg shadow-blue-primary-70'
						>
							Update Username:
						</button>
					</div>
				</form>
				<div className='flex flex-col justify-evenly h-full text-center'>
					<label
						htmlFor='avatar'
						className='flex flex-col items-center justify-between  '
					>
						<span className='font-bold mb-2'>Choose a profile picture:</span>
						<input
							type='file'
							onChange={handleFileChange}
							className='text-center bg-white-primary-100 m-2 file:p-2  text-black-primary-100 rounded file:bg-white-primary-80 '
						/>
					</label>
					<button
						onClick={handlePhotoUpload}
						className='px-4 py-2 mx-auto m-4 w-full  rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70 transition-all duration-200 focus:outline-none  active:scale-95 shadow-md active:shadow-lg shadow-blue-primary-70'
					>
						Upload
					</button>
				</div>
			</div>
		</div>
	)
}

export default Profile
