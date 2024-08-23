import React, { createContext, useState, useEffect, useRef } from "react";
import { getEvents, saveEvents } from "../utils/storage";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [modalEvent, setModalEvent] = useState(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const storedEvents = getEvents();
    console.log("Initial events from storage:", storedEvents);
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log("Events updated, saving to storage:", events);
      saveEvents(events);
    }
  }, [events]);

  const addEvent = (event) => {
    console.log("Adding event:", event);
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const updateEvent = (updatedEvent) => {
    console.log("Updating event:", updatedEvent);
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (id) => {
    console.log("Deleting event with id:", id);
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const openModal = (event = null) => {
    console.log("Opening modal with event:", event);
    setModalEvent(event);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setModalEvent(null);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        modalEvent,
        openModal,
        closeModal,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
