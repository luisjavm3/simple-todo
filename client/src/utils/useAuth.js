import { createContext, useContext, useState } from 'react';

const authContext = createContext();

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  return {
    isAuth,
    signin() {
      return new Promise((res) => {
        setIsAuth(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setIsAuth(false);
        res();
      });
    },
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return useContext(authContext);
}
