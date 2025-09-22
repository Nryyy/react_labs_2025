import { useState } from 'react';
import AddToDoForm from './AddItem/AddToDoForm';
import ToDoItem from './ToDoItem/ToDoItem';

export default function ToDoList() {
  const [todos, setTodos] = useState([]);

  const addToDo = (text) => {
    setTodos([...todos, { id: crypto.randomUUID(), text }]);
  };

  const deleteToDo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <section>
      <AddToDoForm onAdd={addToDo} />
      {todos.length == 0 ? (
        <p>There is no tasks!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <ToDoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              onDelete={deleteToDo}
            />
          ))}
        </ul>
      )}
    </section>
  );
}