import React, { useState, useContext, useEffect } from "react";
import { EventContext } from "../contexts/EventContext";
import { DateTime } from "luxon";

export const EventForm = () => {
  const { modalEvent, addEvent, updateEvent, deleteEvent, closeModal } =
    useContext(EventContext);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (modalEvent) {
      setTitle(modalEvent.title || "");
      setStart(formatDateForInput(modalEvent.start));
      setEnd(formatDateForInput(modalEvent.end));
    } else {
      setTitle("");
      setStart(formatDateForInput(DateTime.now().toISO()));
      setEnd(formatDateForInput(DateTime.now().plus({ hours: 1 }).toISO()));
    }
  }, [modalEvent]);

  //format date for input, keep it consistent
  const formatDateForInput = (dateString) => {
    return DateTime.fromISO(dateString).toFormat("yyyy-MM-dd'T'HH:mm");
  };

  const formatDateForSubmit = (dateString) => {
    return DateTime.fromISO(dateString).toISO();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      id: modalEvent?.id || Date.now(),
      title,
      start: formatDateForSubmit(start),
      end: formatDateForSubmit(end),
    };
    console.log("Submitting event:", eventData);
    if (modalEvent?.id) {
      updateEvent(eventData);
    } else {
      addEvent(eventData);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (modalEvent?.id) {
      console.log("Deleting event:", modalEvent.id);
      deleteEvent(modalEvent.id);
      closeModal();
    }
  };

  if (!modalEvent) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{modalEvent.id ? "Edit Event" : "Create Event"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            required
          />
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
          <button type="submit">
            {modalEvent.id ? "Update" : "Create"} Event
          </button>
          {modalEvent.id && (
            <button type="button" onClick={handleDelete}>
              Delete Event
            </button>
          )}
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
