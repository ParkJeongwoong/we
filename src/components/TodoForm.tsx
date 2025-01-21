import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (title: string, description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-red-600">Add a new Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
