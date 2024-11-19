package com.reto.services;

import com.reto.entities.Marca;

import java.util.List;
import java.util.Optional;

public interface MarcaService
{
    List<Marca> findAll();
    Optional<Marca> findById(Integer marcaId);
    Marca save(Marca Marca);
    void deleteById(Integer marcaId);
}
