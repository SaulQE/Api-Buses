package com.reto.services;

import com.reto.dtos.LoginRequest;
import com.reto.dtos.LoginResponse;
import com.reto.entities.Role;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class AuthenticationServiceImpl implements AuthenticationService
{

    private final UserService userService;
    private final JwtEncoder jwtEncoder;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthenticationServiceImpl(UserService userService, JwtEncoder jwtEncoder, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtEncoder = jwtEncoder;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {

        var user = userService.findByUsername(loginRequest.username());

        // Si el usuario no existe o la contraseña es incorrecta, lanza una excepción
        if (user.isEmpty() || !user.get().isLoginCorrect(loginRequest, passwordEncoder)) {
            throw new BadCredentialsException("user o password es invalido!");
        }

        // Crea el token JWT
        var now = Instant.now();
        var expiresIn = 500L;

        var scopes = user.get().getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        var claims = JwtClaimsSet.builder()
                .issuer("backend")
                .subject(user.get().getUserId().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .claim("scope",scopes)
                .build();

        var JwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return new LoginResponse(JwtValue, expiresIn);
    }
}
