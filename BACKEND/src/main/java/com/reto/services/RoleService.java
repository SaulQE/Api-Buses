package com.reto.services;

import com.reto.entities.Role;

import java.util.Collection;

public interface RoleService {
    void insert(Role role);
    void update(Role role);
    void delete(Integer roleId);
    Role findById(Integer roleId);
    Collection<Role> findAll();
    Role findByName(String name);
}
