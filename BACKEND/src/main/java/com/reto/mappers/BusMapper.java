package com.reto.mappers;

import com.reto.dtos.BusDTO;
import com.reto.entities.Bus;
import com.reto.entities.Marca;

public class BusMapper
{
    public static BusDTO toDTO(Bus bus) {
        return new BusDTO(
                bus.getBusId(),
                bus.getNumeroBus(),
                bus.getPlaca(),
                bus.getFechaCreacion(),
                bus.getCaracteristicas(),
                bus.getMarca().getNombre(),
                bus.getEstado()
        );
    }

    public static Bus toEntity(BusDTO dto, Marca marca) {
        Bus bus = new Bus();
        bus.setBusId(dto.getBusId());
        bus.setNumeroBus(dto.getNumeroBus());
        bus.setPlaca(dto.getPlaca());
        bus.setFechaCreacion(dto.getFechaCreacion());
        bus.setCaracteristicas(dto.getCaracteristicas());
        bus.setEstado(dto.getEstado());
        bus.setMarca(marca);
        return bus;
    }
}
