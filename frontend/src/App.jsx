import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import ResourceDetails from "./pages/ResourceDetails";
import Costs from "./pages/Costs";
import Forecast from "./pages/Forecast";
import Anomalies from "./pages/Anomalies";
import Recommendations from "./pages/Recommendations";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/resources/:id"
          element={<ResourceDetails />}
        />
        <Route path="/costs" element={<Costs />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/anomalies" element={<Anomalies />} />
        <Route
          path="/recommendations"
          element={<Recommendations />}
        />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;