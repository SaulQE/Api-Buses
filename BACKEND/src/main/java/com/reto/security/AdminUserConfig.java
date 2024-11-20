package com.reto.security;

import com.reto.entities.User;
import com.reto.services.RoleService;
import com.reto.services.UserService;
import com.reto.utils.Values;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Configuration // Configuración de la creación del usuario administrador
public class AdminUserConfig implements CommandLineRunner {

    private RoleService roleService;
    private UserService userService;
    private BCryptPasswordEncoder passwordEncoder;

    public AdminUserConfig(RoleService roleService, UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.roleService = roleService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override // Método que se ejecuta al inicio de la aplicación
    @Transactional
    public void run(String... args) throws Exception {
        var roleAdmin = roleService.findByName(Values.ADMIN.name());
        var roleDBA = roleService.findByName(Values.DBA.name());
        var userAdmin = userService.findByUsername("SuperAdmin");

        // Si el usuario administrador existe, imprime un mensaje
        // Si no existe, crea un nuevo usuario administrador y lo guarda en la base de datos
        userAdmin.ifPresentOrElse(
                user -> {
                    System.out.println("SuperAdmin ya existe en la base de datos");
                },
                () -> {
                    var user = new User();
                    user.setUsername("SuperAdmin");
                    user.setPassword(passwordEncoder.encode("123"));
                    user.setRoles(Set.of(roleAdmin, roleDBA));
                    user.setEmail("saulEs@gmail.com");
                    user.setRoles(Set.of(roleAdmin, roleDBA));
                    userService.insert(user);
                }
        );

    }
}
