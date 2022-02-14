import { extendTheme } from '@chakra-ui/react';

import colors from './colors';
import Button from './components/Button';
import Heading from './components/Heading';

const theme = extendTheme({
  colors,
  components: {
    Button,
    Heading,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: `"Open Sans"`,
    heading: `"Open Sans"`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'purple.100',
        color: 'purple.300',
      },
    },
  },
});

export default theme;
