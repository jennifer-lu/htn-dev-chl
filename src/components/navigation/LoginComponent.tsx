import React, { useContext, useState } from 'react';
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import AuthContext from '../../contexts/AuthContext';
import ColorModeContext from '../../contexts/ColorModeContext';
import DeviceContext from '../../contexts/DeviceContext';

export type LoginComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const LoginComponent = ({ isOpen, onClose, onOpen }: LoginComponentProps) => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const { isDark } = useContext(ColorModeContext);
  const { isMobile } = useContext(DeviceContext);

  const [authenticationError, setAuthenticationError] = useState<boolean>(
    false,
  );
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
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
                color={isDark ? 'white.100' : 'purple.300'}
                onClick={onClose}
                title="Close"
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
                borderColor={isDark ? 'white.100' : 'purple.300'}
                errorBorderColor="red.100"
                focusBorderColor={isDark ? 'white.100' : 'purple.300'}
                id="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                  setAuthenticationError(false);
                }}
                placeholder="Username"
                type="text"
              />
            </FormControl>
            <FormControl
              isInvalid={authenticationError}
              marginBottom="20px"
              width="300px"
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  aria-label="Password"
                  borderColor={isDark ? 'white.100' : 'purple.300'}
                  errorBorderColor="red.100"
                  focusBorderColor={isDark ? 'white.100' : 'purple.300'}
                  id="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setAuthenticationError(false);
                  }}
                  placeholder="Password"
                  type={isPasswordShown ? 'text' : 'password'}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      isPasswordShown ? 'Hide password' : 'Show password'
                    }
                    icon={isPasswordShown ? <FaRegEye /> : <FaRegEyeSlash />}
                    onClick={() => setIsPasswordShown(!isPasswordShown)}
                    title={
                      isPasswordShown ? 'Password shown' : 'Password hidden'
                    }
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
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
              variant={isDark ? 'whiteOutline' : 'purpleOutline'}
            >
              Login
            </Button>
          </Flex>
          <Image
            alt="Earth"
            borderRadius="full"
            position="absolute"
            src={
              isDark
                ? 'images/earth-modal-dark.png'
                : 'images/earth-modal-light.png'
            }
          />
        </ModalContent>
      </Modal>
      <Button
        aria-label={isAuthenticated ? 'Logout' : 'Login'}
        onClick={isAuthenticated ? logout : onOpen}
        variant={isDark ? 'whiteOutline' : 'purpleOutline'}
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </Button>
    </Flex>
  );
};

export default LoginComponent;
