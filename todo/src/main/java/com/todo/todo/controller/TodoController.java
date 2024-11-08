package com.todo.todo.controller;

import com.todo.todo.entity.Todo;

import com.todo.todo.service.TodoService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/todos")
public class TodoController {

  @Autowired
  TodoService todoService;

  @PostMapping("")
  ResponseEntity<Todo> addTodo(@RequestBody Todo todo) {
    Todo res = todoService.addTodo(todo);
    return ResponseEntity.ok().body(res);
  }

  @PatchMapping("/{id}")
  ResponseEntity<Todo> editTodo(@PathVariable("id") Long id, @RequestBody Todo todo) {
    Todo res = todoService.editTodo(id, todo);
    return ResponseEntity.ok().body(res);
  }

  @DeleteMapping("/{id}")
  ResponseEntity<Map<String, String>> deleteTodo(@PathVariable("id") Long id) {
    Map<String, String> res = todoService.deleteTodo(id);
    return ResponseEntity.ok().body(res);
  }

  @GetMapping("")
  ResponseEntity<List<Todo>> getAllTodos() {
    List<Todo> res = todoService.getAllTodos();
    return ResponseEntity.ok().body(res);
  }

  @GetMapping("/{id}")
  ResponseEntity<Todo> getTodoById(@PathVariable("id") Long id) {
    Todo res = todoService.getTodoById(id);
    return ResponseEntity.ok().body(res);
  }

  // https://stackoverflow.com/questions/495426/restful-url-design-how-to-query-using-or-between-parameters
  // https://stackoverflow.com/questions/13715811/requestparam-vs-pathvariable
  @GetMapping("/search/")
  ResponseEntity<List<Todo>> searchTodo(@RequestParam("title") String title) {
    List<Todo> res = todoService.searchTodo(title);
    return ResponseEntity.ok().body(res);
  }

}