import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/manager/Login";
import ManagerRouter from "./ManagerRouter";
import SalesRouter from "./SalesRouter";
import WarehouseRouter from "./WarehouseRouter";
import ShipperRouter from "./ShipperRouter";

const PageRouter = [
  ManagerRouter,
  SalesRouter,
  WarehouseRouter,
  ShipperRouter,
].flat();

const AppRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: PageRouter,
  },
  {
    path: "*",
    element: <p>404</p>,
  },
]);

export default AppRouter;
