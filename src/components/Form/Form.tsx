import { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "../FormFields/Input";
import { Select } from "../FormFields/Select";
import { Errors, State, UserForm } from "../../utils/types";
import { isErrorsNull, setFormErrors } from "../../utils/helpers";
import { submitForm } from "../../api/api";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
interface FormProps {
  occupations: Array<string>;
  states: Array<State>;
}

const FormContainer = styled.div`
  flex: 1.5;
  padding: 32px 64px 64px 64px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const Title = styled.h1`
  margin: 16px 0 0 0;
`;

const Subtitle = styled.p`
  font-size: 10px;
  margin: 0 0 24px 4px;
  font-weight: 100;
`;

const CreateButton = styled.button`
  font-family: "Poppins", sans-serif;
  background: #c9d6ff;
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 18px;
  padding: 8px;
  font-weight: 200;
  width: 100%;
  margin: 12px 0 0 0;
`;

export const Form = ({ occupations, states }: FormProps) => {
  const [values, setValues] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });
  const [errors, setErrors] = useState<Errors>({
    name: null,
    email: null,
    password: null,
    occupation: null,
    state: null,
  });

  const onValueChange = (key: string, val: string) => {
    setValues({
      ...values,
      [key]: val,
    });
  };

  const clearErrors = () =>
    setErrors({
      name: null,
      email: null,
      password: null,
      occupation: null,
      state: null,
    });

  const onSubmit = (e: any) => {
    e.preventDefault();

    clearErrors();

    const formErrors = setFormErrors(values);

    if (!isErrorsNull(formErrors)) {
      setErrors(formErrors);
      return;
    }

    const userForm = values as UserForm;

    submitForm(userForm).then((res) => {
      if (res) {
        const { status } = res;

        if (status !== 200) {
          toast.error("Oops, something went wrong! Please try again");
        }

        toast.success("Successfully submitted the form!");
      }
    });
  };

  const { name, email, password, occupation, state } = values;
  const {
    name: nameError,
    email: emailError,
    password: passwordError,
    occupation: occupationError,
    state: stateError,
  } = errors;

  return (
    <FormContainer id="user-form-container" data-testid="user-form-container">
      <Title>Create an account</Title>
      <Subtitle>Fill out the form below to get started!</Subtitle>
      <form
        id="user-form"
        data-testid="user-form"
        noValidate
        onSubmit={onSubmit}
      >
        <Input
          id="name"
          label="Name"
          type="text"
          value={name}
          onValueChange={onValueChange}
          error={nameError}
        />
        <Input
          id="email"
          label="Email"
          type="text"
          value={email}
          onValueChange={onValueChange}
          error={emailError}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onValueChange={onValueChange}
          error={passwordError}
        />
        <Select
          id="occupation"
          label="Occupation"
          options={occupations}
          value={occupation}
          onValueChange={onValueChange}
          error={occupationError}
        />
        <Select
          id="state"
          label="States"
          options={states}
          value={state}
          onValueChange={onValueChange}
          error={stateError}
        />
        <CreateButton
          id="create-button"
          type="submit"
          data-testid="create-button"
        >
          Create account
        </CreateButton>
      </form>
      <ToastContainer />
    </FormContainer>
  );
};

Form.propTypes = {
  occupations: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
};
