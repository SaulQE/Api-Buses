package com.reto.services;

import com.reto.entities.Bus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BusService
{
    Page<Bus> findAll(Pageable pageable);
    Optional<Bus> findById(Integer busId);
    Bus save(Bus bus);
    void deleteById(Integer busId);
}
