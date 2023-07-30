import { useState, useEffect } from "react";
import { RiDeleteBinLine } from 'react-icons/ri';


const ToDo = () => {
    const [todo, setTodo] =  useState([]);
    const [todoInput, setTodoInput] = useState('');

    const addTodo = () => {
        if(todoInput.trim() !== ''){
            const newTodo = {
                id: Date.now(),
                text: todoInput,
                completed: false
            };
            setTodo([...todo, newTodo]);
            setTodoInput('')
        }
    }

      // Toggle the completed status of a todo item
  const toggleTodo = (id) => {
    setTodo((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Remove completed todo items
  const removeCompletedTodos = () => {
    setTodo((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  // useEffect to persist the todos in localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodo(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  return (
   
    <div className="container">
    <h1>Todo App</h1>
    <div className="input-container">
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="Enter your todo..."
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
    <ul>
      {todo.map((todo) => (
        <li
          key={todo.id}
          className={todo.completed ? 'completed' : ''}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
          <span className="delete-icon" onClick={() =>  removeCompletedTodos(todo.id)}>
            <RiDeleteBinLine />
          </span>
        </li>
      ))}
    </ul>
    <button className="remove-btn" onClick={() => setTodo([])}>
      Remove All
    </button>
  </div>
  );
} 

export default ToDo