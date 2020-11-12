import { path } from 'ramda';

export const getSignInEmail = path(['auth', 'signIn', 'email', 'value']);
export const getSignInPassword = path(['auth', 'signIn', 'password', 'value']);
export const isLoading = path(['auth', 'isLoading']);
export const isChecked = path(['auth', 'isChecked']);
export const isSignedIn = path(['auth', 'isSignedIn']);
export const getErrors = path(['auth', 'signInErrors']);
