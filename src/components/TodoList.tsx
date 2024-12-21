import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-red-600">Todo List</h2>
      <ul className="list-disc pl-5">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center">
            <div>
              <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </h3>
              <p className={`text-sm ${todo.completed ? 'line-through' : ''}`}>
                {todo.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
