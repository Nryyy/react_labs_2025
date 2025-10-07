import { useState } from 'react';
import './TodoItem.css';

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
    onToggle(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.todo);
  };

  const handleSave = () => {
    if (editText.trim() === '') return;
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.todo);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={isCompleted}
        onChange={handleToggle}
      />
      
      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <span className={isCompleted ? 'todo-text completed' : 'todo-text'}>
          {todo.todo}
        </span>
      )}
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="todo-save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="todo-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="todo-edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="todo-delete-btn" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};
