import { useState } from 'react';
import './TodoItem.css';

export const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
    onToggle(todo.id);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={isCompleted}
        onChange={handleToggle}
      />
      <span className={isCompleted ? 'todo-text completed' : 'todo-text'}>
        {todo.todo}
      </span>
      <button className="todo-delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
};
