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
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  fonts: {
    heading: `"Open Sans"`,
    body: `"Open Sans"`,
  },
});

export default theme;
