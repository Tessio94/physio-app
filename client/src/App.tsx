import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";
import BookNow from "./pages/BookNow";
import AdminLogin from "./pages/AdminLogin";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

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

          <Route path="/admin/log-in" element={<AdminLogin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
