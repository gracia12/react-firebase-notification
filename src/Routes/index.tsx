import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotificationLayout from "../layouts/NotificationLayout";
import HomeLayout from "../layouts/HomeLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/home",
    element: <HomeLayout />
  },
  {
    path: "/connections",
    element: <ConnectionLayout />
  },
  {
    path: "/notifications",
    element: <NotificationLayout />
  }
]);
