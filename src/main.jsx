import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import router from './router.jsx';

const Main = () => (
  <React-StrictMode>
    <RouterProvider router={router} />
  </React-StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

export default Main;
