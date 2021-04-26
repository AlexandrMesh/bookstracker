import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const RadioButton = ({ isSelected }) => (
  <View
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
      borderRadius: 24,
      backgroundColor: 'white',
      borderColor: 'blue',
      borderWidth: 3,
    }}
  >
    {isSelected && <View style={{ width: 12, height: 12, borderRadius: 12, backgroundColor: 'blue' }} />}
  </View>
);

RadioButton.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

export default RadioButton;
