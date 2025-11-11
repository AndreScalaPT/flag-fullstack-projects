import { Route, Switch } from "wouter";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <MainNav />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
