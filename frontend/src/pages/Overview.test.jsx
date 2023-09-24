import { render, screen } from "@testing-library/react";
import Overview from "./Overview";

it("Should render the video element correctly", () => {
    render(<Overview />);
    const videoElement = screen.queryByRole("video");
    expect(videoElement).toBeDefined();
});

it("Should have the correct title text", () => {
    render(<Overview />);
    const titleText = screen.queryAllByText("THE HPI d-school BUILDING AT THE UNIVERSITY OF CAPE TOWN IS THE IDEAL EMBODIMENT OF DESIGN THINKING");
    expect(titleText).toBeDefined();
});

it("Should have specific paragraph text", () => {
    render(<Overview />);
    const paragraphText1 = screen.queryAllByText("As a physical home for individuals and communities to gather and learn about Design Thinking - it was critical that the design process was collaborative and inclusive.");
    const paragraphText2 = screen.queryAllByText("In all possible aspects, the building is sustainable, and engineered for maximum comfort and functionality with minimal reliance upon the grid.");
    expect(paragraphText1).toBeDefined();
    expect(paragraphText2).toBeDefined();
});