import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Pressable } from 'react-native';
import RadioButton from '@UI/RadioButton';
import SlideMenu from '@UI/SlideMenu';

const Sorting = ({ isVisible, sortParams, setSortDirection, setSortType, onClose, bookListStatus, startLoadingBookList }) => {
  const sortDirections = [
    { title: 'Сначала большие', isSelected: sortParams.direction === 1, action: () => setSortDirection(bookListStatus, 1) },
    { title: 'Сначала меньшие', isSelected: sortParams.direction === -1, action: () => setSortDirection(bookListStatus, -1) },
  ];

  const sortTypes = [
    { title: 'По алфавиту', isSelected: sortParams.type === 'title', action: () => setSortType(bookListStatus, 'title') },
    { title: 'По рейтингу', isSelected: sortParams.type === 'rating', action: () => setSortType(bookListStatus, 'rating') },
    { title: 'По дате добавления', isSelected: sortParams.type === 'createdDate', action: () => setSortType(bookListStatus, 'createdDate') },
    { title: 'По году выхода', isSelected: sortParams.type === 'year', action: () => setSortType(bookListStatus, 'year') },
  ];

  const handleSort = () => {
    startLoadingBookList(bookListStatus);
    onClose();
  };

  return (
    <SlideMenu isVisible={isVisible} title='Сортировать' onClose={onClose}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, marginBottom: 5 }}>Направление:</Text>
      {sortDirections.map((item) => (
        <Pressable
          key={item.title}
          style={{
            borderColor: '#999',
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={item.action}
        >
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
          <RadioButton isSelected={item.isSelected} />
        </Pressable>
      ))}

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, marginBottom: 5 }}>Тип:</Text>
      {sortTypes.map((item) => (
        <Pressable
          key={item.title}
          style={{
            borderColor: '#999',
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={item.action}
        >
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
          <RadioButton isSelected={item.isSelected} />
        </Pressable>
      ))}
      <Button title='Sort' onPress={handleSort} />
    </SlideMenu>
  );
};

Sorting.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  sortParams: PropTypes.shape({
    type: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  setSortType: PropTypes.func.isRequired,
  setSortDirection: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  bookListStatus: PropTypes.string.isRequired,
  startLoadingBookList: PropTypes.func.isRequired,
};

export default Sorting;
