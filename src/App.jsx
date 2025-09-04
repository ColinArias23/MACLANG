import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./modules/login/login.jsx";
import Main from "./modules/main/main.jsx";
import Users from "./modules/users/users.jsx";
import AnnouncementDetail from "./modules/users/announcementdetail.jsx"; 
// import Admin from "./modules/admin/admin.jsx";
import Dashboard from "./modules/dashboard/dashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Main Route */}
        <Route path="/main" element={<Main />} />

        {/* Users Route */}
        <Route path="/users" element={<Users />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ✅ Detail Route */}
      <Route path="/announcement/:title" element={<AnnouncementDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
