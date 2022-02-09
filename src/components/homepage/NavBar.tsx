import React, { useContext, useState } from 'react';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import AuthContext from '../../contexts/AuthContext';

import LoginModal from './LoginModal';

const NavBar = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [authenticationError, setAuthenticationError] = useState(false);

  const onLoginClick = () => {
    onOpen();
  };

  const onLogoutClick = () => {
    logout();
  };

  const onSubmit = (password: string, username: string) => {
    setAuthenticationError(false);
    try {
      login(password, username);
      onClose();
    } catch (error) {
      setAuthenticationError(true);
    }
  };

  return (
    <>
      <Flex>
        <LoginModal
          authenticationError={authenticationError}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
        />
        <Text>Hackathon Global</Text>
        <Spacer />
        <Button onClick={isAuthenticated ? onLogoutClick : onLoginClick}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </Button>
      </Flex>
    </>
  );
};

export default NavBar;
