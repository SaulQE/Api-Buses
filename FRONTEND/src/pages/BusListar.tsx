import { useState, useEffect } from 'react';
import { getBuses, deleteBus, getBusById } from '../services/busService';
import { Paginacion } from '../components/Paginacion';
import { Loader } from '../components/Loader';
import { BusDetalleModal } from '../components/bus/BusDetalleModal';
import { BusTable } from '../components/bus/BusTable';
import { Bus } from '../interfaces/Bus';

export const BusListar = () => {
	const [buses, setBuses] = useState<Bus[]>([]);
	const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	// Cargar los buses cuando cambie la página
	useEffect(() => {
		const fetchBuses = async () => {
			setIsLoading(true);
			try {
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
	}, [page]);

	const handleDeleteBus = async (id: number) => {
		try {
			await deleteBus(id);
			setBuses(prevBuses => prevBuses.filter(bus => bus.busId !== id));
		} catch (error) {
			console.error('Error al eliminar bus:', error);
			alert('Hubo un error al intentar eliminar el bus');
		}
	};

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
			</div>

			{/* Indicador de carga o tabla de buses */}
			{isLoading ? (
				<Loader />
			) : (
				<BusTable
					buses={buses}
					onDetail={handleBusDetalle}
					onDelete={handleDeleteBus}
					marcas={[]}
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
