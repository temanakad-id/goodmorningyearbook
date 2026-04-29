import React from "react";
import { render, screen } from "@testing-library/react";
import NewsSection from "@/components/sections/NewsSection";

describe("NewsSection Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<NewsSection />);
    expect(container).toMatchSnapshot();
  });

  it("renders section heading and button", () => {
    render(<NewsSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: "News" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ALL ARTICLES/i }),
    ).toBeInTheDocument();
  });

  it("renders article contents", () => {
    render(<NewsSection />);

    // Article 1
    expect(screen.getAllByText("SMA Negeri 1 Salatiga").length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getByText("SMA Negeri 1 Salatiga — Yearbook 2026"),
    ).toBeInTheDocument();
    expect(screen.getByText("March 2026")).toBeInTheDocument();

    // Article 2
    expect(screen.getAllByText("SMA Al-Azhar Semarang").length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getByText("SMA Al-Azhar Semarang — Yearbook 2026"),
    ).toBeInTheDocument();
    expect(screen.getByText("February 2026")).toBeInTheDocument();

    // Article 3
    expect(screen.getAllByText("SMA Prestige Solo").length).toBeGreaterThan(0);
    expect(
      screen.getByText("SMA Prestige Solo — Yearbook 2026"),
    ).toBeInTheDocument();
    expect(screen.getByText("January 2026")).toBeInTheDocument();
  });
});
