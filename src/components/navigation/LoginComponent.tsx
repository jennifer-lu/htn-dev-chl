import React, { useContext, useState } from 'react';
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

import AuthContext from '../../contexts/AuthContext';
import DeviceContext from '../../contexts/DeviceContext';

export type LoginComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const LoginComponent = ({ isOpen, onClose, onOpen }: LoginComponentProps) => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const { isMobile } = useContext(DeviceContext);

  const [authenticationError, setAuthenticationError] = useState<boolean>(
    false,
  );
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleSubmit = () => {
    try {
      login(password, username);
      onClose();
      setPassword('');
      setUsername('');
    } catch (error) {
      setAuthenticationError(true);
    }
  };

  return (
    <Flex marginLeft={isMobile ? '' : '20px'}>
      <Modal autoFocus={false} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="clear.100" borderRadius="full">
          <Flex align="center" direction="column" width="100%" zIndex="2">
            <Flex align="center" margin="60px 0px 30px 0px">
              <Heading margin="0px 40px 0px 60px">Login</Heading>
              <CloseButton
                aria-label="Close"
                color="white.100"
                onClick={onClose}
              />
            </Flex>
            <FormControl
              isInvalid={authenticationError}
              marginBottom="20px"
              width="300px"
            >
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                aria-label="Username"
                borderColor="white.100"
                errorBorderColor="red.100"
                focusBorderColor="white.100"
                id="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                  setAuthenticationError(false);
                }}
                placeholder="Username"
              />
            </FormControl>
            <FormControl
              isInvalid={authenticationError}
              marginBottom="20px"
              width="300px"
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                aria-label="Password"
                borderColor="white.100"
                errorBorderColor="red.100"
                focusBorderColor="white.100"
                id="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setAuthenticationError(false);
                }}
                placeholder="Password"
              />
              {authenticationError ? (
                <FormErrorMessage color="red.100">
                  Invalid username or password.
                </FormErrorMessage>
              ) : (
                <Flex height="25px" />
              )}
            </FormControl>
            <Button
              aria-label="Login"
              marginBottom="60px"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Flex>
          <Image
            alt="Earth"
            borderRadius="full"
            position="absolute"
            src="images/earth-modal.png"
          />
        </ModalContent>
      </Modal>
      <Button
        aria-label={isAuthenticated ? 'Logout' : 'Login'}
        onClick={isAuthenticated ? logout : onOpen}
        variant="whiteOutline"
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </Button>
    </Flex>
  );
};

export default LoginComponent;
