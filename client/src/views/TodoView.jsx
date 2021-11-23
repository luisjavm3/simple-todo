import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import data from '../data';
import Header from '../components/Header';
import Todo from '../components/Todo';
import { useLocation, Outlet } from 'react-router-dom';

const TodoView = () => {
  const [text, setText] = useState('');

  const user = useSelector((state) => state.user);
  const { user: userObj } = user;

  const location = useLocation();

  const todos = findTodosFromUser(userObj);

  const addTodoHandler = () => {
    addTodo(text, userObj);
  };

  return (
    <div>
      <Header />

      {location.pathname === '/todo' ? (
        <Fragment>
          <div className="add-todo">
            <div>
              <input
                type="text"
                className="add-todo-input"
                onChange={(e) => setText(e.target.value)}
              />
              <button className="todo__button" onClick={addTodoHandler}>
                add
              </button>
            </div>
          </div>

          <div className="todos-container">
            <ul className="todos-list">
              {todos.map((todo) => (
                <Todo todo={todo} key={todo.id} />
              ))}
            </ul>
          </div>
        </Fragment>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

const findTodosFromUser = (user) => {
  return data.todos.filter((todo) => todo.user === user.id);
};

const addTodo = (text, user) => {
  const newTodo = { id: uuidv4(), name: text, user: user.id };

  console.log(newTodo);
  data.todos.push(newTodo);
};

export default TodoView;
