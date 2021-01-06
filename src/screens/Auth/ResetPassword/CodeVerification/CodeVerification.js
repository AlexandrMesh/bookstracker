import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, TextInput } from 'react-native';

const CodeVerification = ({ code, setCode, verifyResetPasswordCode }) => {
  const handleVerify = async () => {
    try {
      await verifyResetPasswordCode();
      // navigation.navigate('NewPassword');
      console.log('SUCCESS');
    } catch (err) {
      console.log(err, 'ERROR');
    }
  };

  return (
    <>
      <Text>Code Verification</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        maxLength={6}
        keyboardType="numeric"
        onChangeText={setCode}
        value={code}
      />
      <Button title="Send" onPress={handleVerify} />
    </>
  );
};

CodeVerification.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  verifyResetPasswordCode: PropTypes.func.isRequired,
};

export default CodeVerification;
