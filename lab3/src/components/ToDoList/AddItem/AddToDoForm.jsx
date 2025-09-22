import React, { useState } from 'react';

export default function AddToDoForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSumbit = (e) => {
    e.preventDefault(); // don't allow to reload
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSumbit} className="add-todo">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter task name..."
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}