import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditTodo = () => {
  const { token } = useSelector((state) => state.auth);
  const [text, setText] = useState();
  const { id: ID } = useParams();
  const [todo, setTodo] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const changeHandler = (e) => {
    e.preventDefault();

    setText(e.target.value);
  };

  const editHandler = async (e) => {
    e.preventDefault();

    try {
      const TODO = await axios.put(
        `http://localhost:5000/todos/${ID}`,
        { name: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // setTodo(TODO);
      navigate('/todos');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Something went wrong!',
        footer: 'Error updating todo.',
      });
    }
  };

  useEffect(() => {
    async function fetchTodo(id) {
      let todo = null;

      try {
        const { data } = await axios.get(`http://localhost:5000/todos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        todo = data;
      } catch (error) {}

      setTodo(todo);
      // editorRef.current.querySelector('#text-input').value = todo.name;
      document.getElementById('text-input').value = todo.name;
    }

    fetchTodo(ID);
    setText(todo.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="edit">
      <h1 className="edit__title">
        Edit <span>{ID}</span>
      </h1>

      <form className="edit__form">
        <div className="edit__form-group">
          <div className="edit__input-wrapper">
            <input type="text" onChange={changeHandler} id="text-input" />
          </div>
          <div className="edit__button-wrapper">
            <button className="edit__button" onClick={editHandler}>
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
