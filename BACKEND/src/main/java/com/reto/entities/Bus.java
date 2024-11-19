package com.reto.entities;

import com.reto.utils.EstadoBus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "buses")
public class Bus
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer busId;

    @NotNull
    @Column(nullable = false)
    private Integer numeroBus;

    @NotBlank
    @Column(nullable = false, unique = true, length = 10)
    private String placa;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(columnDefinition = "TEXT")
    private String caracteristicas;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "marca_id", nullable = false)
    private Marca marca;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoBus estado = EstadoBus.ACTIVO;

    @PrePersist
    public void onPrePersist() {
        this.fechaCreacion = LocalDateTime.now();
    }

}
