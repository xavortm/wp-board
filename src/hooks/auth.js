import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return () => {
      setUser("user");
      cb();
    };
  };

  const signout = (cb) => {
    return () => {
      setUser(null);
      cb();
    };
  };

  return {
    user,
    signin,
    signout,
  };
};
