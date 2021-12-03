import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import Header from '../components/Header';
import Todo from '../components/Todo';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { getTodosFromAuthUser } from '../redux/actions/todosActions';

const TodoView = () => {
  const { loading, todos } = useSelector((state) => state.todos);
  const { token } = useSelector((state) => state.auth);

  const location = useLocation();

  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const addTodoHandler = async () => {
    if (!text) {
      return Swal.fire('Insert a todos name.');
    }

    try {
      await axios.post(
        `http://localhost:5000/todos`,
        { name: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(getTodosFromAuthUser());
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.response.data.errors.name || error.message,
      });
    }
  };

  useEffect(() => {
    dispatch(getTodosFromAuthUser());
  }, [dispatch]);

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

          {loading && <span>Loading...</span>}

          <div className="todos-container">
            <ul className="todos-list">
              {todos?.map((todo) => (
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
