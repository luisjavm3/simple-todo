import { useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Todo from '../components/Todo';
import { useLocation, Outlet } from 'react-router-dom';

const TodoView = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  const location = useLocation();

  const addTodoHandler = () => {
    // addTodo(text, userObj);
  };

  useEffect(() => {
    async function fetchTodos(token) {
      const { data: user } = await axios.get(`http://localhost:5000/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = await axios.get(
        `http://localhost:5000/users/${user._id}/todos`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodos(data);
    }

    fetchTodos(token);
  }, [token]);

  return (
    <div>
      <Header />

      {location.pathname === '/todos' ? (
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
                <Todo todo={todo} key={todo._id} />
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

export default TodoView;
