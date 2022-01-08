import { render, screen } from "@testing-library/react";
import App from "./App";

it("should render the app", () => {
  render(<App />);

  expect(screen.getByTestId("main")).toBeInTheDocument();
});
