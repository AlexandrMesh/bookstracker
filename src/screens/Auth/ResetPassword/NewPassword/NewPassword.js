import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, Button } from 'react-native';

const NewPassword = ({ newPassword, setNewPassword, navigation }) => (
  <>
    <Text>New Password</Text>
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={setNewPassword} value={newPassword} />
    <Button title='Send' onPress={() => navigation.navigate('ResetPassword')} />
  </>
);

NewPassword.propTypes = {
  newPassword: PropTypes.number.isRequired,
  setNewPassword: PropTypes.func.isRequired,
};

export default NewPassword;
