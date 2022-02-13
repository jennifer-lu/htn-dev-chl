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
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    body: `"Open Sans"`,
    heading: `"Open Sans"`,
  },
});

export default theme;
