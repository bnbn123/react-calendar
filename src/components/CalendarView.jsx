import React, { useContext } from "react";
import { Calendar, luxonLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventContext } from "../contexts/EventContext";
import ErrorBoundary from "./ErrorBoundary";

// Set up the localizer for react-big-calendar
const localizer = luxonLocalizer(DateTime);

const CalendarView = ({ view }) => {
  console.log("🚀 ~ CalendarView ~ view:", view);
  const { events, openModal } = useContext(EventContext);

  // Convert string dates to Luxon DateTime objects
  //Calendar expects start and end dates to be Date objects
  const formattedEvents = events.map((event) => ({
    ...event,
    start: DateTime.fromISO(event.start).toJSDate(),
    end: DateTime.fromISO(event.end).toJSDate(),
  }));

  return (
    //had to do this to prevent the app from crashing
    <ErrorBoundary>
      <div>
        <Calendar
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          view={view}
          onSelectEvent={openModal}
          onSelectSlot={(slotInfo) =>
            openModal({
              start: DateTime.fromJSDate(slotInfo.start).toISO(),
              end: DateTime.fromJSDate(slotInfo.end).toISO(),
            })
          }
          selectable
        />
      </div>
    </ErrorBoundary>
  );
};

export default CalendarView;
