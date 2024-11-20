package com.reto.controllers;

import com.reto.entities.User;
import com.reto.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController
{
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> newUser(@RequestBody User user)
    {
        userService.insertUserDefault(user);
        return new ResponseEntity<>("User creado correctamente", HttpStatus.CREATED);
    }

}
