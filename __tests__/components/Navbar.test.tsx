import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";

// Mock matchMedia and scrollTo are in jest.setup.js

describe("Navbar Component", () => {
  beforeEach(() => {
    // Reset window state before each test
    window.scrollY = 0;
    jest.clearAllMocks();
  });

  it("renders correctly and matches snapshot", () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();

    // Check main elements
    expect(screen.getByAltText("Yearbook Logo")).toBeInTheDocument();

    // START PROJECT button
    expect(screen.getAllByText("START PROJECT").length).toBeGreaterThan(0);

    // Desktop Nav Links
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Photo")).toBeInTheDocument();
  });

  it("all expected text content is present", () => {
    render(<Navbar />);
    [
      "Home",
      "Services",
      "Photo",
      "Workflow",
      "Team",
      "Reviews",
      "News",
    ].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("links have href attributes", () => {
    render(<Navbar />);
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks[0].closest("a")).toHaveAttribute("href", "#home");
  });

  it("mobile menu opens and closes on button click", () => {
    render(<Navbar />);

    // Initially mobile menu links are not rendered (hidden by framer-motion AnimatePresence mock)
    // Actually our framer-motion mock renders children directly, but Navbar has conditional rendering `{isMenuOpen && (...)}`
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();

    const openMenuBtn = screen.getByLabelText("Open menu");
    fireEvent.click(openMenuBtn);

    // Mobile menu should open
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();

    // Check Start Project button inside menu
    const startProjectBtns = screen.getAllByText("Start Project");
    fireEvent.click(startProjectBtns[startProjectBtns.length - 1]);
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();

    fireEvent.click(openMenuBtn);

    // Close menu
    const closeMenuBtn = screen.getByLabelText("Close menu");
    fireEvent.click(closeMenuBtn);

    // Mobile menu should be hidden
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
  });

  it("keyboard accessible buttons (accessibility)", () => {
    render(<Navbar />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      // By default, button elements without a disabled attribute or a negative tabindex are keyboard accessible
      expect(button).not.toHaveAttribute("tabindex", "-1");
    });
  });

  it("scroll behavior changes class", () => {
    // Need to setup mock elements to cover darkSection logic
    document.body.innerHTML = `
      <div id="hero" style="top: 0; bottom: 1000px; height: 1000px;"></div>
    `;

    // Mock getBoundingClientRect for #hero
    const hero = document.getElementById("hero");
    if (hero) {
      hero.getBoundingClientRect = jest.fn(() => ({
        top: 0,
        bottom: 1000,
        height: 1000,
        width: 1000,
        left: 0,
        right: 1000,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));
    }

    const { container } = render(<Navbar />);
    const navElement = container.querySelector("nav");

    // Mock getBoundingClientRect for #main-navbar inside component
    if (navElement) {
      navElement.getBoundingClientRect = jest.fn(() => ({
        top: 0,
        bottom: 50,
        height: 50,
        width: 1000,
        left: 0,
        right: 1000,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));
    }

    expect(navElement).toHaveClass("py-4"); // Initial state

    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(navElement).toHaveClass("py-2 shadow-sm"); // Scrolled state
  });

  it("mobile menu handles link click and tests hiding links on mobile/desktop", () => {
    render(<Navbar />);

    // Desktop Nav Links
    const desktopNavWrapper = screen
      .getByText("Home")
      .closest(".hidden.lg\\:flex");
    expect(desktopNavWrapper).toBeInTheDocument();

    // Open menu
    fireEvent.click(screen.getByLabelText("Open menu"));

    // Click a mobile link
    const mobileHomeLink = screen.getAllByText("Home")[1]; // Second 'Home' is in mobile menu
    fireEvent.click(mobileHomeLink);

    // Menu should close
    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
  });

  it("tests scrolling to hash link", () => {
    render(<Navbar />);
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    // Add dummy target element to DOM so element is found
    const dummyHome = document.createElement("div");
    dummyHome.id = "home";
    document.body.appendChild(dummyHome);

    const homeLink = screen.getAllByText("Home")[0];
    fireEvent.click(homeLink);

    // Assert scrollIntoView called
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
    document.body.removeChild(dummyHome);
  });

  it("tests logo error handler", () => {
    render(<Navbar />);
    const logoImg = screen.getByAltText("Yearbook Logo");
    fireEvent.error(logoImg);
    expect(screen.getByText("YEARBOOK")).toBeInTheDocument();
  });
});
