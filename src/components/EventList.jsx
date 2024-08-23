import React, { useContext } from "react";
import { EventContext } from "../contexts/EventContext";
import { DateTime } from "luxon";

const EventList = () => {
  const { events, openModal } = useContext(EventContext);

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} onClick={() => openModal(event)}>
            {event.title} -{" "}
            {DateTime.fromISO(event.start).toLocaleString(
              DateTime.DATETIME_SHORT
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
