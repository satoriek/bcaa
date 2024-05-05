import { useContext, useState } from "react";
import { UserContext } from "./UserContext.js"; // Import UserContext
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { EventListContext } from "./EventListContext.js"; // Import EventListContext

function EventForm({ setShowEventForm }) {
  const { handlerMap } = useContext(EventListContext);
  const { userList} = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(null);
  
  // Define state variable or retrieve it from context if available
  const state = ''; // Change this to the correct state variable if available in context

  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowEventForm(false)} centered>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = new FormData(e.target);
          try {
            await handlerMap.handleCreate(Object.fromEntries(formData));
            setShowEventForm(false);
          } catch (e) {
            console.log(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Vytvořit událost</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Nepodařilo se vytvořit událost</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="eventName">
            <Form.Label>Název události</Form.Label>
            <Form.Control type="text" name="name" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventDate">
            <Form.Label>Datum konání</Form.Label>
            <Form.Control 
              type="date" 
              name="date" 
              required 
              onChange={(e) => {
                // Ensure only the date part is kept, removing the time part
                const dateValue = e.target.value;
                const dateOnly = dateValue.split("T")[0];
                e.target.value = dateOnly;
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventTime">
            <Form.Label>Čas konání</Form.Label>
            <Form.Control type="time" name="time" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventLocation">
            <Form.Label>Místo konání</Form.Label>
            <Form.Control type="text" name="location" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventContact">
            <Form.Label>Kontakt</Form.Label>
            <Form.Control type="text" name="contact" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventDescription">
            <Form.Label>Popis</Form.Label>
            <Form.Control as="textarea" name="description" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventEmployee">
            <Form.Label>Vyberte zaměstnance</Form.Label>
            <Form.Select name="employee" required>
              <option value="">Vyberte zaměstnance</option>
              {userList.map((user, index) => (
                <option key={index} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEventForm(false)}
            disabled={isPending}
          >
            Zavřít
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            Vytvořit
          </Button>
        </Modal.Footer>
      </Form>
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

export default EventForm;
