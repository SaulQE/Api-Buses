package com.reto.services;

import com.reto.entities.Role;
import com.reto.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class RoleServiceImpl implements RoleService
{

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public void insert(Role role) {
        roleRepository.save(role);
    }

    @Override
    @Transactional
    public void update(Role role) {
        roleRepository.save(role);
    }

    @Override
    @Transactional
    public void delete(Integer roleId) {
        roleRepository.deleteById(roleId);
    }

    @Override
    @Transactional(readOnly = true)
    public Role findById(Integer roleId) {
        return roleRepository.findById(roleId).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public Collection<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }
}
