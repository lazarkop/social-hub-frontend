/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Feelings from "./Feelings";
import ModalBoxContent from "../posts/post-modal/modal-box-content/ModalBoxContent";
import { render, screen } from "../../test.utils";
import userEvent from "@testing-library/user-event";

describe("Feelings", () => {
  it("should have non-empty list", () => {
    render(<Feelings />);
    const listElement = screen.getByRole("list");
    expect(listElement.childElementCount).toBeGreaterThan(0);
  });

  it("should handle click", () => {
    render(<Feelings />);
    const { container } = render(<ModalBoxContent />);
    const listElement = screen.queryAllByTestId("feelings-item");
    userEvent.click(listElement[0]);
    const selectedFeelings = container.querySelector(".inline-display");
    const feelingImage = container.querySelector(".feeling-icon");
    expect(selectedFeelings).toBeInTheDocument();
    expect(feelingImage).toBeInTheDocument();
    expect(feelingImage).toHaveAttribute("src", "happy.jpg");
  });
});
