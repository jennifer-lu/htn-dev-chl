import React, { useState } from 'react';
import {
  CloseButton,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

export type SearchBarProps = {
  handleSearch: (searchInput: string) => void;
};

const SearchBar = ({ handleSearch }: SearchBarProps) => {
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
        <Icon aria-label="Search" as={MdSearch} />
      </InputLeftElement>
      <Input
        aria-label="Search"
        borderColor="white.100"
        focusBorderColor="white.100"
        onChange={(e) => handleChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        value={input}
        width="200px"
      />
      <InputRightElement>
        <CloseButton aria-label="Clear search" onClick={handleClear} />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
