// Import the functions you need from the SDKs you need
'use client'
import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, updateProfile, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: 'G-CE6NFR1V6D',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const storage = getStorage(app)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Custom hook
// export function useAuth() {
// 	const [currentUser, setCurrentUser] = useState()

// 	useEffect(() => {
// 		const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user))
// 		return unsub
// 	}, [])

// 	return currentUser
// }


// Storage
export async function upload(file, currentUser,) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  
  alert("Uploaded file!");
}

export default app
