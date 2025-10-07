import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';
import './TodoList.css';

export const TodoList = () => {
  const { 
    todos, 
    isLoading, 
    error, 
    deleteTodo, 
    addTodo, 
    toggleTodo,
    editTodoTitle,
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    searchTerm,
    setSearchTerm,
  } = useTodos();
  
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;

    addTodo(newTodoText);
    setNewTodoText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const totalPages = Math.ceil(totalTodos / limitPerPage);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage >= totalPages;

  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">Todo List</h1>

      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter new todo..."
        />
        <button className="todo-add-btn" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos..."
        />
      </div>

      {/* Pagination Info */}
      <div className="pagination-info">
        <span>Page {currentPage} of {totalPages} | Total items: {totalTodos}</span>
      </div>

      <div className="todo-items-container">
        {!todos || todos.length === 0 ? (
          <div className="empty-state">
            {searchTerm ? 'No todos found matching your search.' : 'No todos yet. Add one to get started!'}
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodoTitle}
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button 
          className="pagination-btn"
          onClick={goToPrevPage}
          disabled={isPrevDisabled}
        >
          Previous
        </button>
        <span className="page-indicator">Page {currentPage}</span>
        <button 
          className="pagination-btn"
          onClick={goToNextPage}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};
