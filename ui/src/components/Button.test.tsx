import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { MyButton } from "./Button";

describe("MyButton Component", () => {
  it("renders the button with the correct label", () => {
    render(
      <MyButton
        label="Click Me"
        onClick={() => {}}
      />,
    );
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <MyButton
        label="Click Me"
        onClick={handleClick}
      />,
    );
    await userEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
