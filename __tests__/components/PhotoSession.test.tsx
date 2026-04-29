import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import PhotoSession from "@/components/sections/PhotoSession";

describe("PhotoSession Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<PhotoSession />);
    expect(container).toMatchSnapshot();
  });

  it("renders title and description", () => {
    render(<PhotoSession />);
    expect(screen.getByText("Photo")).toBeInTheDocument();
    expect(screen.getByText("Session")).toBeInTheDocument();
    expect(
      screen.getByText(/Dari foto formal hingga konsep kreatif/i),
    ).toBeInTheDocument();
  });

  it("renders all session types", () => {
    render(<PhotoSession />);
    expect(screen.getAllByText("Individual Studio").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Group Studio Set").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Individual Outdoor").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Group Outdoor").length).toBeGreaterThan(0);
  });

  it("auto-rotates active session type every 3 seconds", () => {
    render(<PhotoSession />);

    // Initially, "Individual Studio" is active. The showcase should display "Individual"
    expect(screen.getAllByText("Individual").length).toBeGreaterThan(0);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // After 3s, "Group Studio Set" is active. The showcase should display "Group"
    expect(screen.getAllByText("Group").length).toBeGreaterThan(0);
  });

  it("pauses rotation on hover and updates active item, and tests clicking session item", () => {
    render(<PhotoSession />);

    // Hover on the 3rd item "Individual Outdoor"
    const outdoorItem = screen.getByText("Individual Outdoor");
    fireEvent.mouseEnter(outdoorItem);

    // Showcase text should update to "Individual" (from Individual Outdoor)
    // There are multiple "Individual" texts, but the tag pill shows full text
    expect(screen.getAllByText("Individual Outdoor").length).toBeGreaterThan(1); // 1 list item, 1 pill

    // Advance timers, should not rotate because it's hovering
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Still should be "Individual Outdoor"
    expect(screen.getAllByText("Individual Outdoor").length).toBeGreaterThan(1);

    // Mouse leave list
    const list = screen.getByRole("list");
    fireEvent.mouseLeave(list);

    // Advance timers again, it should resume rotating to "Group Outdoor"
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Next item is "Group Outdoor"
    expect(screen.getAllByText("Group Outdoor").length).toBeGreaterThan(1);

    // Testing clicking (since hover and clicking usually both involve setting the active state, we can simulate a click to ensure it doesn't break, although current implementation sets state on hover)
    const studioSetItem = screen.getByText("Group Studio Set");
    fireEvent.click(studioSetItem); // Clicking doesn't have an explicit handler in the code (it's onMouseEnter), but testing interaction anyway.
    fireEvent.mouseEnter(studioSetItem); // the actual interaction triggering the state update
    expect(screen.getAllByText("Group Studio Set").length).toBeGreaterThan(1);
  });

  it("clears interval on unmount", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const { unmount } = render(<PhotoSession />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
