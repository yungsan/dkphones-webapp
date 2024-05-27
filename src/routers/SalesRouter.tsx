import { RouteObject } from "react-router-dom";
import ShipperList from "../pages/Sales/ShipperList";
import Orders from "../pages/Sales/Orders";

const SalesRouter: RouteObject[] = [
  {
    path: "/quan-ly-don-hang",
    element: <Orders />,
  },
  {
    path: "/danh-sach-khach-hang",
    element: <h1>ds khach hang</h1>,
  },
  {
    path: "/danh-sach-shipper",
    element: <ShipperList />,
  },
];

export default SalesRouter;
