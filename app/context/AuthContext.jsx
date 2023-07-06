import { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from 'firebase/auth'
import {
	collection,
	getDoc,
	setDoc,
	doc,
	addDoc,
	query,
	onSnapshot,
	snapshot,
	deleteDoc,
} from 'firebase/firestore'
import defaultPhoto from '../../public/defaultphoto.webp'
import { useRouter } from 'next/navigation'

import { auth, db, storage, upload } from '../firebase/config'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const router = useRouter()
	const currentUser = auth.currentUser

	const [user, setUser] = useState(null)
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		photoURL: '',
		uid: '',
	})
	const [displayName, setDisplayName] = useState('')

	const [photoURL, setPhotoURL] = useState('')

	const [photoFile, setPhotoFile] = useState(null)

	const [users, setUsers] = useState([])
	const [posts, setPosts] = useState([])
	const [newPost, setNewPost] = useState({
		title: '',
		body: '',
		author: '',
		authorUid: '',
		date: '',
		authorPhotoURL: '',
		likes: 0,
		likesBy: [],
	})

	//* STORAGE/POST FUNCTIONS

	const addPost = async (e) => {
		e.preventDefault()
		if (newPost.title !== '' && newPost.body !== '') {
			const { displayName, uid, photoURL } = user
			console.log('User:', displayName, uid, photoURL)

			await addDoc(collection(db, 'articles'), {
				title: newPost.title,
				body: newPost.body,
				author: newPost.author,
				date: newPost.date,
				likes: newPost.likes,
				authorUid: user.uid,
				authorPhotoURL: user.photoURL,
				likesBy: [],
			})
			setNewPost({
				title: '',
				body: '',
				author: '',
				date: '',
				likes: '',
				authorUid: '',
				authorPhotoURL: '',
				likesBy: [],
			})

			router.push('/')
		}
	}

	useEffect(() => {
		if (auth.currentUser?.photoURL) {
			setPhotoURL(auth.currentUser.photoURL)
		}
	}, [])

	// Display Posts from db

	useEffect(() => {
		const postData = query(collection(db, 'articles'))
		const unsubscribe = onSnapshot(postData, (QuerySnapshot) => {
			let postsArr = []

			QuerySnapshot.forEach((doc) => {
				const post = doc.data()
				const { name, uid, authorPhotoURL } = post

				const updatedPost = {
					...post,
					id: doc.id,
					authorName: name,
					authorUid: uid,
					authorPhotoURL: authorPhotoURL,
				}
				console.log('Updated Post:', updatedPost)

				postsArr.push({
					...post,
					id: doc.id,
					authorName: name,
					authorUid: uid,
					authorPhotoURL: authorPhotoURL,
				})
			})
			postsArr.sort((a, b) => new Date(b.date) - new Date(a.date))
			setPosts(postsArr)

			return () => unsubscribe()
		})
	}, [])

	const deleteItem = async (postId) => {
		try {
			const postDocRef = doc(db, 'articles', postId)
			const postDoc = await getDoc(postDocRef)

			if (postDoc.exists()) {
				const post = postDoc.data()
				if (post.author === auth.currentUser.displayName) {
					await deleteDoc(postDocRef)
					console.log('Blog post deleted successfully')
				} else {
					console.log('You do not have permission to delete this blog post')
				}
			} else {
				console.log('Blog post does not exist')
			}
		} catch (error) {
			console.error('Error deleting blog post:', error)
		}
	}

	const handlePhotoUpload = async (e) => {
		try {
			if (photoFile == null) {
				const defaultPhotoURL = { defaultPhoto }
				await updateProfile(auth.currentUser, {
					photoURL: defaultPhotoURL,
				})
				setPhotoURL(defaultPhotoURL)
				alert('Default image set')
			} else {
				const imageRef = ref(storage, `profile_photos/${auth.currentUser.uid}`)
				await uploadBytes(imageRef, photoFile)
				const downloadURL = await getDownloadURL(imageRef)
				await updateProfile(auth.currentUser, {
					photoURL: downloadURL,
				})
				alert('Image uploaded')
			}
		} catch (error) {
			console.error('Error handling photo upload:', error)
		}
	}

	const handleFileChange = (e) => {
		setPhotoFile(e.target.files[0])
	}

	useEffect(() => {
		if (auth.currentUser?.photoURL) {
			setPhotoURL(auth.currentUser.photoURL)
		}
	}, [])

	//* ACCOUNT FUNCTIONS

	const createUser = async (email, password, displayName) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user

			await updateProfile(user, { displayName })

			const userData = {
				name: displayName,
				email: email,
				photoURL: user.photoURL,
				uid: user.uid,
			}

			const userRef = doc(db, 'users', user.uid)
			await setDoc(userRef, userData)
		} catch (error) {
			console.log(error)
		}
	}
	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const handleUpdateProfile = async () => {
		if (displayName.length === 0) {
			console.log('Display name cannot be empty')
			return
		}

		try {
			await updateProfile(auth.currentUser, {
				displayName: displayName,
			})

			console.log('Profile updated successfully')
		} catch (error) {
			console.error('Error updating profile:', error)
		}
	}

	//* Watch for authentication function

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log(currentUser)
			setUser(currentUser)
		})
		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<UserContext.Provider
			value={{
				createUser,
				newUser,
				setNewUser,
				user,
				currentUser,
				logout,
				signIn,
				posts,
				users,
				addPost,
				setNewPost,
				newPost,
				deleteItem,
				handleUpdateProfile,
				setDisplayName,
				displayName,
				photoURL,
				photoFile,
				setPhotoFile,
				setPhotoURL,
				handlePhotoUpload,
				upload,
				handleFileChange,
				defaultPhoto,
				setPosts,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export const UserAuth = () => {
	return useContext(UserContext)
}
