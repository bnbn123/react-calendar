export const getEvents = () => {
  try {
    const events = localStorage.getItem("events");
    console.log("Retrieved events string from storage:", events);
    if (!events) return [];
    const parsedEvents = JSON.parse(events);
    console.log("Parsed events:", parsedEvents);
    return Array.isArray(parsedEvents) ? parsedEvents : [];
  } catch (error) {
    console.error("Error retrieving events from storage:", error);
    return [];
  }
};

export const saveEvents = (events) => {
  try {
    if (!Array.isArray(events)) {
      console.error("Attempted to save non-array events:", events);
      return;
    }
    console.log("Saving events to storage:", events);
    const eventsString = JSON.stringify(events);
    localStorage.setItem("events", eventsString);
    console.log("Events saved successfully. Stored string:", eventsString);
  } catch (error) {
    console.error("Error saving events to storage:", error);
  }
};
