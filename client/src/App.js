import { HashRouter as Router, Routes, Route } from "react-router-dom";

import MyEvents from "./myEvents";
import AllEvents from "./allEvents";
import FreeEvents from "./freeEvents";
import Layout from "./Layout";
import UserProvider from "./UserProvider";
import EventListProvider from "./EventListProvider";
import { PageNotFound } from "./404";

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <EventListProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout/>}>
                <Route path="" element={<AllEvents/>}/>
                <Route path="myEvents" element={<MyEvents/>}/>
                <Route path="freeEvents" element={<FreeEvents/>}/>
                <Route path="*" element={<PageNotFound/>} />
              </Route>
            </Routes>
          </Router>
        </EventListProvider>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };
}

export default App;