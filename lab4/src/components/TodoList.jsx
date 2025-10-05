import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';
import './TodoList.css';

export const TodoList = () => {
  const { todos, isLoading, error, deleteTodo, addTodo, toggleTodo } =
    useTodos();
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

      <div className="todo-items-container">
        {todos.length === 0 ? (
          <div className="empty-state">
            No todos yet. Add one to get started!
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};
