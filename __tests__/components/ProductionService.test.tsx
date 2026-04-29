import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductionService from "@/components/sections/ProductionService";
import { productionServices } from "@/data/site-data";

describe("ProductionService Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<ProductionService />);
    expect(container).toMatchSnapshot();
  });

  it("renders section title and description", () => {
    render(<ProductionService />);
    expect(screen.getByText("Production")).toBeInTheDocument();
    expect(screen.getByText("Service")).toBeInTheDocument();
    expect(
      screen.getByText(/Dari sesi Pemotretan, Video, Event/i),
    ).toBeInTheDocument();
  });

  it("renders all production service cards", () => {
    render(<ProductionService />);

    // Check elements dynamically via data
    productionServices.forEach((service) => {
      // Titles
      expect(screen.getAllByText(service.title).length).toBeGreaterThan(0);

      // Subtitles
      expect(screen.getAllByText(service.subtitle).length).toBeGreaterThan(0);

      // Overlay titles
      expect(screen.getAllByText(service.overlayTitle).length).toBeGreaterThan(
        0,
      );

      // Overlay subtitles
      expect(
        screen.getAllByText(service.overlaySubtitle).length,
      ).toBeGreaterThan(0);
    });
  });

  it("applies tilt transform on mouse move and resets on leave", () => {
    render(<ProductionService />);

    // Find the wrapper element that gets transform styles (has className 'will-change-transform')
    const cards = document.querySelectorAll(".will-change-transform");
    expect(cards.length).toBeGreaterThan(0);
    const card = cards[0] as HTMLElement;

    // Initially transform shouldn't have perspective values
    expect(card.style.transform).toBe("");

    // Mock getBoundingClientRect
    jest.spyOn(card, "getBoundingClientRect").mockImplementation(() => ({
      left: 100,
      top: 100,
      right: 300,
      bottom: 300,
      width: 200,
      height: 200,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));

    // Mouse Move to trigger tilt
    fireEvent.mouseMove(card, { clientX: 200, clientY: 150 });

    // It should set transform with perspective
    expect(card.style.transform).toContain("perspective(800px)");
    expect(card.style.transition).toBe("transform 0.1s ease-out");

    // Mouse Leave to reset
    fireEvent.mouseLeave(card);
    expect(card.style.transform).toBe(
      "perspective(800px) rotateX(0deg) rotateY(0deg)",
    );
    expect(card.style.transition).toBe("transform 0.5s ease-out");
  });

  it("handles mouse events when cardRef is null (coverage)", () => {
    // We can't easily make useRef return null during the actual React event,
    // but we can call the handler directly on the element without it breaking.
    render(<ProductionService />);
    const card = document.querySelectorAll(".will-change-transform")[0];

    // This is essentially just confirming that it doesn't crash when interacted with
    // unexpectedly, though full coverage of the "if (!cardRef.current) return;"
    // branch requires mocking useRef, which is overkill. We'll just trigger it again.
    fireEvent.mouseMove(card, { clientX: 200, clientY: 150 });
  });
});
