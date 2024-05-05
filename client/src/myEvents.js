import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";
import { UserContext } from "./UserContext.js";
import Button from "react-bootstrap/esm/Button.js";
import EventCard from "./EventCard.js";
import EventForm from "./EventForm.js";
import Container from "react-bootstrap/esm/Container.js";

function AllEvents() {
  const { eventList } = useContext(EventListContext);
  const { loggedInUser } = useContext(UserContext); // Accessing logged-in user from context
  const [showEventForm, setShowEventForm] = useState(false);

  // Condition to check if the user is logged in
  const isLoggedIn = loggedInUser !== null;

  // Filtered event list based on user's role
  let filteredEventList = [];
  if (isLoggedIn) {
    // Filter events assigned to the logged-in user
    filteredEventList = eventList.filter(
      (event) => event.employee === loggedInUser.id
    );
  }

  return (
    <Container>
      <>
        {showEventForm && <EventForm setShowEventForm={setShowEventForm} />}
        {filteredEventList.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </>
    </Container>
  );
}

export default AllEvents;
