import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, test, vi } from "vitest";
import Dashboard from "../pages/Dashboard";

// Mock the child components
vi.mock("../components/EventList", () => ({
  default: () => <div data-testid="event-list">Event List</div>,
}));
vi.mock("../components/CalendarView", () => ({
  default: () => <div data-testid="calendar-view">Calendar View</div>,
}));
vi.mock("../components/EventForm", () => ({
  default: () => <div data-testid="event-form">Event Form</div>,
}));

describe("Dashboard Component", () => {
  test("renders Dashboard with initial list view", () => {
    render(<Dashboard />);
    screen.debug();
    expect(screen.getByText("List View")).toBeInTheDocument();
    expect(screen.getByText("Calendar View")).toBeInTheDocument();
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
    expect(screen.getByTestId("event-form")).toBeInTheDocument();
    expect(screen.queryByTestId("calendar-view")).not.toBeInTheDocument();
  });

  test("switches to calendar view when Calendar View button is clicked", () => {
    render(<Dashboard />);

    fireEvent.click(screen.getByText("Calendar View"));

    expect(screen.getByTestId("calendar-view")).toBeInTheDocument();
    expect(screen.queryByTestId("event-list")).not.toBeInTheDocument();
  });

  test("EventForm is always rendered regardless of the view", () => {
    render(<Dashboard />);

    expect(screen.getByTestId("event-form")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Calendar View"));

    expect(screen.getByTestId("event-form")).toBeInTheDocument();
  });
});
