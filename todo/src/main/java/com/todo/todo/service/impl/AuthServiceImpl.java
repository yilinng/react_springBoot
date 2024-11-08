package com.todo.todo.service.impl;

import com.todo.todo.entity.*;

import com.todo.todo.payload.*;

import com.todo.todo.repository.*;

import com.todo.todo.security.JwtTokenProvider;
import com.todo.todo.service.AuthService;

import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Service
public class AuthServiceImpl implements AuthService {

  private AuthenticationManager authenticationManager;
  private CustomerRepository customerRepository;
  private AccessTokenRepository accessTokenRepository;
  // private RoleRepository roleRepository;
  private PasswordEncoder passwordEncoder;
  private JwtTokenProvider jwtTokenProvider;

  private TodoRepository todoRepository;

  public AuthServiceImpl(
      JwtTokenProvider jwtTokenProvider,
      CustomerRepository customerRepository,
      AccessTokenRepository accessTokenRepository,
      RoleRepository roleRepository,
      TodoRepository todoRepository,
      PasswordEncoder passwordEncoder,
      AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
    this.customerRepository = customerRepository;
    this.accessTokenRepository = accessTokenRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtTokenProvider = jwtTokenProvider;
    this.todoRepository = todoRepository;
    // this.roleRepository = roleRepository;
  }

  @Override
  public Map<String, String> login(LoginDto loginDto) {

    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
        loginDto.getUsernameOrEmail(), loginDto.getPassword()));
    System.out.println("authentication login");

    System.out.println(authentication);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    Map<String, String> token = jwtTokenProvider.generateToken(authentication);

    Access_Token new_access_Token = new Access_Token();

    new_access_Token.setToken(token.get("refreshToken"));

    Customer user = customerRepository
        .findByUsernameOrEmail(loginDto.getUsernameOrEmail(),
            loginDto.getUsernameOrEmail());
    if (user == null) {
      throw new UsernameNotFoundException(loginDto.getUsernameOrEmail());
    }

    new_access_Token.setCustomer_id(user.getId());

    new_access_Token.setDate(LocalDateTime.now());
    // accessTokenRepository.save(new_access_Token);

    token.put("user_id", user.getId().toString());

    return token;
  }

  @Override
  public String register(SignUpDto signUpDto) {

    System.out.println("register signupDto");
    System.out.println(signUpDto);
    // add check for username exists in database
    // https://stackoverflow.com/questions/16232833/how-to-respond-with-an-http-400-error-in-a-spring-mvc-responsebody-method-retur
    if (customerRepository.existsByUsername(signUpDto.getUsername())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is already exists!.");
    }

    // add check for email exists in database
    if (customerRepository.existsByEmail(signUpDto.getEmail())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already exists!.");
    }

    Customer customer = new Customer();
    customer.setName(signUpDto.getName());
    customer.setUsername(signUpDto.getUsername());
    customer.setEmail(signUpDto.getEmail());
    customer.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
    // user.setTodos(null);

    // List<Role> roles = new ArrayList<>();
    // Role userRole = roleRepository.findByName("ROLE_USER");
    // System.out.println("find userRole");

    // System.out.println(userRole);
    // roles.add(userRole);
    customer.setRole("ROLE_USER");

    customerRepository.save(customer);

    return "User registered successfully!.";
  }

  // https://www.baeldung.com/get-user-in-spring-security
  @Override
  public String logout(AccessTokenDto accessToken) {
    /*
     * 
     * if (!accessTokenRepository.existsByToken(accessToken.getToken())) {
     * throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
     * "token not found..");
     * }
     * 
     * accessTokenRepository.deleteByToken(accessToken.getToken());
     */
    // https://www.mongodb.com/docs/manual/tutorial/expire-data/
    return "User logout successfully!.";
  }

  // when token expired, have to use refresh token to generate new access token

  @Override
  public HashMap<String, String> GetRefreshtoken(AccessTokenDto accessToken) {
    System.out.println("GetRefreshtoken");
    System.out.println(accessToken.getToken());
    if (!accessTokenRepository.existsByToken(accessToken.getToken())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "refresh token not found.., please try again.");
    }
    HashMap<String, String> token = new HashMap<String, String>();

    token.put("accessToken", "token");

    return token;
  }

  @Override
  public Cookie generateCookie(String user_id) {
    // System.out.println("generateCookie token " + user_id);
    /*
     * generate cookie by user id
     * https://stackoverflow.com/questions/64607023/how-to-get-current-user-id-in-
     * spring
     * https://reflectoring.io/spring-boot-cookies/
     * https://www.baeldung.com/java-base64-encode-and-decode
     */
    // get username from token
    // String username = jwtTokenProvider.getUsername(token);

    // System.out.println("generateCookie username " + username);

    // User user = userRepository.findByUsername(username).get();

    // System.out.println(" user.getId() " + user.getId());

    String originalId = user_id;
    String encodedId = new String(Base64.encodeBase64(originalId.getBytes()));
    // String decodedId = new String(Base64.decodeBase64(encodedId.getBytes()));

    // System.out.println("user id " + originalId + "encodedId " + encodedId +
    // "decodeId " + decodedId);

    Cookie jwtTokenCookie = new Cookie("user-id", encodedId);

    jwtTokenCookie.setMaxAge(86400);
    jwtTokenCookie.setSecure(true);
    jwtTokenCookie.setHttpOnly(true);
    jwtTokenCookie.setPath("/");
    jwtTokenCookie.setDomain("localhost");

    System.out.print("init jwtTokenCookie");

    System.out.print(jwtTokenCookie);

    return jwtTokenCookie;
  }

  @Override
  public Optional<String> readServletCookie(HttpServletRequest request, String name) {
    return Arrays.stream(request.getCookies())
        .filter(cookie -> name.equals(cookie.getName()))
        .map(Cookie::getValue)
        .findAny();
  }

  // https://stackoverflow.com/questions/14599317/hashmap-holding-different-data-types-as-values-for-instance-integer-string-and
  @Override
  public HashMap<String, Object> getUser(String usernameOrEmail) {
    Customer user = customerRepository
        .findByUsernameOrEmail(usernameOrEmail,
            usernameOrEmail);
    if (user == null) {
      throw new UsernameNotFoundException(usernameOrEmail);
    }
    List<Todo> todos = todoRepository.findByCustomerId(user.getId());

    HashMap<String, Object> findUser = new HashMap<String, Object>();

    findUser.put("id", user.getId().toString());
    findUser.put("name", user.getName());
    findUser.put("username", user.getUsername());
    findUser.put("email", user.getEmail());
    findUser.put("todos", todos);

    return findUser;
  }

  @Override
  public HashMap<String, List<String>> findAllEmail() {
    List<Customer> users = customerRepository.findAll();

    HashMap<String, List<String>> findUser = new HashMap<String, List<String>>();
    List<String> emails = new ArrayList<String>();
    List<String> usernames = new ArrayList<String>();

    for (Customer i : users) {
      emails.add(i.getEmail());
      usernames.add(i.getUsername());
    }

    findUser.put("email", emails);
    findUser.put("username", usernames);

    return findUser;
  }

}
