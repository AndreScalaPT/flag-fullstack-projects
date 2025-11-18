import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNav from "./components/MainNav"; // invocar a pasta
import Footer from "./components/Footer";

import Home from "./pages/HomePage";
import Historial from "./pages/HistoricalPage";
import Noticias from "./pages/NewsPage";
import Producoes from "./pages/ProductionsPage";
import Iniciativas from "./pages/InitiativesPage";
import Atividades from "./pages/ActivitiesPage";
import Contactos from "./pages/ContactsPage";

function App() {
  return (
    <BrowserRouter basename="/projeto-front-end">
      <MainNav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/news" element={<Noticias />} />
          <Route path="/productions" element={<Producoes />} />
          <Route path="/initiatives" element={<Iniciativas />} />
          <Route path="/activities" element={<Atividades />} />
          <Route path="/contacts" element={<Contactos />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
