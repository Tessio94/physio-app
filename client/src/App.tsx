import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";
import BookNow from "./pages/BookNow";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  //useLocation() may be used only in the context of a <Router> component.

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="prijava" element={<Login />} />
          <Route path="registracija" element={<Login />} />
          <Route path="book-now" element={<BookNow />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
