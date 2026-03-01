import React, { useEffect, useState } from "react";

const TodoApp = () => {
  const [newtodo, setNewtodo] = useState("");
  const [todo, setTodo] = useState(() => {
    const savedtodo = localStorage.getItem("todo");
    return savedtodo ? JSON.parse(savedtodo) : [];
  });

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (newtodo.trim()) {
      setTodo([...todo, { text: newtodo }]);
      setNewtodo("");
    } else {
      alert("Todo is empty! Write something...!");
    }
  };

  const handleDelete = (index) => {
    setTodo((prev) => prev.filter((_, id) => id !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center tracking-tight">
          My Tasks
        </h1>

        <form onSubmit={handlesubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-purple-400 transition-colors"
            value={newtodo}
            onChange={(e) => setNewtodo(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all active:scale-95 cursor-pointer"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todo.length === 0 ? (
            <p className="text-center text-gray-400 italic">
              No tasks yet. Relax! ☕
            </p>
          ) : (
            todo.map((todos, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl group hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <span className="text-gray-700 font-medium">{todos.text}</span>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-400 hover:text-red-600 font-medium text-sm transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
