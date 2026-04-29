import React from "react";
import { render, screen } from "@testing-library/react";
import MarqueeTicker from "@/components/sections/MarqueeTicker";

describe("MarqueeTicker Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<MarqueeTicker />);
    expect(container).toMatchSnapshot();
  });

  it("renders all items from ROW1_ITEMS and ROW2_ITEMS", () => {
    render(<MarqueeTicker />);

    // Row 1
    expect(
      screen.getAllByText("CREATIVE DIGITAL YEARBOOK").length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("FLEXIBLE PRICE").length).toBeGreaterThan(0);
    expect(screen.getAllByText("TRUSTED").length).toBeGreaterThan(0);

    // Row 2
    expect(
      screen.getAllByText("CREATING MEMORIES SINCE 2017").length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("IT'S YOUR LEGACY").length).toBeGreaterThan(0);
    expect(screen.getAllByText("MORE THAN MEMORIES").length).toBeGreaterThan(0);
    expect(screen.getAllByText("GOOD MORNING YEARBOOK").length).toBeGreaterThan(
      0,
    );
  });
});
