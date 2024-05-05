import Button from "react-bootstrap/esm/Button";

export function PageNotFound() {
  return (
    <div style={BodyStyle()}>
      <h1 style={{ fontSize: "32px" }} >404</h1>
      <p>Page not found</p>
      <Button href="/" variant="primary">Go to Home</Button>
      <img src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" alt="Funny GIF" style={{height:"100vh", marginTop:"16px"}} />
    </div>
  );
}

function BodyStyle() {
  return {
    padding: "16px",
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "32px",
  };
}