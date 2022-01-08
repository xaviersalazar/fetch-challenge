import PropTypes from "prop-types";
import styled from "styled-components";
import { Error } from "./Error";

interface InputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onValueChange: Function;
  error: string | null;
}

const InputContainer = styled.div`
  width: 100%;
  margin: 12px 0;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 500;

  ::after {
    content: " * ";
    color: #ff6b81;
  }
`;

const InputTextBox = styled.input`
  font-family: "Poppins", sans-serif;
  display: block;
  height: 18px;
  width: 100%;
  background: #f1f2f6;
  border: none;
  outline: none;
  border-radius: 8px;
  padding: 8px 0;
  font-size: 12px;
  text-indent: 12px;
`;

export const Input = ({
  label,
  id,
  type,
  value,
  onValueChange,
  error,
}: InputProps) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputTextBox
        id={id}
        className={error && error.length > 0 ? "display-error" : ""}
        name={id}
        type={type}
        data-testid={id}
        value={value}
        onChange={(e) => onValueChange(id, e.target.value)}
        required
      />
      {error && error.length > 0 && <Error msg={error} />}
    </InputContainer>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
