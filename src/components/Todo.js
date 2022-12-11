import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from 'react-icons/ai';

import TodoList from "./TodoList";
import { db } from '../firebase';
import { collection, onSnapshot, query, doc, addDoc, deleteDoc } from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto, rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid todo!');
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input
    })
    setInput('');
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push( {...doc.data(), id: doc.id} );
      });
      setTodos(todosArray);
    })
    return () => unsubscribe()
  }, []);

  // Delete todo
  const deleteTodoHandler = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>

        <form onSubmit={createTodo} className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Add Todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <TodoList
              key={index}
              todo={todo}
              onDeleteTodo={deleteTodoHandler}
            />
          ))}
        </ul>

        {todos.length > 0
          ? <p className={style.count}>You have {todos.length} todos!</p> 
          : null
        }
      </div>
    </div>
  );
}

export default Todo;