const getAuth = (state) => state.auth;
const getSignIn = (state) => getAuth(state).signIn;
const getSignUp = (state) => getAuth(state).signUp;
const getResetPassword = (state) => getAuth(state).getResetPassword;
const getProfile = (state) => getAuth(state).profile;

export const getUserId = (state) => getProfile(state)._id;
export const getUserEmail = (state) => getProfile(state).email;
export const getAppVersion = (state) => getProfile(state).appVersion;
export const getSupportEmail = (state) => getProfile(state).supportEmail;
export const getSignInEmail = (state) => getSignIn(state).email.value;
export const getSignInPassword = (state) => getSignIn(state).password.value;
export const getIsLoading = (state) => getSignIn(state).isLoading;
export const getIChecked = (state) => getSignIn(state).isChecked;
export const getIsSignedIn = (state) => getSignIn(state).isSignedIn;
export const getSignInErrors = (state) => getSignIn(state).errors;
export const getResetPasswordEmail = (state) => getResetPassword(state).email.value;
export const getResetPasswordCode = (state) => getResetPassword(state).code.value;
export const getResetPasswordNewPassword = (state) => getResetPassword(state).newPassword.value;

export const getIsSignedUp = (state) => getSignUp(state).isSignedUp;
export const getIsSignUpLoading = (state) => getSignUp(state).isLoading;
export const getSignUpEmail = (state) => getSignUp(state).email.value;
export const getSignUpPassword = (state) => getSignUp(state).password.value;
export const getSignUpErrors = (state) => getSignIn(state).errors;
