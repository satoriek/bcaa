import { useContext, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from "./UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";
import LoginModal from "./LoginModal"; // Import the LoginModal component

function Navigation() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "rgba(78,170,169,100)", fontSize: "1.5rem", textAlign: "right" }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontSize: "1.6rem", color: "white" }}>ZABUBLEJ EVENTY</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/freeEvents" className={`nav-link-custom ${location.pathname === "/freeEvents" ? "font-weight-bold text-white" : ""}`}>Volné akce</Nav.Link>
              <Nav.Link as={Link} to="/myEvents" className={`nav-link-custom ${location.pathname === "/myEvents" ? "font-weight-bold text-white" : ""}`}>Moje akce</Nav.Link>
              {loggedInUser && loggedInUser.role === "manager" && (
                <Nav.Link as={Link} to="/" className={`nav-link-custom ${location.pathname === "/" ? "font-weight-bold text-white" : ""}`}>Všechny akce</Nav.Link>
              )}
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown title={loggedInUser ? loggedInUser.name : "Přihlaš se"} drop={"start"}>
                  {getUserMenuList({ userList, loggedInUser, handlerMap })}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Render the LoginModal component */}
      <LoginModal show={showLoginModal} setShowLoginModal={setShowLoginModal} handlerMap={handlerMap} />
    </>
  );
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
  const userMenuItemList = userList.map((user) => (
    <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
      {user.name}
    </NavDropdown.Item>
  ));

  if (loggedInUser) {
    userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
    userMenuItemList.push(
      <NavDropdown.Item
        key={"logout"}
        onClick={() => handlerMap.logout()}
        style={{ color: "red" }}
      >
        <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Odhlas se"}
      </NavDropdown.Item>
    );
  }

  return userMenuItemList;
}

export default Navigation;
