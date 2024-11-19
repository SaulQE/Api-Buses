package com.reto.services;

import com.reto.entities.Marca;
import com.reto.repositories.MarcaRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MarcaServiceImpl implements MarcaService
{
    @Autowired
    private MarcaRespository marcaRespository;

    @Override
    @Transactional(readOnly = true)
    public List<Marca> findAll() {
        return marcaRespository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Marca> findById(Integer marcaId) {
        return marcaRespository.findById(marcaId);
    }

    @Override
    @Transactional
    public Marca save(Marca Marca) {
        return marcaRespository.save(Marca);
    }

    @Override
    @Transactional
    public void deleteById(Integer marcaId) {
        marcaRespository.deleteById(marcaId);
    }
}
