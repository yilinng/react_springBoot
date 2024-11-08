package com.todo.todo.entity;

import javax.persistence.*;
/*
 * https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongo.examples-repo
 * https://stackoverflow.com/questions/47803934/spring-boot-mongo-how-to-refer-to-document-in-other-collections-from-a-collect
 */
import lombok.Data;

@Data
@Entity
@Table(name = "roles")

public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String name;

  /*
   * public Long getId() {
   * return id;
   * }
   * 
   * public void setId(Long id) {
   * this.id = id;
   * }
   * 
   * public String getName() {
   * return name;
   * }
   * 
   * public void setName(String name) {
   * this.name = name;
   * }
   */
}
