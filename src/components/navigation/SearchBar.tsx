import React, { useContext, useState } from 'react';
import {
  CloseButton,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

import ColorModeContext from '../../contexts/ColorModeContext';

export type SearchBarProps = {
  handleSearch: (searchInput: string) => void;
};

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const { isDark } = useContext(ColorModeContext);

  const [input, setInput] = useState<string>('');

  const handleChange = (searchInput: string) => {
    handleSearch(searchInput);
    setInput(searchInput);
  };

  const handleClear = () => {
    handleSearch('');
    setInput('');
  };

  return (
    <InputGroup>
      <InputLeftElement>
        <Icon aria-label="Search" as={MdSearch} title="Search" />
      </InputLeftElement>
      <Input
        aria-label="Search"
        borderColor={isDark ? 'white.100' : 'purple.300'}
        focusBorderColor={isDark ? 'white.100' : 'purple.300'}
        onChange={(e) => handleChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        title="Search"
        type="text"
        value={input}
        width="200px"
      />
      <InputRightElement>
        <CloseButton
          aria-label="Clear search"
          onClick={handleClear}
          title="Clear"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
