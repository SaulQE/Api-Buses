import { FaBus, FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { Bus, EstadoBus } from '../interfaces/Bus';

interface BusTableProps {
	buses: Bus[];
	onDetail: (id: number) => void;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

export const BusTable: React.FC<BusTableProps> = ({
	buses,
	onDetail,
	onEdit,
	onDelete,
}) => {
	return (
		<div className='overflow-x-auto bg-white shadow-md rounded-lg'>
			<table className='min-w-full leading-normal'>
				<thead>
					<tr className='bg-gray-200'>
						{/* array para las cabeceras */}
						{[
							'ID',
							'Número de Bus',
							'Placa',
							'Fecha Creación',
							'Características',
							'Marca',
							'Estado',
							'Acciones',
						].map(header => (
							<th
								key={header}
								className='px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{buses.map(bus => (
						<tr key={bus.busId} className='hover:bg-gray-100'>
							<td className='px-5 py-4 border-b border-gray-200 text-sm'>
								{bus.busId}
							</td>
							<td className='px-5 py-4 border-b border-gray-200 text-sm'>
								<div className='flex items-center'>
									<FaBus className='text-gray-500 mr-2' />
									{bus.numeroBus}
								</div>
							</td>
							<td className='px-5 py-4 border-b border-gray-200 text-sm'>
								{bus.placa}
							</td>
							<td className='px-5 py-4 border-b border-gray-200 text-sm'>
								{bus.fechaCreacion}
							</td>
							<td className='px-5 py-4 border-b border-gray-200 text-sm'>
								{bus.caracteristicas}
							</td>
							<td className='px-5 py-4 border-b border-gray-200 text-sm'>
								{bus.marca}
							</td>
							<td className='px-5 py-4 border-b border-gray-200 text-sm'>
								<span
									className={`px-3 py-1 rounded-full text-xs font-medium ${
										bus.estado === EstadoBus.ACTIVO
											? 'bg-green-200 text-green-800'
											: 'bg-red-200 text-red-800'
									}`}
								>
									{bus.estado}
								</span>
							</td>
							<td className='px-5 py-4 border-b border-gray-200 text-sm'>
								<div className='flex items-center space-x-2'>
									<button
										onClick={() => onDetail(bus.busId)}
										className='text-blue-600 hover:text-blue-900 text-xl'
									>
										<FaInfoCircle />
									</button>
									<button
										onClick={() => onEdit(bus.busId)}
										className='text-yellow-600 hover:text-yellow-900 text-xl'
									>
										<FaEdit />
									</button>
									<button
										onClick={() => onDelete(bus.busId)}
										className='text-red-600 hover:text-red-900 text-xl'
									>
										<FaTrash />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
