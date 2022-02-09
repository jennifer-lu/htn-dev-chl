import { createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  login: (password: string, username: string) => {},
  logout: () => {},
});

export default AuthContext;
