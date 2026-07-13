import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import GerarMapaPage from "./pages/GerarMapaPage";
import MeusMapasPage from "./pages/MeusMapasPage";
import MapaDetalhePage from "./pages/MapaDetalhePage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminLogsPage from "./pages/AdminLogsPage";
import AdminChartsPage from "./pages/AdminChartsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import { ProtectedRoute, GuestRoute, AdminRoute } from "./components/RouteGuards";
import { GlobalWhatsappButton } from "./components/GlobalWhatsappButton";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/termos-de-uso" element={<TermsPage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPage />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/mapa-astral" element={<GerarMapaPage />} />
          <Route path="/mapa-astral/:id" element={<MapaDetalhePage />} />
          <Route path="/meus-mapas" element={<MeusMapasPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/usuarios" element={<AdminUsersPage />} />
          <Route path="/admin/logs" element={<AdminLogsPage />} />
          <Route path="/admin/mapas" element={<AdminChartsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <GlobalWhatsappButton />
    </BrowserRouter>
  );
}

export default App;
