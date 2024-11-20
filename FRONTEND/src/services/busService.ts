import { Bus } from '../interfaces/Bus';

// Base URL
const API_URL = 'http://localhost:8888/api';

export interface PaginatedResponse<T> {
	content: T[];
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
}

// TODO: 1. Obtener lista de buses con paginación
export const getBuses = async (
	page = 0,
	size = 5,
): Promise<PaginatedResponse<Bus>> => {
	try {
		const response = await fetch(`${API_URL}/bus?page=${page}&size=${size}`, {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		});

		// Validar la respuesta
		if (!response.ok) {
			throw new Error('Error al obtener los buses');
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching buses:', error);
		throw error;
	}
};

// TODO: 2. Obtener un bus por su ID
export const getBusById = async (id: number): Promise<Bus> => {
	try {
		const response = await fetch(`${API_URL}/bus/${id}`, {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		});

		if (!response.ok) {
			throw new Error('Error al obtener el bus');
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching bus:', error);
		throw error;
	}
};

// TODO: 3. Crear un nuevo bus
export const createBus = async (bus: Omit<Bus, 'id'>): Promise<Bus> => {
	try {
		const response = await fetch(`${API_URL}/bus`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(bus),
		});

		if (!response.ok) {
			throw new Error('Error al crear el bus');
		}

		return await response.json();
	} catch (error) {
		console.error('Error al crear bus:', error);
		throw error;
	}
};

// TODO: 4. Actualizar un bus
export const updateBus = async (
	id: number,
	bus: Partial<Bus>, // Solo se envian las propiedades a actualizar
): Promise<Bus> => {
	try {
		const response = await fetch(`${API_URL}/bus/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(bus),
		});

		if (!response.ok) {
			throw new Error('Error al actualizar el bus');
		}

		return await response.json();
	} catch (error) {
		console.error('Error al actualizar bus:', error);
		throw error;
	}
};

// TODO: 5. Eliminar un bus
export const deleteBus = async (id: number): Promise<void> => {
	try {
		const response = await fetch(`${API_URL}/bus/${id}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(errorData?.message || 'Error al eliminar el bus');
		}
	} catch (error) {
		console.error('Error al eliminar bus:', error);
		throw error;
	}
};
