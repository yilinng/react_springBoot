package com.todo.todo.repository;

import com.todo.todo.entity.Todo;

import java.util.*;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

  // Todo findByTodoId(String id);
  // Optional<Todo> findById(Long id);

  List<Todo> findByCustomerId(Long customer_id);

  List<Todo> findByTitle(String title);

  @Transactional
  void deleteById(long id);

}
