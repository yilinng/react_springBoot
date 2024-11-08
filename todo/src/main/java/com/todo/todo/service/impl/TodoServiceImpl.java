package com.todo.todo.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.todo.todo.entity.*;

import com.todo.todo.repository.*;

import com.todo.todo.security.IAuthenticationFacade;
import com.todo.todo.service.TodoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TodoServiceImpl implements TodoService {

  private final Logger LOG = LoggerFactory.getLogger(getClass());

  @Autowired
  TodoRepository todoRepository;

  @Autowired
  CustomerRepository userRepository;

  @Autowired
  private IAuthenticationFacade authenticationFacade;

  /**
   * Method to add post
   * 
   * @param TODO contents of the TODO
   * @return Response
   */
  @Override
  public Todo addTodo(Todo todo) {

    System.out.println("addtodo....");
    Customer customer = getUser();

    Todo newTodo = new Todo();

    newTodo.setTitle(todo.getTitle());
    newTodo.setContent(todo.getContent());
    newTodo.setCreateDate(LocalDateTime.now());
    newTodo.setCustomer(customer);

    newTodo = todoRepository.save(newTodo);

    if (ObjectUtils.isEmpty(newTodo)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Todo: add failed.");
    }

    if (ObjectUtils.isEmpty(customer)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User: add todo failed.");
    }

    return newTodo;
  }

  /**
   * Method to edit TODO
   * 
   * @param id   id of the TODO
   * @param too update contents of the TODO
   * @return Response
   */
  @Override
  public Todo editTodo(Long id, Todo todo) {

    try {
      Todo todoDetails = this.getTodoById(id);
      Customer user = getUser();
      List<Todo> userTodos = todoRepository.findByCustomerId(user.getId());
      // https://stackoverflow.com/questions/18852059/java-list-containsobject-with-field-value-equal-to-x
      boolean haveTodo = userTodos.stream().anyMatch(o -> id.equals(o.getId()));

      if (haveTodo) {
        todoDetails.setTitle(todo.getTitle());
        todoDetails.setContent(todo.getContent());
        todoDetails.setUpdateDate(LocalDateTime.now());

        todoDetails = todoRepository.save(todoDetails);

      } else {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not authorized to edit!!");
      }

      return todoDetails;

    } catch (Exception e) {
      throw e;
    }

  }

  /**
   * Method to delete a post
   * 
   * @param id id of the post
   * @return Response
   */
  @Override
  public Map<String, String> deleteTodo(Long id) {

    Map<String, String> todoMap = new HashMap<String, String>();

    try {
      // todoRepository.findById(id).get();
      this.getTodoById(id);
      Customer user = getUser();
      List<Todo> userTodos = todoRepository.findByCustomerId(user.getId());

      // https://stackoverflow.com/questions/18852059/java-list-containsobject-with-field-value-equal-to-x
      boolean haveTodo = userTodos.stream().anyMatch(o -> id.equals(o.getId()));

      if (haveTodo) {
        todoRepository.deleteById(id);
        todoMap.put("message", "Todo delete success.");
      } else {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You are not authorized to delete!!");
      }

    } catch (Exception e) {
      throw e;
    }

    return todoMap;
  }

  /**
   * Method to get all the posts
   * 
   * @return Response
   */
  @Override
  public List<Todo> getAllTodos() {
    return todoRepository.findAll();
  }

  /**
   * Method to get post by id
   * 
   * @param postId - id of the post
   * @return Response
   */
  @Override
  public Todo getTodoById(Long id) {

    // LOG.info("Getting user with ID: {}.", id);
    // https://stackoverflow.com/questions/50185164/spring-boot-how-to-pass-optional-to-an-entity-class
    // System.out.println("todoDetails from get todo id");
    // System.out.println(todoDetails);
    try {
      Todo res = todoRepository.findById(id).get();
      return res;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Todo: " + id + " not exist.");
    }

  }

  @Override
  public List<Todo> searchTodo(String title) {
    System.out.println("searchTodo title");

    // System.out.println(title);
    // System.out.println(content);

    // filter double quotes
    // https://stackoverflow.com/questions/19299788/how-to-replace-double-quotes-in-a-string-with-in-java
    String filterTitle = title.replaceAll("\"", "");
    // String filterContent = content.replaceAll("\"", "");

    System.out.println(filterTitle);

    List<Todo> allTodos = todoRepository.findAll();
    List<Todo> filteredTodo = new ArrayList<Todo>();

    for (Todo i : allTodos) {
      System.out.println(i.getTitle());

      System.out.println("i.getTitle().contains(title)");
      System.out.println(i.getTitle().toLowerCase().contains(filterTitle.toLowerCase()));

      if (i.getTitle().toLowerCase().contains(filterTitle.toLowerCase())) {
        filteredTodo.add(i);
      }
    }

    return filteredTodo;

  }

  private Customer getUser() {
    Authentication authentication = authenticationFacade.getAuthentication();

    String username = authentication.getName();

    System.out.println("getUser username");

    System.out.println(username);

    Customer user = userRepository
        .findByUsernameOrEmail(username, username);
    if (user == null) {
      throw new UsernameNotFoundException(username);
    }

    return user;
  }

}