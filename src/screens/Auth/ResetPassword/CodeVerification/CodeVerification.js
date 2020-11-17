import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, TextInput } from 'react-native';

const CodeVerification = ({ code, setCode, navigation }) => (
  <>
    <Text>Code Verification</Text>
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} maxLength={6} keyboardType="numeric" onChangeText={setCode} value={code} />
    <Button title="Send" onPress={() => navigation.navigate('NewPassword')} />
  </>
);

CodeVerification.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
};

export default CodeVerification;
