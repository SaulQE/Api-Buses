import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Unauthorized = () => {
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-md text-center'>
				<h1 className='text-3xl font-bold text-red-600 mb-4'>
					Acceso no autorizado
				</h1>
				<p className='mb-6'>No tienes permiso para acceder a esta página.</p>
				<div className='flex justify-center space-x-4'>
					<Link
						to='/login'
						onClick={handleLogout}
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
					>
						Regresar al Login
					</Link>
				</div>
			</div>
		</div>
	);
};
