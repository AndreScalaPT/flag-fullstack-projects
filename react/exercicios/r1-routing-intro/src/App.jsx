import { Route, Switch, Link } from "wouter";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Gallery from "./pages/Gallery";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <h1>Welcome</h1>
      <nav>
        <Link to="/">HomePage</Link> | <Link to="/contacts">Contacts</Link> |{" "}
        <Link to="/gallery">Gallery</Link>
      </nav>
      <Switch>
        <Route path="/" component={Home}></Route>
        <Route path="/contacts" component={Contacts}></Route>
        <Route path="/gallery" component={Gallery}></Route>
        <Route path="/user/:username" component={UserProfile}></Route>
      </Switch>
    </>
  );
}

export default App;
