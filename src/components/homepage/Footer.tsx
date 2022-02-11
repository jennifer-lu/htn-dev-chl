import React from 'react';
import { Flex, Image, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex align="center" paddingBottom="40px">
      <Text marginRight="20px">
        Built by Jennifer Lu for Hack the North&apos;s 2022 Frontend Developer
        Challenge
      </Text>
      <Link href="https://github.com/jennifer-lu/htn-dev-chl" isExternal>
        <Image boxSize="20px" src="images/github.png" />
      </Link>
    </Flex>
  );
};

export default Footer;
