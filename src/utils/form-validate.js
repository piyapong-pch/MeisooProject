export const usernameValidate = {
    required: {
      value: true,
      message: "Please enter username",
    },
    minLength: {
      value: 6,
      message: "Username must be at least 6 characters long",
    },
    pattern: {
      value: /^[a-zA-Z0-9]+$/,
      message: "Username must be alphanumeric",
    },
  };

export const emailValidate = {
    required: {
        value: true,
        message: 'Please enter an email address'
    },
    pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/i,
        message: 'Email address in not valid'
    }
}

export const passwordValidate = {
    required: {
        value: true,
        message: 'Please enter password'
    },
    pattern: {
        value: 8,
        message: 'Password must be at least 8 characters long'
    }
}
