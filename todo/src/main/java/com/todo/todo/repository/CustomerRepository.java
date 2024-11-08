package com.todo.todo.repository;

import com.todo.todo.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

  Customer findByEmail(String email);

  Customer findByUsernameOrEmail(String username, String email);

  Customer findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

}
