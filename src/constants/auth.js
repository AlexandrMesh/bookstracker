const emailPattern = '';

export default {
  email: {
    pattern: emailPattern,
    isRequired: true,
  },
  password: {
    minLength: 6,
    maxLength: 64,
    isRequired: true,
  },
};
