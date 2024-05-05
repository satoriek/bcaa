import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";
import { UserContext } from "./UserContext.js";
import Button from "react-bootstrap/esm/Button.js";
import EventForm from "./EventForm.js";
import Container from "react-bootstrap/esm/Container.js";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import EventCard from "./EventCard.js";
import EventDetailModal from "./EventDetailModal.js"; // Import the EventDetailModal component

function AllEvents() {
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

  let filteredEventList = [];
  if (isLoggedIn) {
    if (loggedInUser.role === "manager") {
      filteredEventList = eventList;
    } else {
      filteredEventList = eventList.filter(
        (event) =>
          event.assigned === "not-assigned" &&
          new Date(event.date) > new Date()
      );
    }
  }

  const isManager = isLoggedIn && loggedInUser.role === "manager";

  return (
    <Container>
      <>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          {isManager && (
            <Button
              variant="success"
              onClick={() => setShowEventForm(true)}
              style={{
                width: "100%",
                height: "70px",
                fontSize: "1.75rem",
              }}
            >
              <Icon path={mdiPlusBoxOutline} size={2} color={"white"} /> Nová
              událost
            </Button>
          )}
        </div>
        {showEventForm && (
          <EventForm setShowEventForm={setShowEventForm} />
        )}
        {showEventDetails && selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onHide={() => setShowEventDetails(false)}
            source = "allEvents"
          />
        )}
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

export default AllEvents;
