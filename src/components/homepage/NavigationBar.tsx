import React, { useEffect, useState } from 'react';
import { Flex, Heading, Spacer } from '@chakra-ui/react';

import LoginComponent from './LoginComponent';
import NavigationMenu from './NavigationMenu';
import SearchBar from './SearchBar';

export type NavigationBarProps = {
  handleSearch: (searchInput: string) => void;
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const NavigationBar = ({
  handleSearch,
  isMobile,
  isOpen,
  onClose,
  onOpen,
}: NavigationBarProps) => {
  const [isOpaque, setIsOpaque] = useState<boolean>(window.pageYOffset > 500);

  useEffect(() => {
    const onScroll = () => {
      setIsOpaque(
        isMobile ? window.pageYOffset > 200 : window.pageYOffset > 500,
      );
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return isMobile ? (
    <Flex
      align="center"
      backgroundColor={isOpaque ? 'blue.300' : ''}
      boxShadow={isOpaque ? `0px 0px 12px 2px #000314` : ''}
      height="72px"
      padding="0px 30px"
      position="fixed"
      width="100%"
      zIndex="3"
    >
      <Heading as="h3" size="md">
        Hackathon Global
      </Heading>
      <Spacer />
      <NavigationMenu
        handleSearch={handleSearch}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Flex>
  ) : (
    <Flex
      align="center"
      backgroundColor={isOpaque ? 'blue.300' : ''}
      boxShadow={isOpaque ? `0px 0px 12px 2px #000314` : ''}
      height="72px"
      padding="0px 30px"
      position="fixed"
      width="100%"
      zIndex="3"
    >
      <Heading as="h3" size="md">
        Hackathon Global
      </Heading>
      <Spacer />
      <SearchBar handleSearch={handleSearch} />
      <LoginComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Flex>
  );
};

export default NavigationBar;
