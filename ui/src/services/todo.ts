import axios from "axios";
import { Todo, TodoFormValues, TodoResponse } from "../types";
import { apiBaseUrl } from "../constants";

let token: string | null = null

const setToken = (newToken: String) => {
  token = `Bearer ${newToken}` 
  console.log(token)
}

const getAll = async () => {
  const { data } = await axios.get<Todo[]>(
    `${apiBaseUrl}/todos`
  );

  return data;
};


const create = async (newObject: TodoFormValues) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log('config', config)

  const { data } = await axios.post<Todo>(
    `${apiBaseUrl}/todos`,
    newObject,
    config
  );
  return data;
};

const deleteTodo = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log('config', config)

  const { data } = await axios.delete<TodoResponse>(
    `${apiBaseUrl}/todos/${id}`,
    config
  );
  return data;
};

const updateTodo = async (obj: Todo) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log('config', config)

  const { data } = await axios.patch<Todo>(
    `${apiBaseUrl}/todos/${obj.id}`,
    obj,
    config
  );
  return data;
};

export default {
  setToken,
  getAll,
  create,
  deleteTodo,
  updateTodo
};

