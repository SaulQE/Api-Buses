package com.reto.services;

import com.reto.dtos.LoginRequest;
import com.reto.dtos.LoginResponse;

public interface AuthenticationService
{
    LoginResponse login(LoginRequest loginRequest);
}
