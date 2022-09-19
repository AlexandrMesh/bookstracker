import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Pressable } from 'react-native';
import CheckBox from '@UI/CheckBox';
import SlideMenu from '@UI/SlideMenu';

const Filter = ({ isVisible, filterParams, addFilterValue, removeFilterValue, onClose, bookListStatus, startLoadingBookList }) => {
  const actionTypes = [
    {
      id: '11',
      title: '11',
    },
    {
      id: '12',
      title: '12',
    },
    {
      id: '13',
      title: '13',
    },
  ];

  const handleFilter = () => {
    startLoadingBookList(bookListStatus);
    onClose();
  };

  return (
    <SlideMenu isVisible={isVisible} title='Фильтры' onClose={onClose}>
      {actionTypes.map((item) => (
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
          onPress={() => {
            if (filterParams.categoryIds.includes(item.id)) {
              removeFilterValue(bookListStatus, 'categoryIds', item.id);
            } else {
              addFilterValue(bookListStatus, 'categoryIds', item.id);
            }
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
          <CheckBox isChecked={filterParams.categoryIds.includes(item.id)} />
        </Pressable>
      ))}
      <Button title='Filter' onPress={handleFilter} />
    </SlideMenu>
  );
};

Filter.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  filterParams: PropTypes.shape({
    categoryIds: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  addFilterValue: PropTypes.func.isRequired,
  removeFilterValue: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  bookListStatus: PropTypes.string.isRequired,
  startLoadingBookList: PropTypes.func.isRequired,
};

export default Filter;
