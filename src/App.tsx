import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";
import BookNow from "./pages/BookNow";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="book-now" element={<BookNow />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
