package com.reto.dtos;

import com.reto.utils.EstadoBus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class BusDTO
{
    private Integer busId;
    private Integer numeroBus;
    private String placa;
    private LocalDate fechaCreacion;
    private String caracteristicas;
    private Object marca;
    private EstadoBus estado;

}
