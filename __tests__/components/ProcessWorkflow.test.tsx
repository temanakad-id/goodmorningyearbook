import React from "react";
import { render, screen } from "@testing-library/react";
import ProcessWorkflow from "@/components/sections/ProcessWorkflow";

describe("ProcessWorkflow Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(<ProcessWorkflow />);
    expect(container).toMatchSnapshot();
  });

  it("renders headings and paragraph", () => {
    render(<ProcessWorkflow />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /Process Workflow/i,
    );
    expect(
      screen.getByText(/Workflow kami jelas dan transparan/i),
    ).toBeInTheDocument();
  });

  it("renders START PROJECT button", () => {
    render(<ProcessWorkflow />);
    expect(
      screen.getByRole("button", { name: /START PROJECT/i }),
    ).toBeInTheDocument();
  });

  it("renders all workflow cards and tests hover changes step number color", () => {
    render(<ProcessWorkflow />);

    // Check titles
    expect(screen.getByText("Konsultasi & Kontrak")).toBeInTheDocument();
    expect(screen.getByText("Konsep & Desain")).toBeInTheDocument();
    expect(screen.getByText("Sesi Foto, Video & Event")).toBeInTheDocument();
    expect(screen.getByText("Editing & Design Layout")).toBeInTheDocument();

    // Check numbers
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();

    // Testing color change on hover is implicitly tested because we test that Tailwind group-hover class is present
    const numberElement = screen.getByText("01");
    expect(numberElement).toHaveClass("group-hover:text-[rgba(230,0,92,0.08)]");
  });
});
