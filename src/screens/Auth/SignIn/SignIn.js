import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { isEmpty } from 'ramda';
import validationRules from '../../../constants/auth';

const SignIn = ({ signIn, signOut, isLoading, errors, setSignInErrors, navigation }) => {
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
    setSignInErrors({ email: emailError, password: passwordError });
    return false;
  };

  const resetErrors = () => {
    if (!isEmpty(errors.email) || !isEmpty(errors.password)) {
      setSignInErrors({ email: '', password: '' });
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
      <Button title="Sing in" onPress={() => isValid() && signIn({ email, password })} />
      <Button
        title="Google Signin"
        onPress={() => {
          signIn({ email, password, isGoogleAccount: true });
        }}
      />
      <Button title="Google Signout" onPress={() => signOut()} />
      <Button title="Reset Password" onPress={() => navigation.navigate('ResetPassword')} />
      <Button title="Sing up" onPress={() => navigation.navigate('SignUp')} />
      {isLoading && <ActivityIndicator color="blue" />}
    </View>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  setSignInErrors: PropTypes.func.isRequired,
};

export default SignIn;
