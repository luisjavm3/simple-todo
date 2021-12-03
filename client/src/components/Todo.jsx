import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosFromAuthUser } from '../redux/actions/todosActions';

const Todo = ({ todo }) => {
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editHandler = () => {
    navigate(`/todos/${todo._id}`);
  };

  const deleteHandler = async () => {
    await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/todos/${todo._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            dispatch(getTodosFromAuthUser());
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message || 'Something went wrong!',
              footer: 'Error deleting todo.',
            });
          });
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
