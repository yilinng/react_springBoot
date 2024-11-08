package com.todo.todo.entity;

import java.time.LocalDateTime;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "access_token")

public class Access_Token {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "token")
  private String token;

  @Column(name = "customer_id")
  private Long customer_id;

  @Column(name = "date")
  private LocalDateTime date;

  /*
   * public Long getId() {
   * return id;
   * }
   * 
   * public void setId(Long id) {
   * this.id = id;
   * }
   * 
   * public String getToken() {
   * return token;
   * }
   * 
   * public void setToken(String token) {
   * this.token = token;
   * }
   * 
   * public User getUser() {
   * return user;
   * }
   * 
   * public void setUser(User user) {
   * this.user = user;
   * }
   * 
   * public LocalDateTime getDate() {
   * return date;
   * }
   * 
   * public void setDate(LocalDateTime date) {
   * this.date = date;
   * }
   */

}
