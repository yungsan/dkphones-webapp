import { Navigate, RouteObject } from "react-router-dom";
import Dashboard from "../pages/manager/Dashboard";
import Employees from "../pages/manager/Emlpoyees";
import Departments from "../pages/manager/Departments";
import Positions from "../pages/manager/Positions";
import Statuses from "../pages/manager/Status";
import Suppliers from "../pages/manager/Suppliers";
import Warehouses from "../pages/manager/Warehouses";
import Brands from "../pages/manager/Brands";
import Products from "../pages/manager/Products";
import ReceivedNotes from "../pages/warehouse/RevceivedNotes";
import CustomerList from "../pages/manager/CustomerList";

const ManagerRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    index: true,
    element: <Dashboard />,
  },
  {
    path: "/quan-ly-kho",
    children: [
      {
        path: "/quan-ly-kho/",
        element: <Warehouses />,
      },
      {
        path: "/quan-ly-kho/phieu-nhap-kho",
        element: <ReceivedNotes />,
      },
      {
        path: "/quan-ly-kho/phieu-xuat-kho",
        element: <h1>xuat</h1>,
      },
    ],
  },
  {
    path: "/quan-ly-nha-cung-cap",
    children: [
      {
        path: "/quan-ly-nha-cung-cap/",
        element: <Suppliers />,
      },
      {
        path: "/quan-ly-nha-cung-cap/thuong-hieu",
        element: <Brands />,
      },
    ],
  },
  {
    path: "/danh-sach-khach-hang",
    element: <CustomerList />,
  },
  {
    path: "/quan-ly-nhan-vien",
    element: <Employees />,
  },
  {
    path: "quan-ly-san-pham",
    element: <Products />,
  },
  {
    path: "quan-ly-trang-thai-don-hang",
    element: <Statuses />,
  },
  {
    path: "/quan-ly-phong-ban",
    element: <Departments />,
  },
  {
    path: "/quan-ly-chuc-vu",
    element: <Positions />,
  },
];

export default ManagerRouter;
