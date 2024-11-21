import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			await login(username, password);
			navigate('/bus');
		} catch (error) {
			setError('Nombre de usuario o contraseña no válidos');
			console.error(error);
		}
	};

	return (
		<div className='flex justify-center items-center h-screen bg-gray-100'>
			<form
				onSubmit={handleSubmit}
				className='p-8 bg-white rounded-lg shadow-md w-96'
			>
				<h2 className='text-2xl mb-6 text-center font-bold'>Login</h2>

				{error && (
					<div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>
						{error}
					</div>
				)}

				<div className='mb-4'>
					<label className='block mb-2 text-sm font-medium'>Username</label>
					<input
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
						placeholder='Ingresa tu nombre de usuario'
						className='w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
						required
					/>
				</div>

				<div className='mb-6'>
					<label className='block mb-2 text-sm font-medium'>Password</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder='Ingresa tu contraseña'
						className='w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
						required
					/>
				</div>

				<button
					type='submit'
					className='w-full p-3 bg-blue-950 text-white rounded hover:bg-blue-900 transition duration-300'
				>
					Login
				</button>
			</form>
		</div>
	);
};
