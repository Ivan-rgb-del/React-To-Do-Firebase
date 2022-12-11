import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
  li: `flex justify-between items-center bg-slate-200 p-4 my-2 capitalize`,
  text: `ml-2 cursor-pointer`,
  button: `cursor-pointer flex items-center`
};

const TodoList = ({ todo, onDeleteTodo }) => {
  return (
    <li className={style.li}>
      <p className={style.text}>{todo.text}</p>
      <button
        onClick={() => onDeleteTodo(todo.id)}>
        {<FaRegTrashAlt />}
      </button>
    </li>
  );
};

export default TodoList;