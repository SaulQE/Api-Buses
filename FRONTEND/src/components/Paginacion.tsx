import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface PaginacionProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Paginacion = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginacionProps) => {
	// Pagina anterior
	const handlePrevious = () => {
		const previousPage = Math.max(0, currentPage - 1);
		onPageChange(previousPage);
	};

	// Pagina siguiente
	const handleNext = () => {
		const nextPage = Math.min(totalPages - 1, currentPage + 1);
		onPageChange(nextPage);
	};

	return (
		<div className='flex justify-between items-center mt-6'>
			<button
				onClick={handlePrevious}
				disabled={currentPage === 0}
				className='flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
			>
				<HiChevronLeft className='mr-2' />
				Anterior
			</button>

			<span className='text-sm text-gray-700'>
				Página {currentPage + 1} de {totalPages}
			</span>

			<button
				onClick={handleNext}
				disabled={currentPage + 1 >= totalPages}
				className='flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
			>
				Siguiente
				<HiChevronRight className='ml-2' />
			</button>
		</div>
	);
};
