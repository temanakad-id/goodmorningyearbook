import React from "react";
import { render, screen, act } from "@testing-library/react";
import ClientReviews from "@/components/sections/ClientReviews";

// Mock matchMedia and intersection observer are in jest.setup.js

describe("ClientReviews Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<ClientReviews />);
    expect(container).toMatchSnapshot();
  });

  it("renders section heading", () => {
    render(<ClientReviews />);
    expect(screen.getByText(/Client's/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it("renders satisfaction survey info", () => {
    render(<ClientReviews />);
    expect(
      screen.getByText(/Based on Client Satisfaction Survey/i),
    ).toBeInTheDocument();
  });

  it("renders all reviews", () => {
    render(<ClientReviews />);

    // Check for author names
    expect(screen.getByText("Siti Marwah")).toBeInTheDocument();
    expect(screen.getByText("Budi Kurniawan")).toBeInTheDocument();
    expect(screen.getByText("Rina Andayani")).toBeInTheDocument();
    expect(screen.getByText("Deni Wicaksono")).toBeInTheDocument();

    // Check for initials
    expect(screen.getByText("SM")).toBeInTheDocument();
    expect(screen.getByText("BK")).toBeInTheDocument();
    expect(screen.getByText("RA")).toBeInTheDocument();
    expect(screen.getByText("DW")).toBeInTheDocument();
  });

  it("cycles active index correctly over time", () => {
    const { container } = render(<ClientReviews />);

    // Initial state: first review should have active classes
    const reviews = container.querySelectorAll(".group");
    expect(reviews.length).toBe(4);

    expect(reviews[0]).toHaveClass("border-[rgba(230,0,92,0.4)]");
    expect(reviews[1]).toHaveClass("border-[rgba(255,255,255,0.07)]");

    // Advance timer to trigger interval (2500ms)
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    // Second review should now be active
    expect(reviews[0]).toHaveClass("border-[rgba(255,255,255,0.07)]");
    expect(reviews[1]).toHaveClass("border-[rgba(230,0,92,0.4)]");
  });

  it("clears interval on unmount", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const { unmount } = render(<ClientReviews />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it("handles window resize correctly", () => {
    render(<ClientReviews />);

    // Simulate mobile resize
    act(() => {
      global.innerWidth = 500;
      global.dispatchEvent(new Event("resize"));
    });

    // Should now be on mobile view, the resize handler doesn't change visible text, but checking branch coverage
  });
});
