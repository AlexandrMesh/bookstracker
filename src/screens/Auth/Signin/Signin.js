import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Button, ActivityIndicator } from 'react-native';

const Signin = ({ email, password, setSignInEmail, setSignInPassword, signIn, signOut, isLoading }) => (
  <View>
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => setSignInEmail(text)} value={email} />
    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => setSignInPassword(text)} value={password} />
    <Button title="Sing in" onPress={() => signIn({ email, password })} />
    <Button title="Google Signin" onPress={() => signIn({ email, password, isGoogleAccount: true })} />
    <Button title="Google Signout" onPress={() => signOut()} />
    {isLoading && <ActivityIndicator color="blue" />}
  </View>
);

Signin.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  signIn: PropTypes.func.isRequired,
  setSignInEmail: PropTypes.func.isRequired,
  setSignInPassword: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Signin;
