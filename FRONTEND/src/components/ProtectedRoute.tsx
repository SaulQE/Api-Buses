import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
	children: React.ReactNode;
	role: 'ADMIN' | 'USER';
}

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
	const { isAuthenticated, username } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	// Verificación simple de roles
	if (role === 'ADMIN' && username !== 'admin') {
		return <Navigate to='/marca' />;
	}

	return <>{children}</>;
};
