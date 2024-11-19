package com.reto.controllers;

import com.reto.entities.Bus;
import com.reto.services.BusService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bus")
public class BusController
{

    @Autowired
    private BusService busService;

    @GetMapping
    public ResponseEntity<Page<Bus>> getAllBuses(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(busService.findAll(pageable));
    }

    @GetMapping("/{busId}")
    public ResponseEntity<Bus> getBusById(@PathVariable Integer busId) {
        return busService.findById(busId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> saveBus(@Valid @RequestBody Bus bus, BindingResult result) {
        /* Si tiene errores */
        if (result.hasErrors()) {
            return validar(result);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(busService.save(bus));
    }

    @PutMapping("/{busId}")
    public ResponseEntity<?> editBus(@Valid @RequestBody Bus newBus, BindingResult result, @PathVariable Integer busId) {
        /* Si tiene errores */
        if (result.hasErrors()) {
            return validar(result);
        }

        Optional<Bus> optionalBus = busService.findById(busId);
        if (optionalBus.isPresent()){
            newBus.setBusId(busId);
            return ResponseEntity.ok(busService.save(newBus));
        }
        return ResponseEntity.notFound().build();
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
