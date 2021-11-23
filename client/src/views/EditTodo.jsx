import React from 'react';
import { useParams } from 'react-router-dom';

const EditTodo = () => {
  const { id } = useParams();

  return (
    <div className="edit">
      <h1 className="edit__title">
        Edit <span>{id}</span>
      </h1>

      <form className="edit__form">
        <div className="edit__form-group">
          <div className="edit__input-wrapper">
            <input type="text" />
          </div>
          <div className="edit__button-wrapper">
            <button className="edit__button">Edit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
