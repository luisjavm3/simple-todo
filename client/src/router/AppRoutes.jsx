import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Landing from '../views/Landing';
import NotFound from '../views/NotFound';
import Signin from '../views/Signin';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import TodoView from '../views/TodoView';
import EditTodo from '../views/EditTodo';
import Signup from '../views/Signup';

const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  const { user: userObj } = user;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={userObj ? <Navigate to="/todo" replace /> : <Landing />}
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/todo"
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
