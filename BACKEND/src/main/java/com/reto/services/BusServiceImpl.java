package com.reto.services;

import com.reto.entities.Bus;
import com.reto.repositories.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class BusServiceImpl implements BusService
{

    @Autowired
    private BusRepository busRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<Bus> findAll(Pageable pageable) {
        return busRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Bus> findById(Integer busId) {
        return busRepository.findById(busId);
    }

    @Override
    @Transactional
    public Bus save(Bus bus) {
        return busRepository.save(bus);
    }

    @Override
    @Transactional
    public void deleteById(Integer busId) {
        busRepository.deleteById(busId);
    }
}
