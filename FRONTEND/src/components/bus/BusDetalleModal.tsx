import { Bus, EstadoBus } from '../../interfaces/Bus';
import { FaTimes } from 'react-icons/fa';

interface BusDetlleModalProps {
	bus: Bus | null;
	onClose: () => void;
}

export const BusDetalleModal = ({ bus, onClose }: BusDetlleModalProps) => {
	if (!bus) return null;

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
				{/* Cabecera del modal */}
				<div className='flex justify-between items-center mb-6'>
					<h2 id='modal-title' className='text-2xl font-bold text-gray-800'>
						Detalles del Bus
					</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700 transition-colors duration-200'
						aria-label='Cerrar modal'
					>
						<FaTimes size={24} />
					</button>
				</div>

				{/* Contenido del modal */}
				<div className='grid grid-cols-2 gap-4'>
					<InfoItem label='ID' value={bus.busId} />
					<InfoItem label='Número de Bus' value={bus.numeroBus} />
					<InfoItem label='Placa' value={bus.placa} />
					<InfoItem label='Marca' value={bus.marca} />
					<InfoItem
						label='Características'
						value={bus.caracteristicas || 'N/A'}
					/>
					<InfoItem
						label='Fecha de Creación'
						value={new Date(bus.fechaCreacion).toLocaleDateString()}
					/>
					<p className='font-semibold text-gray-700'>Estado:</p>
					<p>
						<span
							className={`px-3 py-1 rounded-full text-xs font-medium ${
								bus.estado === EstadoBus.ACTIVO
									? 'bg-green-200 text-green-800'
									: 'bg-red-200 text-red-800'
							}`}
						>
							{bus.estado}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

const InfoItem = ({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) => (
	<>
		<p className='font-semibold text-gray-700'>{label}:</p>
		<p className='text-gray-900'>{value}</p>
	</>
);
