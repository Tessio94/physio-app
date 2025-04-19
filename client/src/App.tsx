import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";
import BookNow from "./pages/BookNow";
import AdminLogin from "./pages/admin/AdminLogin";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminKorisnici from "./pages/admin/AdminKorisnici";
import AdminKalendar from "./pages/admin/AdminKalendar";
import AdminPostavke from "./pages/admin/AdminPostavke";

const queryClient = new QueryClient();

function App() {
  //useLocation() may be used only in the context of a <Router> component.

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="prijava" element={<Login />} />
            <Route path="registracija" element={<Login />} />
            <Route path="book-now" element={<BookNow />} />
          </Route>

          {/* Admin pages with their own layout */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* replace ensures the redirect doesn't stay in the browser history
            (acts like a clean redirect). */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="kalendar" element={<AdminKalendar />} />
            <Route path="korisnici" element={<AdminKorisnici />} />
            <Route path="postavke" element={<AdminPostavke />} />
          </Route>

          <Route path="/admin/log-in" element={<AdminLogin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
