export enum EstadoBus {
	ACTIVO = 'ACTIVO',
	INACTIVO = 'INACTIVO',
}

export interface Bus {
	busId: number;
	numeroBus: number;
	placa: string;
	fechaCreacion: string;
	caracteristicas?: string;
	marca: string;
	estado: EstadoBus;
}
