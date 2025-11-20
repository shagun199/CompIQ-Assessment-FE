import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Payroll from "./pages/Payroll";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth route */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Payroll route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Payroll />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
