import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import ExpertDetails from "./pages/ExpertDetails";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/expert/:id"
          element={<ExpertDetails />}
        />

        <Route
          path="/booking/:id"
          element={<BookingPage />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;