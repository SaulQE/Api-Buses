import { FaBus, FaTags, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
	const user = {
		name: 'Juan Pérez',
	};

	const handleLogout = () => {
		console.log('Cerrando sesión...');
	};

	return (
		<nav className='bg-gray-800 text-white shadow-lg'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<a href='#' className='flex-shrink-0'>
							<span className='text-xl font-bold'>BusSystem</span>
						</a>
						<div className='ml-10 flex items-baseline space-x-4'>
							<a
								href='#'
								className='flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'
							>
								<FaBus className='mr-2' />
								Buses
							</a>
							<a
								href='#'
								className='flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'
							>
								<FaTags className='mr-2' />
								Marcas
							</a>
						</div>
					</div>
					<div className='flex items-center'>
						<div className='flex items-center mr-4'>
							<FaUser className='mr-2' />
							<span className='text-sm font-medium'>{user.name}</span>
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
}
