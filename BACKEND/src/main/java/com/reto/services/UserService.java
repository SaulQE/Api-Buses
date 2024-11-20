package com.reto.services;

import com.reto.entities.User;

import java.util.Collection;
import java.util.Optional;

public interface UserService {

    void insert(User user);
    void update(User user);
    void delete(Integer userId);
    User findById(Integer userId);
    Collection<User> findAll();
    Optional<User> findByUsername(String username);
    void insertUserDefault(User user);

}
