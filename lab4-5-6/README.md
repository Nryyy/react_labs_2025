# Lab 4 - Todo List Application with Pagination, Search & Edit

## 🌲 Component Tree + Data Flow

```
                        App.jsx
                    (Composition Root)
                     No state here
                           |
                           | renders
                           v
                    TodoList.jsx
                (Container Component)
                           |
                    useTodos() hook
                           |
        ┌──────────────────┼──────────────────┐
        |                  |                  |
        v                  v                  v
   State Management   todoService      Render Children
        |                  |                  |
        |                  v                  |
        |            axiosConfig               |
        |                  |                  |
        |                  v                  |
        |          DummyJSON API              |
        |      GET /todos?limit&skip          |
        |      PUT /todos/{id}                |
        |      DELETE /todos/{id}             |
        |                                     |
        v                                     v
   Local State:                        TodoItem.jsx
   ├─ todos (filtered)                  (x multiple)
   ├─ allTodos (raw data)                    |
   ├─ searchTerm                    ┌────────┼────────┐
   ├─ currentPage                   |        |        |
   ├─ limitPerPage              Props ↓  Props ↓  Props ↓
   ├─ totalTodos                 todo    onToggle onDelete
   ├─ isLoading                          onEdit
   └─ error                                  |
        |                                    v
        |                          Internal State:
        |                          ├─ isEditing
        |                          ├─ editText
        └─────────────────────────└─ isCompleted
                                         
        Data Flow:
        ═══════════
        → Props (downward): todos, callbacks
        ← Callbacks (upward): user actions
        ═ API calls: Partial requests with pagination
        ═ Storage: Local state only (no external storage)
```