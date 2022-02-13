import React from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        aria-label="Menu"
        as={IconButton}
        icon={<MdMenu />}
        variant="outline"
      />
      <MenuList backgroundColor="blue.300">
        <MenuItem>
          <SearchBar handleSearch={handleSearch} />
        </MenuItem>
        <MenuItem>
          <LoginComponent isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavigationMenu;
