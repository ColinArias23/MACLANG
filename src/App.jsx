import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DefaultLayout from "./components/defaultlayout.jsx";
import Login from "./view/login/login.jsx";
import Dashboard from "./view/dashboard/dashboard.jsx";
import Department from "./view/department/department.jsx";
import Inbox from "./view/inbox/inbox.jsx";
import All from "./view/all/all.jsx";
import Settings from "./view/settings/settings.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />

        {/* Main pages */}
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/department" element={<Department />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/all" element={<All />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
