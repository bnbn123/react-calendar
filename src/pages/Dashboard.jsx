import React, { useState, useContext } from "react";
import EventList from "../components/EventList";
import CalendarView from "../components/CalendarView";
import { EventContext } from "../contexts/EventContext";
import EventForm from "../components/EventForm";

const Dashboard = () => {
  const [view, setView] = useState("list");
  const { openModal } = useContext(EventContext);

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <button onClick={() => setView("list")}>List View</button>
        <button onClick={() => setView("day")}>Calendar View</button>
        {/* <button onClick={() => openModal()}>New Event</button> */}
      </nav>
      <main className="content">
        {view === "list" ? <EventList /> : <CalendarView />}
        <EventForm />
      </main>
    </div>
  );
};

export default Dashboard;
