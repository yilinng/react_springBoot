package com.todo.todo.repository;

import com.todo.todo.entity.Role;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

  Role findByName(String name);

  List<Role> findAll();
}
