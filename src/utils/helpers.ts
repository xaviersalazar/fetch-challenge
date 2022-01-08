import { Errors } from "./types";

// eslint-disable-next-line
const emailValidation = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const checkForErrors = (value: string, type?: string) => {
  if (type === 'email') {
    if (!value || value.length <= 0) return 'This is a required field';
    else if (!value.match(emailValidation)) return 'Email is not valid' 
    else return null;
  }

  if (!value || value.length <= 0) return 'This is a required field';

  return null;
}

export const setFormErrors = (values: any) => {
  const errors = {
    name: null,
    email: null,
    password: null,
    occupation: null,
    state: null
  } as Errors;

  const nameError = checkForErrors(values.name);
  const emailError = checkForErrors(values.email, 'email');
  const passwordError = checkForErrors(values.password);
  const occupationError = checkForErrors(values.occupation);
  const stateError = checkForErrors(values.state);

  if (nameError) {
    errors.name = nameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  if (occupationError) {
    errors.occupation = occupationError;
  }

  if (stateError) {
    errors.state = stateError;
  };

  return errors;
};

export const isErrorsNull = (values: Errors) => {
  const { name, email, password, occupation, state } = values;

  if (
    (!name || name.length <= 0) && 
    (!email || email.length <= 0) && 
    (!password || password.length <= 0) && 
    (!occupation || occupation.length <= 0) && 
    (!state || state.length <= 0)
  ) return true;

  return false;
}