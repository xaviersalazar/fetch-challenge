import PropTypes from "prop-types";
import { State } from "../../utils/types";
import { Error } from "./Error";
import styled from "styled-components";

interface SelectProps {
  label: string;
  id: string;
  options: any;
  value: string;
  onValueChange: Function;
  error: string | null;
}

const SelectContainer = styled.div`
  width: 100%;
  margin: 12px 0;
`;

const SelectLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 500;

  ::after {
    content: " * ";
    color: #ff6b81;
  }
`;

const SelectBox = styled.select`
  font-family: "Poppins", sans-serif;
  display: block;
  height: 38px;
  width: 100%;
  background: #f1f2f6;
  border: none;
  outline: none;
  border-radius: 8px;
  padding: 8px 0;
  font-size: 12px;
  text-indent: 12px;
`;

export const Select = ({
  label,
  id,
  options,
  value,
  onValueChange,
  error,
}: SelectProps) => {
  const selectBoxType = () => {
    const selectOptions = [<option key="default"></option>];

    if (options.length > 0) {
      return id === "state"
        ? selectOptions.concat(
            options.map(({ abbreviation, name }: State) => (
              <option key={abbreviation}>{name}</option>
            ))
          )
        : selectOptions.concat(
            options.map((occupation: any) => (
              <option key={occupation}>{occupation}</option>
            ))
          );
    }

    return selectOptions;
  };

  return (
    <SelectContainer>
      <SelectLabel htmlFor={id}>{label}</SelectLabel>
      <SelectBox
        id={id}
        className={error && error.length > 0 ? "display-error" : ""}
        name={id}
        data-testid={id}
        value={value}
        onChange={(e) => onValueChange(id, e.target.value)}
        required
      >
        {selectBoxType()}
      </SelectBox>
      {error && error.length > 0 && <Error msg={error} />}
    </SelectContainer>
  );
};

Select.defaultProps = {
  error: null,
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
