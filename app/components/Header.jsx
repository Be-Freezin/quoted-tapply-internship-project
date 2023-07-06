import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

const Header = () => {
const { user, posts, newPost } = UserAuth()
const router = useRouter()
		const handleCreatePost = () => {
			if (!user) {
				console.log('you must be logged in')
				return (
					<div>
						<p>You must be logged in to create a post</p>
					</div>
				)
			}
			return router.push('/postform')
		}
  return (
		<header>
			<div className='bg-yellow-primary-100 flex flex-col w-full justify-center items-center h-96 text-black-primary-100'>
				<div className='text-center'>
					<h1 className='text-6xl p-4 '>Quoted</h1>
					<h3 className='font-medium '>
						Become the word wizard you've always dreamed of.
					</h3>
				</div>
				<button
					onClick={handleCreatePost}
					className='px-4 py-2 m-4 lg:mx-16 rounded-lg border-2 font-bold border-black-primary-100 bg-blue-primary-100 hover:bg-blue-primary-70 transition-all duration-200 focus:outline-none  active:scale-95 shadow-md active:shadow-lg shadow-black-primary-70'
				>
					Create Post
				</button>
			</div>
		</header>
	)
}

export default Header