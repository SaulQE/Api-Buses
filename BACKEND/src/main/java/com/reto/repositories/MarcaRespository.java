package com.reto.repositories;

import com.reto.entities.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRespository extends JpaRepository<Marca, Integer>
{
}
