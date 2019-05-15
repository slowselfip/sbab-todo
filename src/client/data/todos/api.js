import axios from 'axios';
import { ensureArray } from '../../util/common-util';

const baseURL = `${TODO_SERVICE_PROTOCOL}://${TODO_SERVICE_HOST}:${TODO_SERVICE_PORT}`;
const todoURL = `${baseURL}${TODO_URL}`;
const orderURL = `${baseURL}${ORDER_URL}`;
const headers = {
  'Content-Type': 'application/json'
};

const todos = axios.create({
  baseURL: todoURL,
  headers
});

const order = axios.create({
  baseURL: orderURL,
  headers
});

const api = {
  fetchTodos: () => todos.get(),
  createTodo: todo => todos.post('', todo),
  updateTodo: todo => todos.put(todo.id, todo),
  updateOrder: ids => order.put('', ids),
  deleteTodos: ids => todos.post('/batch/delete', ensureArray(ids)),
  deleteAllTodos: () => todos.delete('')
};

export default api;
