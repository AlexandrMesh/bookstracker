import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform, Text, Button, Pressable, UIManager, LayoutAnimation } from 'react-native';
import RadioButton from '@UI/RadioButton';
import SlideMenu from '@UI/SlideMenu';
import { ALL, PLANNED, IN_PROGRESS, COMPLETED } from '../../../constants/bookListStatuses';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const BookStatusSlideMenu = ({ isVisible, bookId, book, updateUserBook, onClose, bookListStatus, isCalledFromDetails }) => {
  const [bookStatusValue, setBookStatusValue] = useState(book.status);

  const actionTypes = [
    { title: 'Хочу прочитать', isSelected: bookStatusValue === PLANNED, action: () => setBookStatusValue(PLANNED) },
    { title: 'Читаю', isSelected: bookStatusValue === IN_PROGRESS, action: () => setBookStatusValue(IN_PROGRESS) },
    { title: 'Прочитал', isSelected: bookStatusValue === COMPLETED, action: () => setBookStatusValue(COMPLETED) },
  ];

  useEffect(() => {
    setBookStatusValue(book.status);
    if (!isVisible) {
      setBookStatusValue(book.status);
    }
  }, [book.status, isVisible]);

  const handleUpdate = async () => {
    await updateUserBook({ bookId, bookStatus: bookStatusValue, bookListStatus, isCalledFromDetails });
    onClose();
    if (bookListStatus !== ALL) {
      LayoutAnimation.configureNext(layoutAnimConfig);
    }
  };

  return (
    <SlideMenu
      isVisible={isVisible}
      title='Добавить в список'
      resetTitle={bookStatusValue ? 'Сброс' : ''}
      onReset={() => setBookStatusValue(ALL)}
      onClose={() => onClose()}
    >
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
          onPress={item.action}
        >
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
          <RadioButton isSelected={item.isSelected} />
        </Pressable>
      ))}
      <Button title='Save' onPress={handleUpdate} />
    </SlideMenu>
  );
};

BookStatusSlideMenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  book: PropTypes.shape({
    bookId: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  bookId: PropTypes.string.isRequired,
  updateUserBook: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  bookListStatus: PropTypes.string.isRequired,
  isCalledFromDetails: PropTypes.bool.isRequired,
};

export default BookStatusSlideMenu;
