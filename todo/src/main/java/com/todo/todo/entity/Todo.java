package com.todo.todo.entity;

import java.time.LocalDateTime;

import javax.persistence.*;
import lombok.Data;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

//https://stackoverflow.com/questions/49561256/hibernate-criteria-for-many-to-one-ignore-a-column-when-retrieving-data
//https://dev.to/francescoxx/java-crud-rest-api-using-spring-boot-hibernate-postgres-docker-and-docker-compose-5cln
//https://stackoverflow.com/questions/7197181/jpa-unidirectional-many-to-one-and-cascading-delete
@Data
@Entity
@Table(name = "todos")
public class Todo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "title")
  private String title;

  @Column(name = "content")
  private String content;

  @Column(name = "createDate")
  private LocalDateTime createDate;

  @Column(name = "updateDate")
  private LocalDateTime updateDate;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "customer_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private Customer customer;

}