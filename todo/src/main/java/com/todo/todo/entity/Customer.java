package com.todo.todo.entity;

import javax.persistence.*;

import javax.validation.constraints.NotBlank;

import lombok.*;

@Data

@Entity
@Table(name = "customers")
// https://www.baeldung.com/spring-jpa-joining-tables
// https://www.geeksforgeeks.org/introduction-to-project-lombok-in-java-and-how-to-get-started/
// https://www.bezkoder.com/jpa-manytoone/
// https://stackoverflow.com/questions/49561256/hibernate-criteria-for-many-to-one-ignore-a-column-when-retrieving-data
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_generator")
	private Long id;

	@NotBlank(message = "name must not be empty")
	@Column(name = "name")
	private String name;

	@NotBlank(message = "username must not be empty")
	@Column(name = "username", unique = true)
	private String username;

	@NotBlank(message = "E-mail address must not be empty")
	@Column(name = "email", unique = true)
	private String email;

	@NotBlank(message = "password must not be empty")
	@Column(name = "password")
	private String password;

	@Column(name = "role")
	private String role;

}
