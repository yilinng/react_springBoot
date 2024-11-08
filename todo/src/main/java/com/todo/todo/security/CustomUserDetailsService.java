package com.todo.todo.security;

import com.todo.todo.entity.*;
import com.todo.todo.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  private CustomerRepository customerRepository;

  public CustomUserDetailsService(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }
  // https://www.javadevjournal.com/spring/spring-security-userdetailsservice/

  @Override
  public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {

    final Customer findCustomer = customerRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

    if (findCustomer == null) {
      throw new UsernameNotFoundException(usernameOrEmail);
    }

    UserDetails user = User.withUsername(findCustomer.getEmail()).password(findCustomer.getPassword())
        .authorities("USER")
        .build();

    // https://www.baeldung.com/spring-security-authentication-with-a-database
    return user;
  }
}