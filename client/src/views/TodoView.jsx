import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';

import Header from '../components/Header';
import Todo from '../components/Todo';
import { useLocation, Outlet } from 'react-router-dom';
import { getTodosFromAuthUser } from '../redux/actions/todosActions';

const TodoView = () => {
  const { loading, todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const location = useLocation();

  const addTodoHandler = () => {
    console.log(text);
  };

  useEffect(() => {
    if (!todos) dispatch(getTodosFromAuthUser());
  }, [dispatch, todos]);

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
