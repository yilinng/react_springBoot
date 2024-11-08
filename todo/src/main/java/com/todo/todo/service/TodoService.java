package com.todo.todo.service;

import java.util.List;
import java.util.Map;

//import com.example.demo.dto.Response;
import com.todo.todo.entity.Todo;

public interface TodoService {
  Todo addTodo(Todo todo);

  Todo editTodo(Long id, Todo todo);

  Map<String, String> deleteTodo(Long id);

  List<Todo> getAllTodos();

  Todo getTodoById(Long id);

  List<Todo> searchTodo(String title);
}
