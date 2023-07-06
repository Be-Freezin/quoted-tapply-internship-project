import { UserAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

const ProtectedRoute = ({ children }) => {
	const { user } = UserAuth()
	const router = useRouter()

	if (!user) {
		return router.push('/')
	}
	return children
}

export default ProtectedRoute

// FIX THE DUAL RENDERING OF THE PROFILE COMPONENT!
