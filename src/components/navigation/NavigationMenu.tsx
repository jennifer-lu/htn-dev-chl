import React, { useContext } from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

import ColorModeComponent from './ColorModeComponent';
import LoginComponent from './LoginComponent';
import SearchBar from './SearchBar';

import ColorModeContext from '../../contexts/ColorModeContext';

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
  const { isDark } = useContext(ColorModeContext);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        aria-label="Menu"
        as={IconButton}
        icon={<MdMenu />}
        variant="outline"
        title="Menu"
      />
      <MenuList backgroundColor={isDark ? 'blue.300' : 'purple.100'}>
        <MenuItem>
          <SearchBar handleSearch={handleSearch} />
        </MenuItem>
        <MenuItem>
          <ColorModeComponent />
        </MenuItem>
        <MenuItem>
          <LoginComponent isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavigationMenu;
