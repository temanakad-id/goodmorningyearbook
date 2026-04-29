import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();

    // Check company name image alt
    expect(
      screen.getByAltText("Good Morning Yearbook Company"),
    ).toBeInTheDocument();
  });

  it("renders office address", () => {
    render(<Footer />);
    expect(screen.getByText(/Jl. Lkr. Sel. Salatiga/i)).toBeInTheDocument();
  });

  it("renders contact info with href attributes", () => {
    render(<Footer />);

    const emailLink = screen.getByText("Email: goodmorningstudio2@gmail.com");
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:goodmorningstudio2@gmail.com",
    );

    const phoneLink = screen.getByText("Phone: +6282136287488");
    expect(phoneLink).toHaveAttribute("href", "tel:+6282136287488");
  });

  it("renders copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Copyright © 2026 Good Morning Yearbook Company/i),
    ).toBeInTheDocument();
  });

  it("renders social icons", () => {
    render(<Footer />);

    // Check for social labels
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter/X")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Pinterest")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    expect(screen.getByLabelText("Dribbble")).toBeInTheDocument();
    expect(screen.getByLabelText("Behance")).toBeInTheDocument();
  });
});
