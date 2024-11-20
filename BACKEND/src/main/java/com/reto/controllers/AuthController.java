package com.reto.controllers;

import com.reto.dtos.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok()
                .body(Map.of(
                        "message", "Login exitoso",
                        "username", loginRequest.getUsername()
                ));
    }
}
