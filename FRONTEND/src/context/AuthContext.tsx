import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
	sub: string;
	scope: string[];
	exp: number;
}

interface User {
	id: string | null;
	roles: string[];
}

interface AuthContextType {
	isAuthenticated: boolean;
	user: User;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

const initialUser: User = { id: null, roles: [] };

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	user: initialUser,
	login: async () => {},
	logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User>(initialUser);

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			try {
				const decoded = jwtDecode<JwtPayload>(token);
				if (decoded.exp * 1000 > Date.now()) {
					setIsAuthenticated(true);
					setUser({
						id: decoded.sub,
						roles: decoded.scope,
					});
				} else {
					logout();
				}
			} catch (error) {
				logout();
			}
		}
	}, []);

	const login = async (username: string, password: string) => {
		try {
			const response = await fetch('http://localhost:8888/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			const decoded = jwtDecode<JwtPayload>(data.accessToken);

			localStorage.setItem('accessToken', data.accessToken);

			setIsAuthenticated(true);
			setUser({
				id: decoded.sub,
				roles: decoded.scope,
			});
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem('accessToken');

		setIsAuthenticated(false);
		setUser(initialUser);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth debe usarse dentro de un AuthProvider');
	}
	return context;
};
