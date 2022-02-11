import React, { useEffect, useState } from 'react';
import { Flex, Heading, Spacer } from '@chakra-ui/react';

import LoginComponent from './LoginComponent';

export type NavigationBarProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const NavigationBar = ({ isOpen, onClose, onOpen }: NavigationBarProps) => {
  const [isOpaque, setIsOpaque] = useState(window.pageYOffset > 500);

  useEffect(() => {
    const onScroll = () => {
      setIsOpaque(window.pageYOffset > 500);
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Flex
      align="center"
      backgroundColor={isOpaque ? 'blue.300' : ''}
      boxShadow={isOpaque ? `0px 0px 12px 2px #000313` : ''}
      height="60px"
      padding="0px 30px"
      position="fixed"
      width="100%"
      zIndex="3"
    >
      <Heading as="h3" size="md">
        Hackathon Global
      </Heading>
      <Spacer />
      <LoginComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Flex>
  );
};

export default NavigationBar;
