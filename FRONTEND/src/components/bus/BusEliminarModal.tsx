import { FaTimes } from 'react-icons/fa';
import { Bus } from '../../interfaces/Bus';

interface BusEliminarModalProps {
	bus: Bus | null;
	onClose: () => void;
	onDelete: (id: number) => void;
}

export const BusEliminarModal = ({
	bus,
	onClose,
	onDelete,
}: BusEliminarModalProps) => {
	if (!bus) return null;

	const handleDelete = () => {
		onDelete(bus.busId);
		onClose();
	};

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
			onClick={onClose}
			aria-labelledby='modal-title'
			role='dialog'
		>
			<div
				className='bg-white p-8 rounded-lg max-w-md w-full transform transition-all duration-300'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 id='modal-title' className='text-2xl font-bold text-gray-800'>
						Eliminar Bus
					</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700 transition-colors duration-200'
						aria-label='Cerrar modal'
					>
						<FaTimes size={24} />
					</button>
				</div>

				<div className='mb-6'>
					<p className='text-gray-700'>
						¿Está seguro que desea eliminar el bus número {bus.numeroBus}?
					</p>
					<p className='text-sm text-gray-500 mt-2'>
						Esta acción no se puede deshacer.
					</p>
				</div>

				<div className='flex justify-end space-x-2'>
					<button
						onClick={onClose}
						className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-200'
					>
						Cancelar
					</button>
					<button
						onClick={handleDelete}
						className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200'
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
};
