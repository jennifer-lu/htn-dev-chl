import React, { useState } from 'react';
import {
  Button,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
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
    <Flex marginRight="20px">
      <InputGroup>
        <InputLeftElement>
          <Icon as={MdSearch} />
        </InputLeftElement>
        <Input
          borderColor="white.100"
          errorBorderColor="red.100"
          focusBorderColor="white.100"
          onChange={(e) => handleChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          value={input}
          width="200px"
        />
        <InputRightElement>
          <CloseButton aria-label="Clear" onClick={handleClear} />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
