import React from "react";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/sections/HeroSection";

describe("HeroSection Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<HeroSection />);
    expect(container).toMatchSnapshot();
  });

  it("renders heading with correct text", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Creative Digital Yearbook #1 in Indonesia/i,
    );
  });

  it("renders description text", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(
        /Kami membantu sekolah menghadirkan buku tahunan modern/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders ABOUT US button", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("button", { name: /ABOUT US/i }),
    ).toBeInTheDocument();
  });

  it("renders stats correctly", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Sekolah Telah Bekerjasama/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Tahun Mengeksplorasi Industri Creative/i),
    ).toBeInTheDocument();

    // Check initial count rendering based on mounted state
    // Our jest mock sets mounted to true immediately in useEffect but render output might show 0 initially
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("tests animations correctly (opacity 0 and stagger)", () => {
    render(<HeroSection />);
    // Testing initial opacity 0 logic via data-initial attribute
    // And stagger logic is typically in transition prop. We can check if transition contains delay
    const animatedTexts = screen
      .getByText(/Kami membantu sekolah menghadirkan buku tahunan modern/i)
      .closest("div[data-transition]");
    expect(animatedTexts).toHaveAttribute(
      "data-initial",
      JSON.stringify({ opacity: 0, y: 30 }),
    );

    // Test stagger delays are applied
    const texts1 = screen
      .getByText(/Kami membantu sekolah menghadirkan buku tahunan modern/i)
      .closest("div[data-transition]");
    const stats1 = screen
      .getByText(/Sekolah Telah Bekerjasama/i)
      .closest("div[data-transition]");
    const stats2 = screen
      .getByText(/Tahun Mengeksplorasi Industri Creative/i)
      .closest("div[data-transition]");

    expect(texts1).toHaveAttribute(
      "data-transition",
      JSON.stringify({ delay: 0.1, duration: 0.8 }),
    );
    expect(stats1).toHaveAttribute(
      "data-transition",
      JSON.stringify({ delay: 0.2, duration: 0.8 }),
    );
    expect(stats2).toHaveAttribute(
      "data-transition",
      JSON.stringify({ delay: 0.3, duration: 0.8 }),
    );
  });
});
