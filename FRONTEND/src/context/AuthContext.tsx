import { createContext, useContext, useState } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	username: string | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState<string | null>(null);

	const login = async (username: string, password: string) => {
		try {
			const response = await fetch('http://localhost:8888/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Basic ' + btoa(`${username}:${password}`),
				},
				credentials: 'include',
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			setIsAuthenticated(true);
			setUsername(data.username);
			return data;
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUsername(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
