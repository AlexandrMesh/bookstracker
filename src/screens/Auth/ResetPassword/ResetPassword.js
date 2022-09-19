import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, TextInput } from 'react-native';

const ResetPassword = ({ email, setEmail, resetPassword }) => {
  const handleResetPassword = async () => {
    try {
      const result = await resetPassword();
      console.log(result, 'result');
      // result && navigation.navigate('CodeVerification');
    } catch (err) {
      console.log(err, 'error from component');
    }
  };

  return (
    <>
      <Text>Reset Password</Text>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={setEmail} value={email} />
      <Button title='Reset Password' onPress={handleResetPassword} />
    </>
  );
};

ResetPassword.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default ResetPassword;
