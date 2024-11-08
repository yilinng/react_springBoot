package com.todo.todo.service;

import java.util.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import com.todo.todo.payload.*;

public interface AuthService {
  Map<String, String> login(LoginDto loginDto);

  String register(SignUpDto signupDto);

  String logout(AccessTokenDto accessToken);

  HashMap<String, String> GetRefreshtoken(AccessTokenDto accessToken);

  Cookie generateCookie(String user_id);

  Optional<String> readServletCookie(HttpServletRequest request, String name);

  HashMap<String, Object> getUser(String usernameOrEmail);

  HashMap<String, List<String>> findAllEmail();

  // String refreshtoken(HttpServletRequest request);

}
