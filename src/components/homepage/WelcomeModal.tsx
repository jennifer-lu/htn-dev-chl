import React, { useContext } from 'react';
import {
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import AuthContext from '../../contexts/AuthContext';
import ColorModeContext from '../../contexts/ColorModeContext';

export type WelcomeModalProps = {
  openLogin: () => void;
};

const WelcomeModal = ({ openLogin }: WelcomeModalProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isDark } = useContext(ColorModeContext);

  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: !isAuthenticated,
  });

  const handleLogin = () => {
    onClose();
    openLogin();
  };

  return (
    <Modal autoFocus={false} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="clear.100" borderRadius="full">
        <Flex
          align="center"
          direction="column"
          padding="40px"
          width="100%"
          zIndex="2"
        >
          <Heading margin="50px 0px 5px 0px">Welcome to</Heading>
          <Heading color={isDark ? 'blue.100' : 'purple.300'}>
            Hackathon Global
          </Heading>
          <Flex>
            <Flex
              align="center"
              direction="column"
              grow="1"
              margin="30px 0px 50px 0px"
              padding="0px 30px"
              width="170px"
            >
              <Text marginBottom="30px" textAlign="center">
                Login as a hacker to view all events
              </Text>
              <Button
                aria-label="Login"
                onClick={handleLogin}
                variant={isDark ? 'whiteOutline' : 'purpleOutline'}
              >
                Login
              </Button>
            </Flex>
            <Flex
              align="center"
              direction="column"
              grow="1"
              margin="30px 0px 50px 0px"
              padding="0px 30px"
              width="170px"
            >
              <Text marginBottom="30px" textAlign="center">
                Continue as a guest to view public events
              </Text>
              <Button
                aria-label="Continue"
                onClick={onClose}
                variant={isDark ? 'whiteOutline' : 'purpleOutline'}
              >
                Continue
              </Button>
            </Flex>
          </Flex>
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
  );
};

export default WelcomeModal;
