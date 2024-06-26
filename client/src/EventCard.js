import EventDetail from "./EventDetail";

function EventCard({ event }) {
  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <EventDetail event={event} />
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto",
    columnGap: "8px",
    maxWidth: "640px",
    backgroundColor: "white",
  };
}

export default EventCard;
