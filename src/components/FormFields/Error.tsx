import PropTypes from "prop-types";
import styled from "styled-components";

interface ErrorProps {
  msg: string | null;
}

const ErrorMessage = styled.p`
  font-size: 8px;
  font-weight: 200;
  color: #ff6b81;
  margin: 4px 0 0 4px;
`;

export const Error = ({ msg }: ErrorProps) => (
  <ErrorMessage>{msg}</ErrorMessage>
);

Error.defaultProps = {
  msg: null,
};

Error.propTypes = {
  msg: PropTypes.string,
};
