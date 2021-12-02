import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Landing from '../views/Landing';
import NotFound from '../views/NotFound';
import Signin from '../views/Signin';
import ProtectedRoute from './ProtectedRoute';
import TodoView from '../views/TodoView';
import EditTodo from '../views/EditTodo';
import Signup from '../views/Signup';

const AppRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/todos" replace /> : <Landing />}
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoView />
            </ProtectedRoute>
          }
        >
          <Route path=":id" element={<EditTodo />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
