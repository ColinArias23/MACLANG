import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./modules/login/login.jsx";
import Main from "./modules/main/main.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Main Route */}
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
