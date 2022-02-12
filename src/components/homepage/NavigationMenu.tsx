import React, { useState } from 'react';
import {
  CloseButton,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

import LoginComponent from './LoginComponent';
import SearchBar from './SearchBar';

export type NavigationMenuProps = {
  handleSearch: (searchInput: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const NavigationMenu = ({
  handleSearch,
  isOpen,
  onClose,
  onOpen,
}: NavigationMenuProps) => {
  const [input, setInput] = useState<string>('');

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MdMenu />}
        variant="outline"
      />
      <MenuList backgroundColor="blue.300">
        <MenuItem>
          <SearchBar handleSearch={handleSearch} />
        </MenuItem>
        <MenuItem>
          <LoginComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavigationMenu;
