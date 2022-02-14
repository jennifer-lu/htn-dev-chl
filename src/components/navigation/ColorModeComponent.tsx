import React, { useContext } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import ColorModeContext from '../../contexts/ColorModeContext';
import DeviceContext from '../../contexts/DeviceContext';

const ColorModeComponent = () => {
  const { isDark, toggleIsDark } = useContext(ColorModeContext);
  const { isMobile } = useContext(DeviceContext);

  return (
    <Flex marginLeft={isMobile ? '' : '20px'}>
      <Button
        aria-label={isDark ? 'Light Mode' : 'Dark Mode'}
        onClick={toggleIsDark}
        variant={isDark ? 'whiteOutline' : 'purpleOutline'}
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </Flex>
  );
};

export default ColorModeComponent;
