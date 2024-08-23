import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Event Management App heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Event Management App/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders EventForm component", () => {
  render(<App />);
  const formElement = screen.getByText(/Add New Event/i);
  expect(formElement).toBeInTheDocument();
});

test("renders EventList component", () => {
  render(<App />);
  const listElement = screen.getByText(/Upcoming Events/i);
  expect(listElement).toBeInTheDocument();
});

test("renders CalendarView component", () => {
  render(<App />);
  const calendarElement = screen.getByRole("grid");
  expect(calendarElement).toBeInTheDocument();
});
