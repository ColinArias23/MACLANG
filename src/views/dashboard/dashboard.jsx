import { Outlet } from "react-router-dom"

export default function dashboard() {
    return (
      <div>Dashboard.
        <Outlet/>
      </div>
    )
}