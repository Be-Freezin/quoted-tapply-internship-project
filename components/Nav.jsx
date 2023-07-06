import React, { useContext, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { HiBars3, HiXMark } from 'react-icons/hi2'

import Link from 'next/link'

const Nav = ({ signIn }) => {
	const { user, logout, defaultPhotoURL, photoURL, setPhotoURL } = UserAuth()
	const router = useRouter()
	const [toggleLogin, setToggleLogin] = useState(false)
	const [toggleMenu, setToggleMenu] = useState(false)

	const handleLogout = async () => {
		try {
			await logout()
			router.push('/')
			alert('You have successfully logged out')
		} catch (e) {
			console.log(e.message)
		}
	}
	return (
		<nav className='w-full flex flex-row items-center justify-between  border-b-2 border-black-primary-100 bg-white-primary-100'>
			<Link
				href='/'
				className='m-4 lg:mx-16 text-black-primary-100 text-xl font-bold  underline  bg-clip-text text-transparent bg-gradient-to-r from-yellow-primary-100 to-blue-primary-100 hover:from-red-primary-100 hover:to-yellow-primary-100 hover:transition-all duration-500 '
			>
				QUOTED
			</Link>
			<button
				onClick={() => setToggleMenu(true)}
				className='mr-4 bg-blue-primary-100 p-2 border-2 border-black-primary-100 rounded md:hidden '
			>
				<HiBars3 className='text-xl' />
			</button>

			<div className='w-fit hidden md:flex'>
				{user ? (
					<Link
						href='/profile'
						className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70 transition-all duration-200 focus:outline-none transform active:scale-95'
					>
						Profile
					</Link>
				) : (
					<button
						onClick={() => setToggleLogin(true)}
						className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70  transition-all duration-200 focus:outline-none transform active:scale-95'
					>
						Log in/Sign up
					</button>
				)}

				{/* <button
					onClick={() => setToggleLogin(true)}
					className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70  transition-all duration-200 focus:outline-none transform active:scale-95'
				>
					Log in/Sign up
				</button> */}
				<button
					onClick={handleLogout}
					className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70  transition-all duration-200 focus:outline-none transform active:scale-95'
				>
					Log Out
				</button>
				{/* <img src={user.photoURL} alt="" srcSet="" /> */}
			</div>
			{toggleLogin && (
				<div className='fixed top-0   h-screen w-screen flex items-center justify-center border-b-2  bg-opacity-70 backdrop-filter backdrop-blur-sm  py-2 text-lg'>
					<div className='flex flex-col relative h-1/2 justify-center py-16 px-8 items-center  mx-0 my-0 bg-black-primary-70 rounded-2xl '>
						<button
							onClick={() => setToggleLogin(false)}
							className='absolute top-0 right-5 md:right-0 px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-black border-black-primary-100 bg-red-primary-100 hover:bg-red-primary-70 transition-all duration-200 focus:outline-none  active:scale-95 shadow-md active:shadow-sm shadow-red-primary-70'
						>
							X
						</button>
						{signIn}
					</div>
				</div>
			)}
			{toggleMenu && (
				<div className='h-screen w-screen bg-white-primary-100  fixed top-0 left-0 z-40 mx-auto my-0 flex-row-reverse items-center justify-center'>
					<div className='flex flex-row-reverse items-center justify-between border-b-blue-primary-100 border-b-2'>
						<button
							onClick={() => setToggleMenu(false)}
							className='mr-4 bg-blue-primary-100 p-2 border-2 border-black-primary-100 rounded'
						>
							<HiXMark className='text-xl ' />
						</button>
						<Link
							href='/'
							onClick={() => setToggleMenu(false)}
							className='m-4 lg:mx-16 text-black-primary-100 text-xl font-bold  underline  bg-clip-text text-transparent bg-gradient-to-r from-yellow-primary-100 to-blue-primary-100 hover:from-red-primary-100 hover:to-yellow-primary-100 hover:transition-all duration-500 '
						>
							QUOTED
						</Link>
					</div>

					<div className='h-screen flex flex-col justify-evenly items-center'>
						{user ? (
							<Link
								href='/profile'
								className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70 transition-all duration-200 focus:outline-none transform active:scale-95'
							>
								Profile
							</Link>
						) : null}

						<button
							onClick={() => setToggleLogin(true)}
							className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70  transition-all duration-200 focus:outline-none transform active:scale-95'
						>
							Log in/Sign up
						</button>
						<button
							onClick={handleLogout}
							className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70  transition-all duration-200 focus:outline-none transform active:scale-95'
						>
							Log Out
						</button>
					</div>
					{/* <img src={user.photoURL} alt="" srcSet="" /> */}
					{toggleLogin && (
						<div className='fixed top-0   h-screen w-screen flex items-center justify-center border-b-2  bg-opacity-70 backdrop-filter backdrop-blur-sm  py-2 text-lg'>
							<div className='flex flex-col relative h-1/2 justify-center py-16 px-8 items-center  mx-0 my-0 bg-black-primary-80 rounded-2xl '>
								<button
									onClick={() => setToggleLogin(false)}
									className='absolute top-0 right-5 md:right-0 px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-black border-black-primary-100 bg-red-primary-100 hover:bg-red-primary-70 transition-all duration-200 focus:outline-none  active:scale-95 shadow-md active:shadow-sm shadow-red-primary-70'
								>
									X
								</button>
								{signIn}
							</div>
						</div>
					)}
				</div>
			)}
		</nav>
	)
}
//! Button will guide user to sign up and enable them to make posts

export default Nav
