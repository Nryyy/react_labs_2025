# Lab 4 - Todo List Application

## 🌲 Component Tree + Data Flow

```
                        App.jsx
                           |
                           v
                    TodoList.jsx
                (Container Component)
        ┌────────────────┼────────────────┐
        |                |                |
   Input Field      useTodos()      TodoItem.jsx
                         |            (x multiple)
                         |
                    ┌────┴────┐
                    |         |
              todoService   State
                    |      (todos, loading, error)
                    |
              axiosConfig
                    |
              DummyJSON API
           (https://dummyjson.com)
```

---

## 📦 Структура проєкту

```
src/
├── api/
│   └── axiosConfig.js       # Axios конфігурація
├── components/
│   ├── TodoList.jsx         # Контейнер
│   ├── TodoList.css
│   ├── TodoItem.jsx         # Елемент списку
│   └── TodoItem.css
├── hooks/
│   └── useTodos.js          # Custom hook
├── services/
│   └── todoService.js       # API сервіс
└── App.jsx
```
