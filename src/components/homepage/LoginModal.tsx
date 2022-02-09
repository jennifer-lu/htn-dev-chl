import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

type LoginModalProps = {
  authenticationError: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string, username: string) => void;
};

const LoginModal = ({
  authenticationError,
  isOpen,
  onClose,
  onSubmit,
}: LoginModalProps) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <Input
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <Input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        {authenticationError && <Text>Invalid</Text>}
        <Button onClick={() => onSubmit(password, username)}>Submit</Button>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
