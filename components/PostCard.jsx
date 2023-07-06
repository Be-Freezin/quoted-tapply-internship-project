'use client'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { HiXMark, HiHeart, HiOutlineHeart } from 'react-icons/hi2'
import Image from 'next/image'

const PostCard = ({ post, id, authorPhoto }) => {
	const [likes, setLikes] = useState(0)
	const [liked, setLiked] = useState(false)

	const {
		user,
		users,
		posts,
		setPosts,
		newPost,
		deleteItem,
		defaultPhoto,
		authorUid,
	} = UserAuth()

	useEffect(() => {
		if (user && post.likesBy.includes(user.uid)) {
			setLiked(true)
		} else {
			setLiked(false)
		}
		setLikes(post.likesBy.length)
	}, [user, post])

	const handleLike = async () => {
		if (!user) {
			return
		}

		const postRef = doc(db, 'articles', post.id)
		const postDoc = await getDoc(postRef)
		const postData = postDoc.data()

		let updatedLikesBy

		if (!postData.likesBy) {
			updatedLikesBy = [user.uid]
		} else {
			const userLiked = postData.likesBy.includes(user.uid)
			if (userLiked) {
				updatedLikesBy = postData.likesBy.filter((uid) => uid !== user.uid)
			} else {
				updatedLikesBy = [...postData.likesBy, user.uid]
			}
		}

		await updateDoc(postRef, { likesBy: updatedLikesBy })

		const updatedPosts = posts.map((p) => {
			if (p.id === post.id) {
				return {
					...p,
					likesBy: updatedLikesBy,
				}
			}
			return p
		})

		setPosts(updatedPosts)
	}

	return (
		<article
			key={post.id}
			className='p-4 w-11/12 lg:w-1/2 mt-5 text-black-primary-100 border-b-2 mb-5 border-black-primary-100 bg-white-primary-80 rounded odd:bg-white-primary-60'
		>
			<span className='text-xl font-bold'>{post.title}</span>
			<p className='my-4'>{post.body}</p>
			<div className='flex w-full md:w-5/6  justify-between items-center text-sm font-light'>
				<div className='flex flex-row items-center w-32 justify-between text-center'>
					<Image
						src={post.authorPhotoURL || defaultPhoto}
						alt='Picture of the author'
						width={50}
						height={50}
						className='rounded-full'
					/>
					<span className='w-fit'>{post.author}</span>
				</div>

				{new Date(post.date).toLocaleString('en-US', {
					day: 'numeric',
					month: 'short',
					hour: 'numeric',
					minute: 'numeric',
				})}
				<div className='flex flex-row items-center'>
					<button onClick={handleLike} className='mr-2'>
						{liked ? (
							<HiHeart className='text-2xl text-red-primary-100' />
						) : (
							<HiOutlineHeart className='text-2xl text-red-primary-100' />
						)}
					</button>
					<p className='font-semibold'>{likes}</p>
				</div>
				<button
					onClick={() => deleteItem(post.id)}
					className='bg-red-primary-100 p-1 border-2 border-black-primary-100 rounded '
				>
					<HiXMark className='text-xl' />
				</button>
			</div>
		</article>
	)
}

export default PostCard
