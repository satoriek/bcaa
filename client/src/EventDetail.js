import React from "react";

function EventDetail({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, ".");

  return (
    <div style={EventStyle}>
      <div style={LabelStyle}>Druh: {event.name}</div>
      <div style={LabelStyle}>Datum: {formattedDate}</div>
      <div style={LabelStyle}>Čas: {event.time}</div>
      <div style={LabelStyle}>Lokace: {event.location}</div>
    </div>
  );
}

const EventStyle = {
  padding: "16px",
  textAlign: "left",
};

const LabelStyle = {
  fontWeight: "bold",
  marginBottom: "4px",
};

export default EventDetail;
