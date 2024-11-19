package com.reto.mappers;

import com.reto.dtos.BusDTO;
import com.reto.entities.Bus;
import com.reto.entities.Marca;

public class BusMapper
{
    public static BusDTO toDTO(Bus bus) {
        BusDTO dto = new BusDTO();
        dto.setBusId(bus.getBusId());
        dto.setNumeroBus(bus.getNumeroBus());
        dto.setPlaca(bus.getPlaca());
        dto.setFechaCreacion(bus.getFechaCreacion());
        dto.setCaracteristicas(bus.getCaracteristicas());
        dto.setEstado(bus.getEstado());
        dto.setMarca(bus.getMarca().getMarcaId());
        return dto;
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
