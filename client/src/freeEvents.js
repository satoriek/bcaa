import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";
import { UserContext } from "./UserContext.js";
import Button from "react-bootstrap/esm/Button.js";
import EventForm from "./EventForm.js";
import Container from "react-bootstrap/esm/Container.js";
import EventCard from "./EventCard.js";
import EventDetailModal from "./EventDetailModal.js"; // Import the EventDetailModal component

function FreeEvents() {
  const { eventList } = useContext(EventListContext);
  const { loggedInUser } = useContext(UserContext);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false); // State to control the visibility of the event details modal

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const isLoggedIn = loggedInUser !== null;
  const isManager = isLoggedIn && loggedInUser.role === "manager";

  let filteredEventList = [];
  if (isLoggedIn) {
    filteredEventList = eventList.filter(
      (event) =>
        !event.employee && // Event must not have an employee assigned
        new Date(event.date) > new Date() // Event date must be in the future
    );
  }

  return (
    <Container>
      <>
        {showEventForm && (
          <EventForm setShowEventForm={setShowEventForm} />
        )}
        {showEventDetails && selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onHide={() => setShowEventDetails(false)}
          />
        )}
        {filteredEventList.length === 0 && <div style={{textAlign:"center", fontSize:"2rem"}}>Žádné volné akce</div>}
        {filteredEventList.map((event) => (
          <Button
            key={event.id}
            onClick={() => handleEventClick(event)}
            style={{ width: "100%", margin: "0 0", backgroundColor: "transparent", border: "none"}}
          >
            <EventCard event={event} />
          </Button>
        ))}
      </>
    </Container>
  );
}

export default FreeEvents;