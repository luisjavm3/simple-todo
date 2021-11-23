import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Todo = ({ todo }) => {
  const navigate = useNavigate();

  const editHandler = () => {
    navigate(`/todo/${todo.id}`);
  };

  const deleteHandler = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  return (
    <li className="todo">
      <div>
        <span className="todo__todo-name">{todo.name}</span>
      </div>

      <div className="todo__buttons-container">
        <button className="todo__button button--edit" onClick={editHandler}>
          edit
        </button>
        <button className="todo__button button--danger" onClick={deleteHandler}>
          delete
        </button>
      </div>
    </li>
  );
};

export default Todo;
