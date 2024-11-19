package com.reto.controllers;

import com.reto.dtos.BusDTO;
import com.reto.dtos.PaginatedResponse;
import com.reto.entities.Bus;
import com.reto.entities.Marca;
import com.reto.mappers.BusMapper;
import com.reto.services.BusService;
import com.reto.services.MarcaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bus")
public class BusController
{

    @Autowired
    private BusService busService;

    @Autowired
    private MarcaService marcaService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<BusDTO>> getAllBuses(Pageable pageable) {

        Page<Bus> busPage = busService.findAll(pageable);

        /* mapper para convertir */
        List<BusDTO> busDTOS = busPage.getContent()
                .stream()
                .map(BusMapper::toDTO)
                .toList();

        PaginatedResponse<BusDTO> response = new PaginatedResponse<>(
                busDTOS,
                busPage.getNumber(),
                busPage.getSize(),
                busPage.getTotalElements(),
                busPage.getTotalPages(),
                busPage.isLast()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{busId}")
    public ResponseEntity<BusDTO> getBusById(@PathVariable Integer busId) {
        return busService.findById(busId)
                .map(bus -> ResponseEntity.ok(BusMapper.toDTO(bus)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> saveBus(@Valid @RequestBody BusDTO busDTO, BindingResult result) {
        /* Si tiene errores */
        if (result.hasErrors()) {
            return validar(result);
        }

        Optional<Marca> optionalMarca = marcaService.findById((Integer) busDTO.getMarca());
        if (optionalMarca.isEmpty()) {
            return ResponseEntity.badRequest().body("Marca no encontrada");
        }

        Bus bus = BusMapper.toEntity(busDTO, optionalMarca.get());
        Bus savedBus = busService.save(bus);
        return ResponseEntity.status(HttpStatus.CREATED).body(BusMapper.toDTO(savedBus));
    }

    @PutMapping("/{busId}")
    public ResponseEntity<?> editBus(@Valid @RequestBody BusDTO busDTO, BindingResult result, @PathVariable Integer busId) {
        /* Si tiene errores */
        if (result.hasErrors()) {
            return validar(result);
        }

        return busService.findById(busId)
                .map(existingBus -> {
                    Optional<Marca> optionalMarca = marcaService.findById((Integer) busDTO.getMarca());
                    if (optionalMarca.isEmpty()) {
                        return ResponseEntity.badRequest().body("Marca no encontrada");
                    }

                    Bus bus = BusMapper.toEntity(busDTO, optionalMarca.get());
                    bus.setBusId(busId);
                    Bus updatedBus = busService.save(bus);
                    return ResponseEntity.ok(BusMapper.toDTO(updatedBus));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{busId}")
    public ResponseEntity<?> deleteBus(@PathVariable Integer busId) {
        Optional<Bus> optionalBus = busService.findById(busId);
        if (optionalBus.isPresent()) {
            busService.deleteById(busId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /* Validaciones */
    private static ResponseEntity<Map<String, String>> validar(BindingResult result) {
        Map<String, String> errores = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errores.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errores);
    }

}
