import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { State } from "../../utils/types";
import { Form } from "./Form";

const occupations: Array<string> = [
  "occupation1",
  "occupation2",
  "occupation3",
];

const states: Array<State> = [
  {
    name: "Alabama",
    abbreviation: "AL",
  },
  {
    name: "Alaska",
    abbreviation: "AK",
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
  },
];

it("should render the form component", () => {
  render(<Form occupations={occupations} states={states} />);

  expect(screen.getByTestId("user-form-container")).toBeInTheDocument();
});

describe("User Form", () => {
  it("should render the form", () => {
    render(<Form occupations={occupations} states={states} />);

    expect(screen.getByTestId("user-form")).toBeInTheDocument();
    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("occupation")).toBeInTheDocument();
    expect(screen.getByTestId("state")).toBeInTheDocument();
    expect(screen.getByTestId("create-button")).toBeInTheDocument();
  });

  it("should submit the form", async () => {
    render(<Form occupations={occupations} states={states} />);

    const name = screen.getByTestId("name");
    fireEvent.input(name, "John Doe");

    const email = screen.getByTestId("email");
    fireEvent.input(email, "john@gmail.com");

    const password = screen.getByTestId("password");
    fireEvent.input(password, "password123");

    const occupation = screen.getByTestId("occupation");
    userEvent.selectOptions(occupation, "occupation1");

    const state = screen.getByTestId("state");
    userEvent.selectOptions(state, "Alabama");

    const createButton = screen.getByTestId("create-button");
    fireEvent.click(createButton);

    waitFor(async () => {
      const toast = await screen.findByText(/Successfully submitted the form!/);

      expect(toast).toBeInTheDocument();
    });
  });

  it("should not submit the form when fields are empty", async () => {
    render(<Form occupations={occupations} states={states} />);

    const createButton = screen.getByTestId("create-button");
    fireEvent.click(createButton);

    const name = screen.getByTestId("name");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const occupation = screen.getByTestId("occupation");
    const state = screen.getByTestId("state");

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(name).toHaveClass("display-error");
    expect(email).toHaveClass("display-error");
    expect(password).toHaveClass("display-error");
    expect(occupation).toHaveClass("display-error");
    expect(state).toHaveClass("display-error");
  });
});
