import { FaBus, FaTags, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

export const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<nav className='bg-gray-800 text-white shadow-lg'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<span className='text-xl font-bold'>BusSystem</span>
						<div className='ml-10 flex items-baseline space-x-4'>
							{/* Enlace visible para todos los roles */}
							<NavLink
								to='/marca'
								className={({ isActive }) =>
									`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
										isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
									}`
								}
							>
								<FaTags className='mr-2' />
								Marcas
							</NavLink>

							{/* Enlace solo para ADMIN */}
							{user.roles.includes('ADMIN') && (
								<NavLink
									to='/bus'
									className={({ isActive }) =>
										`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
											isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
										}`
									}
								>
									<FaBus className='mr-2' />
									Buses
								</NavLink>
							)}
						</div>
					</div>
					<div className='flex items-center'>
						<div className='flex items-center mr-4'>
							<FaUser className='mr-2' />
							<span className='text-sm font-medium'>
								{user.roles.includes('ADMIN') ? 'Admin' : 'User'}
							</span>
						</div>
						<button
							onClick={handleLogout}
							className='flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-700'
						>
							<FaSignOutAlt className='mr-2' />
							Cerrar Sesión
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};
