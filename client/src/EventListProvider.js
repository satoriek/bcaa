import { useEffect, useState } from "react";
import { EventListContext } from "./EventListContext.js";

function EventListProvider({ children }) {
  const [eventLoadObject, setEventLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/event/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setEventLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/event/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setEventLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setEventLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/event/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setEventLoadObject((current) => {
        const eventIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[eventIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleAssign(eventId, userId) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/event/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId, userId }),
    });
    const responseJson = await response.json();
  
    if (response.status < 400) {
      // Update the event list after successful assignment
      setEventLoadObject((current) => {
        const updatedEventList = current.data.map((event) => {
          if (event.id === eventId) {
            // Update the assigned employee id for the specific event
            return { ...event, employee: userId };
          }
          return event;
        });
        return { state: "ready", data: updatedEventList };
      });
      return responseJson;
    } else {
      // Handle error state
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }  

  async function handleDelete(eventId) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/event/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: eventId }),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setEventLoadObject((current) => {
        const updatedEventList = current.data.filter((event) => event.id !== eventId);
        return { state: "ready", data: updatedEventList };
      });
      return responseJson;
    } else {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }



  async function handleUnassign(eventId) {
    setEventLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:3000/event/unassign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId }),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setEventLoadObject((current) => {
        const updatedEventList = current.data.map((event) => {
          if (event.id === eventId) {
            return { ...event, employee: null };
          }
          return event;
        });
        return { state: "ready", data: updatedEventList };
      });
      return responseJson;
    } else {
      setEventLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: eventLoadObject.state,
    eventList: eventLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleAssign, handleDelete, handleUnassign },
  };

  return (
    <EventListContext.Provider value={value}>
      {children}
    </EventListContext.Provider>
  );
}

export default EventListProvider;
