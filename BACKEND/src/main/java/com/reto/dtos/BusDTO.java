package com.reto.dtos;

import com.reto.utils.EstadoBus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BusDTO
{
    private Integer busId;
    private Integer numeroBus;
    private String placa;
    private LocalDate fechaCreacion;
    private String caracteristicas;
    private Integer marca;
    private EstadoBus estado;
}
