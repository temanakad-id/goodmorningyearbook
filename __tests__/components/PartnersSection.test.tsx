import React from "react";
import { render, screen } from "@testing-library/react";
import { PartnersSection } from "@/components/sections/PartnersSection";

describe("PartnersSection Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<PartnersSection />);
    expect(container).toMatchSnapshot();
  });

  it("renders section title", () => {
    render(<PartnersSection />);
    expect(
      screen.getByText(/PARTNERED WITH 150\+ SCHOOLS & BRANDS/i),
    ).toBeInTheDocument();
  });

  it("renders all partner names", () => {
    render(<PartnersSection />);

    const partners = [
      "EduPrime",
      "SchoolHub",
      "LearnTech",
      "BrightEdu",
      "PixelArts",
      "MediaCo",
      "Creativa",
      "ODA Group",
    ];

    partners.forEach((partner) => {
      expect(screen.getByText(partner)).toBeInTheDocument();
    });
  });
});
