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
} from '@chakra-ui/react';

import AuthContext from '../../contexts/AuthContext';

export type WelcomeModalProps = {
  openLogin: () => void;
};

const WelcomeModal = ({ openLogin }: WelcomeModalProps) => {
  const { continueAsGuest, hasVisited } = useContext(AuthContext);

  const handleContinue = () => {
    continueAsGuest();
  };

  const handleLogin = () => {
    continueAsGuest();
    openLogin();
  };

  return (
    <Modal autoFocus={false} isCentered isOpen={!hasVisited} onClose={() => {}}>
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
          <Heading color="yellow.100">Hackathon Global</Heading>
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
              <Button onClick={handleLogin}>Login</Button>
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
              <Button onClick={handleContinue}>Continue</Button>
            </Flex>
          </Flex>
        </Flex>
        <Image
          borderRadius="full"
          position="absolute"
          src="images/earth-modal.png"
        />
      </ModalContent>
    </Modal>
  );
};

export default WelcomeModal;
