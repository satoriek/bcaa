import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";
import { UserContext } from "./UserContext.js";
import Button from "react-bootstrap/esm/Button.js";
import EventCard from "./EventCard.js";
import EventForm from "./EventForm.js";
import Container from "react-bootstrap/esm/Container.js";
import EventDetailModal from "./EventDetailModal.js";

function MyEvents() {
  const { eventList } = useContext(EventListContext);
  const { loggedInUser } = useContext(UserContext);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const isLoggedIn = loggedInUser !== null;

  let filteredEventList = [];
  if (isLoggedIn) {
    filteredEventList = eventList.filter(
      (event) => event.employee === loggedInUser.id
    );
  }

  return (
    <Container>
      <>
        {showEventForm && <EventForm setShowEventForm={setShowEventForm} />}
        {showEventDetails && selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onHide={() => setShowEventDetails(false)}
            source="myEvents"
          />
        )}
        {filteredEventList.map((event) => (
          <Button
            key={event.id}
            onClick={() => handleEventClick(event)}
            style={{ width: "100%", margin: "8px 0", backgroundColor: "transparent", border: "none"}}
          >
            <EventCard event={event} />
          </Button>
        ))}
      </>
    </Container>
  );
}

export default MyEvents;
