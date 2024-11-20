import { useState, useEffect } from 'react';
import { Bus } from '../interfaces/Bus';
import { getBusById, getBuses } from '../services/busService';
import { BusTable } from './BusTable';
import { Paginacion } from './Paginacion';
import { BusDetalleModal } from './BusDetalleModal';
import { FaPlus } from 'react-icons/fa';
import { Button } from './Button';
import { Loader } from './Loader';

export const BusListar = () => {
	const [buses, setBuses] = useState<Bus[]>([]);
	const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	// cargar los buses cuando cambie la página
	useEffect(() => {
		const fetchBuses = async () => {
			setIsLoading(true);
			try {
				// Obtener los datos de buses de la página actual
				const data = await getBuses(page);
				setBuses(data.content);
				setTotalPages(data.totalPages);
			} catch (error) {
				console.error('Error al cargar buses:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBuses();
	}, [page]); // Se ejecuta nuevamente si cambia la página

	const handleBusDetalle = async (id: number) => {
		try {
			const bus = await getBusById(id);
			setSelectedBus(bus);
		} catch (error) {
			console.error('Error al cargar el detalle del bus: ', error);
		}
	};

	return (
		<div className='container mx-auto p-4'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold text-gray-800'>Lista de Buses</h1>
				<Button icon={<FaPlus />} onClick={() => console.log('Agregar Bus')}>
					Agregar Bus
				</Button>
			</div>

			{/* Indicador de carga o tabla de buses */}
			{isLoading ? (
				<Loader />
			) : (
				<BusTable
					buses={buses}
					onDetail={handleBusDetalle}
					onEdit={id => console.log('Editar', id)}
					onDelete={id => console.log('Eliminar', id)}
				/>
			)}
			<Paginacion
				currentPage={page}
				totalPages={totalPages}
				onPageChange={setPage}
			/>
			<BusDetalleModal bus={selectedBus} onClose={() => setSelectedBus(null)} />
		</div>
	);
};
