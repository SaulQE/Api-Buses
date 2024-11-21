import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	requiredRoles = [],
}) => {
	const { isAuthenticated, user } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (requiredRoles.length === 0) {
		return <>{children}</>;
	}

	const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));

	if (!hasRequiredRole) {
		return <Navigate to='/unauthorized' replace />;
	}

	return <>{children}</>;
};
