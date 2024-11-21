import { Marca } from '../interfaces/Marca';

// Base URL
const API_URL = 'http://localhost:8888/api';

// Función para obtener los headers de autorización
const getAuthHeaders = () => {
	const token = localStorage.getItem('accessToken');
	return {
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
};

// Servicio para obtener la lista de marcas
export const getMarcas = async (): Promise<Marca[]> => {
	try {
		const response = await fetch(`${API_URL}/marca`, {
			method: 'GET',
			headers: getAuthHeaders(),
		});

		if (!response.ok) {
			if (response.status === 401) {
				localStorage.removeItem('accessToken');
				window.location.href = '/login';
				throw new Error('Unauthorized');
			}
			throw new Error('Error al obtener las marcas');
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching marcas:', error);
		throw error;
	}
};
