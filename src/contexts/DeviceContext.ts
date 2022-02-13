import { createContext } from 'react';

export const DeviceContext = createContext({
  isMobile: false,
});

export default DeviceContext;
