import { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await todoService.getTodo();
      setTodos(data);
    } catch (err) {
      setError(err.message || 'Loading eror!');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const isLocalTodo = id > 1000000000000;
      if (!isLocalTodo) {
        await todoService.deleteTodo(id);
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      if (err.response?.status === 404) {
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        setError(err.message);
      }
    }
  };

  const addTodo = (todoText) => {
    const newTodo = {
      id: Date.now(),
      todo: todoText,
      completed: false,
      userId: 1,
    };

    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = async (id) => {
    try {
      const currentTodo = todos.find((todo) => todo.id === id);
      const isLocalTodo = id > 1000000000000;

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      if (!isLocalTodo) {
        await todoService.updateTodo(id, {
          completed: !currentTodo.completed,
        });
      }
    } catch (err) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    isLoading,
    error,
    deleteTodo,
    addTodo,
    toggleTodo,
  };
};
