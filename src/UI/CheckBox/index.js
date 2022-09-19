import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckBox = ({ isChecked, onChange }) => (
  <Pressable
    onPress={onChange}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
      backgroundColor: isChecked ? 'blue' : 'white',
      borderColor: 'blue',
      borderWidth: 3,
    }}
  >
    {isChecked && <Icon name='done' size={18} color='white' />}
  </Pressable>
);

CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckBox;
