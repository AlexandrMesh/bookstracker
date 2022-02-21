import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import useDebouncedSearch from '../../../hooks/useDebouncedSearch';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [searchQueryValue, handleChangeQuery] = useDebouncedSearch(setSearchQuery, searchQuery, 400);

  const handleChangeText = (text) => {
    handleChangeQuery(text);
  };

  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', backgroundColor: 'white', borderWidth: 1 }}
      onChangeText={handleChangeText}
      value={searchQueryValue}
    />
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
