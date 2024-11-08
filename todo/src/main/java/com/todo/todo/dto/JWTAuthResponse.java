package com.todo.todo.dto;

import javax.servlet.http.Cookie;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JWTAuthResponse {
  private String accessToken;
  private String refreshToken;

  private Cookie userCookie;

  private String message;

  private String tokenType = "Bearer";
}
