package com.reto.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "marcas")
public class Marca
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer marcaId;

    @NotBlank
    @Column(nullable = false, unique = true, length = 50)
    private String nombre;

}
