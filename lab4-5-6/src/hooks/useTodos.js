import { useState, useEffect, useMemo, useCallback } from 'react';
import { todoService } from '../services/todoService';

export const useTodos = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTodos = useCallback(async (page = currentPage, limit = limitPerPage) => {
    setIsLoading(true);
    setError(null);

    try {
      const skip = (page - 1) * limit;
      const response = await todoService.getTodo(limit, skip);
      setAllTodos(response.todos);
      setTotalTodos(response.total);
    } catch (err) {
      setError(err.message || 'Loading error!');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limitPerPage]);

  // Client-side search filtering
  const todos = useMemo(() => {
    if (!searchTerm.trim()) {
      return allTodos;
    }
    
    return allTodos.filter((todo) =>
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTodos, searchTerm]);

  const deleteTodo = async (id) => {
    try {
      const isLocalTodo = id > 1000000000000;
      if (!isLocalTodo) {
        await todoService.deleteTodo(id);
      }

      setAllTodos(allTodos.filter((todo) => todo.id !== id));
      setTotalTodos(prev => prev - 1);
    } catch (err) {
      if (err.response?.status === 404) {
        setAllTodos(allTodos.filter((todo) => todo.id !== id));
        setTotalTodos(prev => prev - 1);
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

    setAllTodos([newTodo, ...allTodos]);
    setTotalTodos(prev => prev + 1);
  };

  const toggleTodo = async (id) => {
    try {
      const currentTodo = allTodos.find((todo) => todo.id === id);
      const isLocalTodo = id > 1000000000000;

      setAllTodos(
        allTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      if (!isLocalTodo) {
        await todoService.updateTodo(id, {
          completed: !currentTodo.completed,
        });
      }
    } catch (err) {
      setAllTodos(
        allTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      setError(err.message);
    }
  };

  const editTodoTitle = async (id, newTitle) => {
    try {
      const isLocalTodo = id > 1000000000000;
      
      // Optimistically update the UI
      setAllTodos(
        allTodos.map((todo) =>
          todo.id === id ? { ...todo, todo: newTitle } : todo
        )
      );

      // If it's a server todo, update via API
      if (!isLocalTodo) {
        await todoService.updateTodo(id, { todo: newTitle });
      }
    } catch (err) {
      // Revert on error
      setError(err.message || 'Failed to update todo');
      // Re-fetch to restore correct state
      await fetchTodos(currentPage, limitPerPage);
    }
  };

  // Pagination functions
  const goToNextPage = () => {
    const totalPages = Math.ceil(totalTodos / limitPerPage);
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchTodos(nextPage, limitPerPage);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchTodos(prevPage, limitPerPage);
    }
  };

  const setLimit = (limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1); // Reset to first page when changing limit
    fetchTodos(1, limit);
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    isLoading,
    error,
    deleteTodo,
    addTodo,
    toggleTodo,
    editTodoTitle,
    // Pagination
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,
    // Search
    searchTerm,
    setSearchTerm,
  };
};
