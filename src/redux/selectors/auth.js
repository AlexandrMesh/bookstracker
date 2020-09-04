import { path } from 'ramda';

export const getSignInEmail = path(['auth', 'signin', 'email', 'value']);
export const getSignInPassword = path(['auth', 'signin', 'password', 'value']);
export const isLoading = path(['auth', 'signin', 'isLoading']);
