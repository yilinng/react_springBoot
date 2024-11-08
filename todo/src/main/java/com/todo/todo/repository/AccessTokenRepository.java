package com.todo.todo.repository;

import com.todo.todo.entity.Access_Token;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
/*
 * 
 * https://stackoverflow.com/questions/17484153/how-to-delete-items-in-mongorepository-using-query-annotation
 */

@Repository
public interface AccessTokenRepository extends JpaRepository<Access_Token, Long> {

  String findByToken(String token);

  void deleteByToken(String token);

  Boolean existsByToken(String token);

}
