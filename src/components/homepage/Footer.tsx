import React, { useContext } from 'react';
import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

import DeviceContext from '../../contexts/DeviceContext';

const Footer = () => {
  const { isMobile } = useContext(DeviceContext);

  return (
    <Flex align="center" paddingBottom="40px">
      {isMobile ? (
        <Flex align="center" direction="column" marginRight="20px">
          <Text>Built by Jennifer Lu for</Text>
          <Text>Hack the North&apos;s 2022</Text>
          <Text>Frontend Developer Challenge</Text>
        </Flex>
      ) : (
        <Text marginRight="20px">
          Built by Jennifer Lu for Hack the North&apos;s 2022 Frontend Developer
          Challenge
        </Text>
      )}
      <Link href="https://github.com/jennifer-lu/htn-dev-chl" isExternal>
        <Icon
          aria-label="Github"
          as={FaGithub}
          boxSize="30px"
          color="blue.50"
        />
      </Link>
    </Flex>
  );
};

export default Footer;
