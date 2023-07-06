import React, { useState, useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
// import { useRouter } from 'next/navigation'

import PostCard from './PostCard'

const Feed = () => {
	const { posts } = UserAuth()

	return (
		<>
			<section className='flex flex-col justify-center items-center mt-16'>
				{posts.map((post) => (
					<PostCard post={post} key={post.id} />
				))}
			</section>
		</>
	)
}

export default Feed
