import { Route, Switch, Router } from "wouter";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  // Detecta automaticamente se está em desenvolvimento ou build
  const base =
    import.meta.env.MODE === "development" ? "" : "/projeto-front-end";

  return (
    <>
      <Router base={base}>
        <MainNav />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
