# Lab 3 - ToDo List Application

## Component Tree + Data Flow

### Component Hierarchy

```
App
├── h1 (title)
└── ToDoList
    ├── AddToDoForm
    │   ├── form
    │   ├── input (controlled)
    │   └── button[submit]
    └── Conditional Rendering:
        ├── p ("There is no tasks!") - if todos.length === 0
        └── ul.todo-list - if todos.length > 0
            └── ToDoItem[] (mapped from todos array)
                ├── li (with CSS modules styling)
                ├── label
                ├── input[checkbox] (controlled)
                └── button[delete]
```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                           App.jsx                           │
│                     (Presentation Layer)                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                      ToDoList.jsx                           │
│                   (State Management)                        │
│                                                             │
│  STATE:                                                     │
│  • todos: Todo[] = []                                       │
│                                                             │
│  ACTIONS:                                                   │
│  • addToDo(text: string)                                    │
│  • deleteToDo(id: string)                                   │
└─────────────┬───────────────────────────┬───────────────────┘
              │                           │
              ▼                           ▼
┌─────────────────────────┐    ┌─────────────────────────────┐
│    AddToDoForm.jsx      │    │       ToDoItem.jsx          │
│   (Input Component)     │    │    (Display Component)      │
│                         │    │                             │
│ STATE:                  │    │ STATE:                      │
│ • value: string = ""    │    │ • completed: boolean        │
│                         │    │                             │
│ PROPS:                  │    │ PROPS:                      │
│ • onAdd: (text) => void │    │ • id: string                │
│                         │    │ • text: string              │
│ EVENTS:                 │    │ • onDelete: (id) => void    │
│ • handleSubmit()        │    │                             │
│                         │    │ EVENTS:                     │
│                         │    │ • toggle completed state    │
│                         │    │ • call onDelete(id)         │
└─────────────────────────┘    └─────────────────────────────┘
```

### Data Flow Direction

#### 1. **Down Flow (Props)**
```
App → ToDoList → AddToDoForm (onAdd callback)
App → ToDoList → ToDoItem[] (id, text, onDelete callback)
```

#### 2. **Up Flow (Events)**
```
AddToDoForm → ToDoList (via onAdd callback)
ToDoItem → ToDoList (via onDelete callback)
```

### State Management Architecture

#### **State Location: ToDoList Component**
```jsx
const [todos, setTodos] = useState([]);
```

#### **State Shape:**
```typescript
interface Todo {
  id: string;        // Generated via crypto.randomUUID()
  text: string;      // User input from AddToDoForm
}

type TodosState = Todo[];
```

#### **State Operations:**

1. **Add Todo:**
   ```jsx
   const addToDo = (text) => {
     setTodos([...todos, {id: crypto.randomUUID(), text}]);
   };
   ```

2. **Delete Todo:**
   ```jsx
   const deleteToDo = (id) => {
     setTodos(todos.filter((todo) => todo.id !== id));
   };
   ```

### Component Responsibilities

| Component | Responsibility | State | Props |
|-----------|---------------|-------|--------|
| **App** | Root layout, title | None | None |
| **ToDoList** | State management, coordination | `todos[]` | None |
| **AddToDoForm** | User input handling | `value` | `onAdd` |
| **ToDoItem** | Display todo, local interactions | `completed` | `id`, `text`, `onDelete` |

### Event Flow Examples

#### **Adding a Todo:**
1. User types in `AddToDoForm` input → `value` state updates
2. User submits form → `handleSubmit()` called
3. `handleSubmit()` calls `onAdd(value)` prop
4. `ToDoList.addToDo()` executes → `todos` state updates
5. Re-render triggered → new `ToDoItem` appears

#### **Deleting a Todo:**
1. User clicks delete button in `ToDoItem`
2. `onClick={() => onDelete(id)}` executes
3. `ToDoList.deleteToDo(id)` executes → `todos` state updates
4. Re-render triggered → `ToDoItem` disappears

### Styling Architecture

- **Global styles:** Regular CSS classes
- **Component-specific:** CSS Modules (`ToDoItem.module.css`)
- **Conditional styling:** Dynamic className composition

```jsx
className={`${styles.todo} ${completed ? styles.completed : ''}`}
```