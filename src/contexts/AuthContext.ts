import { createContext } from 'react';

export const AuthContext = createContext({
  hasVisited: false,
  isAuthenticated: false,
  continueAsGuest: () => {},
  login: (password: string, username: string) => {},
  logout: () => {},
});

export default AuthContext;
