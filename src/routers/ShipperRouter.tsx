import { RouteObject } from "react-router-dom";
import Orders from "../pages/Sales/Orders";

const ShipperRouter: RouteObject[] = [
  {
    path: "/thong-tin-cong-viec",
    element: <Orders />,
  },
];

export default ShipperRouter;
