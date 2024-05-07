const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const eventFolderPath = path.join(__dirname, "storage", "eventList");

// Method to read an event from a file
function get(eventId) {
  try {
    const filePath = path.join(eventFolderPath, `${eventId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw new Error("Failed to read event: " + error.message);
  }
}

// Method to write an event to a file
function create(event) {
  try {
    event.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(eventFolderPath, `${event.id}.json`);
    const fileData = JSON.stringify(event);
    fs.writeFileSync(filePath, fileData, "utf8");
    return event;
  } catch (error) {
    throw new Error("Failed to create event: " + error.message);
  }
}

// Method to update event in a file
function update(event) {
  try {
    const currentEvent = get(event.id);
    if (!currentEvent) throw new Error("Event not found");

    // Save new event with updated parameters
    const newFilePath = path.join(eventFolderPath, `${event.id}.json`);
    const fileData = JSON.stringify(event);
    fs.writeFileSync(newFilePath, fileData, "utf8");

    return event;
  } catch (error) {
    throw new Error("Failed to update event: " + error.message);
  }
}

// Method to remove an event from a file
function remove(eventId) {
  try {
    const filePath = path.join(eventFolderPath, `${eventId}.json`);
    fs.unlinkSync(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw new Error("Failed to remove event: " + error.message);
    }
  }
}

// Method to list events in a folder
function list() {
  try {
    const files = fs.readdirSync(eventFolderPath);
    const eventList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(eventFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    eventList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return eventList;
  } catch (error) {
    throw new Error("Failed to list events: " + error.message);
  }
}

function assign(eventId, userId) {
  try {
    const event = get(eventId);
    if (!event) throw new Error("Event not found");

    event.employee = userId;
    update(event);
    return event;
  } catch (error) {
    throw new Error("Failed to assign event: " + error.message);
  }
}

function unassign(eventId) {
  console.log("Unassigning event", eventId);
  try {
    const event = get(eventId);
    if (!event) throw new Error("Event not found");

    // Check if event has an employee assigned
    if (!event.employee) {
      throw new Error("No employee assigned to this event");
    }

    // Unassign employee by deleting the employee property
    delete event.employee;

    // Update the event
    update(event);

    // Return the updated event
    return event;
  } catch (error) {
    throw new Error("Failed to unassign event: " + error.message);
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  assign,
  unassign,
};