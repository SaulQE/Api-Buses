package com.reto.controllers;

import com.reto.entities.Marca;
import com.reto.services.MarcaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/marca")
@CrossOrigin(origins = "http://localhost:5173")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN') or hasAnyAuthority('SCOPE_BASIC')")
    public ResponseEntity<?> getAllMarcas(){
        return ResponseEntity.ok(marcaService.findAll());
    }
    
    @GetMapping("/{marcaId}")
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN') or hasAnyAuthority('SCOPE_BASIC')")
    public ResponseEntity<?> getMarcaById(@PathVariable Integer marcaId){
        return marcaService.findById(marcaId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ResponseEntity<?> saveMarca(@Valid @RequestBody Marca marca, BindingResult result) {
        /* Si tiene errores */
        if (result.hasErrors()) {
            return validar(result);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(marcaService.save(marca));
    }

    @PutMapping("/{marcaId}")
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ResponseEntity<?> editMarca(@Valid @RequestBody Marca newMarca, BindingResult result, @PathVariable Integer marcaId) {
        /* Si tiene errores */
        if (result.hasErrors()) {
            return validar(result);
        }

        Optional<Marca> optionalMarca = marcaService.findById(marcaId);
        if (optionalMarca.isPresent()){
            newMarca.setMarcaId(marcaId);
            return ResponseEntity.ok(marcaService.save(newMarca));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{marcaId}")
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN')")
    public ResponseEntity<?> deleteMarca(@PathVariable Integer marcaId) {
        Optional<Marca> optionalMarca = marcaService.findById(marcaId);
        if (optionalMarca.isPresent()) {
            marcaService.deleteById(marcaId);
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
