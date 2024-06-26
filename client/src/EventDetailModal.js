import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { EventListContext } from "./EventListContext.js";

function EventDetailModal({ event, onHide, source }) {
  const [showAlert, setShowAlert] = useState(null);
  const isPending = false; // Set to true if you want to show a loading indicator
  const { loggedInUser } = useContext(UserContext);
  const { state, handlerMap } = useContext(EventListContext);

  // Format date if needed
  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, ".");

  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{event.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>
        <Alert
          show={!!showAlert}
          variant="danger"
          dismissible
          onClose={() => setShowAlert(null)}
        >
          <Alert.Heading>Error</Alert.Heading>
          <pre>{showAlert}</pre>
        </Alert>

        {isPending && (
          <div style={pendingStyle()}>
            <Icon path={mdiLoading} size={2} spin />
          </div>
        )}

        <div>
          <div>Datum: {formattedDate}</div>
          <div>Čas: {event.time}</div>
          <div>Lokace: {event.location}</div>
          <div>Kontakt: {event.contact}</div>
          <div>Popis: {event.description}</div>
          <div>Zaměstnanec: {event.employee? event.employee : "free" } </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {source !== "myEvents" && (
          <Button variant="primary" onClick={() => {handlerMap.handleAssign(event.id, loggedInUser.id); onHide();}}>Zabrat</Button>
        )}
        {(source === "allEvents" || source === "myEvents") && (
          <Button variant="danger" onClick={() => {handlerMap.handleUnassign(event.id); onHide();}}>Uvolnit</Button>
        )}
        {source === "allEvents" && (
          <Button variant="warning" onClick={() => {handlerMap.handleDelete(event.id); onHide();}}>Smazat</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}


function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

export default EventDetailModal;
