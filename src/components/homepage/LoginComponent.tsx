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

export type LoginComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const LoginComponent = ({ isOpen, onClose, onOpen }: LoginComponentProps) => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  const [authenticationError, setAuthenticationError] = useState<boolean>(
    false,
  );
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const onSubmit = () => {
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
    <Flex>
      <Modal autoFocus={false} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="clear.100" borderRadius="full">
          <Flex align="center" direction="column" width="100%" zIndex="2">
            <Flex align="center" margin="60px 0px 30px 0px">
              <Heading margin="0px 40px 0px 60px">Login</Heading>
              <CloseButton
                aria-label="Clear"
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
            <Button marginBottom="60px" onClick={onSubmit}>
              Submit
            </Button>
          </Flex>
          <Image
            alt=""
            borderRadius="full"
            position="absolute"
            src="images/earth-modal.png"
          />
        </ModalContent>
      </Modal>
      <Button
        onClick={isAuthenticated ? logout : onOpen}
        variant="whiteOutline"
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </Button>
    </Flex>
  );
};

export default LoginComponent;
