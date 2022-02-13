import React, { useContext, useEffect, useState } from 'react';
import { Flex, Heading, Spacer } from '@chakra-ui/react';

import LoginComponent from './LoginComponent';
import NavigationMenu from './NavigationMenu';
import SearchBar from './SearchBar';

import DeviceContext from '../../contexts/DeviceContext';

export type NavigationBarProps = {
  handleSearch: (searchInput: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const NavigationBar = ({
  handleSearch,
  isOpen,
  onClose,
  onOpen,
}: NavigationBarProps) => {
  const { isMobile } = useContext(DeviceContext);

  const [isOpaque, setIsOpaque] = useState<boolean>(
    isMobile ? window.pageYOffset > 200 : window.pageYOffset > 500,
  );

  // Adjust navigation bar opacity based on scroll offset
  useEffect(() => {
    const onScroll = () => {
      setIsOpaque(
        isMobile ? window.pageYOffset > 200 : window.pageYOffset > 500,
      );
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  return (
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
      {isMobile ? (
        <NavigationMenu
          handleSearch={handleSearch}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      ) : (
        <Flex>
          <SearchBar handleSearch={handleSearch} />
          <LoginComponent isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </Flex>
      )}
    </Flex>
  );
};

export default NavigationBar;
