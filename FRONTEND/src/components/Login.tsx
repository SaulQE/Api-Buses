import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(username, password);
			// Si el login es exitoso
			if (username === 'admin') {
				navigate('/bus');
			} else {
				navigate('/marca');
			}
		} catch (error) {
			alert('Error en el login');
		}
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<form onSubmit={handleSubmit} className='p-4 border rounded shadow'>
				<div className='mb-4'>
					<input
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
						placeholder='Username'
						className='p-2 border rounded'
					/>
				</div>
				<div className='mb-4'>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder='Password'
						className='p-2 border rounded'
					/>
				</div>
				<button
					type='submit'
					className='w-full p-2 bg-blue-950 text-white rounded'
				>
					Login
				</button>
			</form>
		</div>
	);
};
