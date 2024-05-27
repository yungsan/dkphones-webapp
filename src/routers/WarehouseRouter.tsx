import { RouteObject } from "react-router-dom";
import WarehousesList from "../pages/warehouse/WarehousesList";
import SuppliersList from "../pages/warehouse/SuppliersList";
import ReceivedNotes from "../pages/warehouse/RevceivedNotes";

const WarehouseRouter: RouteObject[] = [
  {
    path: "/danh-sach-kho-hang",
    element: <WarehousesList />,
  },
  {
    path: "/danh-sach-nha-cung-cap",
    element: <SuppliersList />,
  },
  {
    path: "/quan-ly-nhap-kho",
    element: <ReceivedNotes />,
  },
  {
    path: "/quan-ly-xuat-kho",
    element: <h1>ql xuat</h1>,
  },
];

export default WarehouseRouter;
