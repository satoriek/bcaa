import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="card-header">
        <Navigation />
      </div>
      <div style={bodyStyle()}>
        <div style={backgroundImageStyle()} /> {/* Create a separate div for the background image */}
        <Outlet />
      </div>
      <div className={"card-footer text-light"} style={footerStyle()}>
        © Kryštof Satorie
      </div>
    </div>
  );
};

function bodyStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
  };
}

function backgroundImageStyle() {
  return {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${require("./background.jpg")})`,
    backgroundSize: 'cover',
    filter: 'blur(10px)', // Apply blur filter only to the background image
    zIndex: '-1',
  };
}

function footerStyle() {
  return {
    padding: "5px",
    textAlign: "center",
    boxSizing: "border-box",
    marginTop: "auto",
  };
}

export default Layout;
