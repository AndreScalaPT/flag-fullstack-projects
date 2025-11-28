import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import NewsPage from "./pages/news/NewsPage";
import ProductionsPage from "./pages/ProductionsPage";
import InitiativesPage from "./pages/InitiativesPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ContactsPage from "./pages/ContactsPage";
import NewsPageList from "./pages/news/NewsPageList";

// =============================
//  WRAPPER para aplicar scroll
// =============================
function AppContent() {
  const location = useLocation();

  // HOME não tem padding-top para não estragar o HERO
  const isHome =
    location.pathname === "/" || location.pathname === "/projeto-front-end/";

  return (
    <>
      <MainNav />

      <main
        id="app-scroll-container"
        style={{
          paddingTop: isHome ? "0px" : "78px", // 👈 HOME sem offset / resto normal
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/news" element={<NewsPageList />} />
          <Route path="/news/:slug" element={<NewsPage />} />
          <Route path="/productions" element={<ProductionsPage />} />
          <Route path="/initiatives" element={<InitiativesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
