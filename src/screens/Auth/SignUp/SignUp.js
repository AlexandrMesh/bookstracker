import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { isEmpty } from 'ramda';
import validationRules from '../../../constants/auth';

const SignUp = ({ signUp, isLoading, errors, setSignUpErrors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = () => {
    const isEmailRequired = () => {
      if (validationRules.email.isRequired) {
        return isEmpty(email) ? 'isRequired' : '';
      }
      return '';
    };
    const isMinLengthPassword = () => (password.length < validationRules.password.minLength ? 'isMinLength' : '');
    const isPasswordRequired = () => {
      if (validationRules.password.isRequired) {
        return isEmpty(password) ? 'isRequired' : '';
      }
      return '';
    };

    const emailError = isEmailRequired();
    const passwordError = isPasswordRequired() || isMinLengthPassword();

    if (isEmpty(emailError) && isEmpty(passwordError)) {
      return true;
    }
    setSignUpErrors({ email: emailError, password: passwordError });
    return false;
  };

  const resetErrors = () => {
    if (!isEmpty(errors.email) || !isEmpty(errors.password)) {
      setSignUpErrors({ email: '', password: '' });
    }
  };

  const handleSetEmail = (email) => {
    resetErrors();
    setEmail(email);
  };

  const handleSetPassword = (password) => {
    resetErrors();
    setPassword(password);
  };

  return (
    <View>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => handleSetEmail(text)} value={email} />
      {!isEmpty(errors.email) && <Text>{errors.email}</Text>}
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => handleSetPassword(text)} value={password} />
      {!isEmpty(errors.password) && <Text>{errors.password}</Text>}
      <Button title="Sign Up" onPress={() => isValid() && signUp({ email, password })} />
      {isLoading && <ActivityIndicator color="blue" />}
    </View>
  );
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  setSignUpErrors: PropTypes.func.isRequired,
};

export default SignUp;
