import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

const useDebouncedSearch = (searchFunc, searchText, delay) => {
  const [searchQuery, setSearchQuery] = useState(searchText || '');

  const debouncedSearch = useRef(debounce(searchFunc, delay));

  const handleChange = useCallback(
    (value) => {
      debouncedSearch.current(value);
      setSearchQuery(value);
    },
    [setSearchQuery, searchText],
  );

  return [searchQuery, handleChange];
};

export default useDebouncedSearch;
