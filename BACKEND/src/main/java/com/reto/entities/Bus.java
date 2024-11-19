package com.reto.entities;

import com.reto.utils.EstadoBus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import java.time.LocalDate;

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
    @DateTimeFormat(pattern="yyyy-MM-dd",iso= ISO.DATE)
    private LocalDate fechaCreacion;

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
        this.fechaCreacion = LocalDate.now();
    }

}
