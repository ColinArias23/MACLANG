import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./views/login/login.jsx";
import Dashboard from "./views/dashboard/dashboard.jsx";
import Inbox from "./views/inbox/inbox.jsx";
import All from "./views/all/all.jsx";
import Settings from "./views/settings/settings.jsx";
import Department from "./views/department/department.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";

const router = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/",
            element: <DefaultLayout />,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: "dashboard",
                    element: <Dashboard />
                },
                {
                    path: "department",
                    element: <Department />
                },
                {
                    path: "inbox",
                    element: <Inbox />
                },
                {
                    path: "all",
                    element: <All />
                },
                {
                    path: "settings",
                    element: <Settings />
                }
            ]
        }
        
]);

export default router;