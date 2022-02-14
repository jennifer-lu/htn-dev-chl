import { createContext } from 'react';

export const ColorModeContext = createContext({
  isDark: false,
  toggleIsDark: () => {},
});

export default ColorModeContext;
