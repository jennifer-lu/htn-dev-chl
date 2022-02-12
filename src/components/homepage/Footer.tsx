import React from 'react';
import { Flex, Icon, Image, Link, Text } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export type FooterProps = {
  isMobile: boolean;
};

const Footer = ({ isMobile }: FooterProps) => {
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
        <Icon as={FaGithub} boxSize="30px" color="blue.50" />
      </Link>
    </Flex>
  );
};

export default Footer;
