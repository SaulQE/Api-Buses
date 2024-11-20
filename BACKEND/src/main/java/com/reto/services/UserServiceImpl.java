package com.reto.services;

import com.reto.entities.Role;
import com.reto.entities.User;
import com.reto.repositories.RoleRepository;
import com.reto.repositories.UserRepository;
import com.reto.utils.Values;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public void insert(User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

        Set<Role> roles = new HashSet<>();
        for (Role role : user.getRoles()) {
            Role existingRole = roleRepository.findById(role.getRoleId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role no encontrado"));
            roles.add(existingRole);
        }
        user.setRoles(roles);

        userRepository.save(user);
    }

    @Override
    @Transactional
    public void update(User user) {
        // Busca el usuario existente
        User existingUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        BeanUtils.copyProperties(user, existingUser, "userId", "roles");
        existingUser.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

        // Actualiza los roles del usuario
        Set<Role> roles = new HashSet<>();
        for (Role role : user.getRoles()) {
            Role existingRole = roleRepository.findById(role.getRoleId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role no encontrado"));
            roles.add(existingRole);
        }
        existingUser.setRoles(roles);

        // Guarda el usuario actualizado
        userRepository.save(existingUser);
    }

    @Override
    @Transactional
    public void delete(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        user.getRoles().clear();
        userRepository.save(user);

        userRepository.deleteById(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public User findById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public Collection<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public void insertUserDefault(User user) {
        var basicRole = roleRepository.findByName(Values.BASIC.name());

        var userFromDb = userRepository.findByUsername(user.getUsername());
        if (userFromDb.isPresent()) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        //Encriptar password
        String bCrypt = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(bCrypt);
        //Asignar rol por defecto
        user.setRoles(Set.of(basicRole));

        userRepository.save(user);
    }
}
