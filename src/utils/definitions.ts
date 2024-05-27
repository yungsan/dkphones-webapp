import Cookies from "universal-cookie";
import { Menu, TableField } from "./interfaces";

export const COOKIES = new Cookies(null, { path: "/" });

export const Cloudinary = {
  cloudName: "dfib3gi7p",
  uploadPreset: "qbz1auay",
};

export const EMPLOYEE_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "EmployeeID",
    show: true,
  },
  {
    label: "Họ và tên",
    name: "EmployeeName",
    show: true,
  },
  {
    label: "Email",
    name: "EmployeeEmail",
    show: true,
  },
  {
    label: "Thu nhập",
    name: "Salary",
    show: true,
  },
  {
    name: "DepartmentID",
    show: false,
  },
  {
    name: "PositionID",
    show: false,
  },
  {
    label: "Chức vụ",
    name: "Position",
    show: true,
  },
  {
    label: "Phòng ban",
    name: "Department",
    show: true,
  },
  {
    name: "PhoneNumber",
    show: false,
  },
  {
    name: "Gender",
    show: false,
  },
];

export const DEPARTMENT_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "DepartmentID",
    show: true,
  },
  {
    label: "Tên phòng ban",
    name: "DepartmentName",
    show: true,
  },
  {
    label: "Ngày thành lập",
    name: "CreatedAt",
    show: true,
  },
  {
    label: "Số lượng thành viên",
    name: "Members",
    show: false,
  },
];

export const POSITION_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "PositionID",
    show: true,
  },
  {
    label: "Tên vị trí",
    name: "PositionName",
    show: true,
  },
  {
    label: "Ngày thành lập",
    name: "CreatedAt",
    show: true,
  },
  {
    label: "Số lượng thành viên",
    name: "",
    show: false,
  },
];

export const STATUS_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "StatusID",
    show: true,
  },
  {
    label: "Tên trạng thái",
    name: "StatusName",
    show: true,
  },
  {
    label: "Ngày tạo",
    name: "CreatedAt",
    show: true,
  },
  {
    label: "Ngày cập nhật",
    name: "UpdatedAt",
    show: true,
  },
];

export const SUPPLIER_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "SupplierID",
    show: true,
  },
  {
    label: "Tên nhà cung cấp",
    name: "SupplierName",
    show: true,
  },
  {
    label: "Email",
    name: "Email",
    show: true,
  },
  {
    label: "Số điện thoại",
    name: "PhoneNumber",
    show: true,
  },
  {
    label: "Ngày tạo",
    name: "CreatedAt",
    show: true,
  },
  {
    label: "Ngày cập nhật",
    name: "UpdatedAt",
    show: false,
  },
];

export const CUSTOMER_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "CustomerID",
    show: true,
  },
  {
    label: "Tên nhà cung cấp",
    name: "CustomerName",
    show: true,
  },
  {
    label: "Số điện thoại",
    name: "PhoneNumber",
    show: true,
  },
  {
    label: "Gender",
    name: "Gender",
    show: false,
  },
  {
    label: "Địa chỉ",
    name: "Address",
    show: true,
  },
  {
    label: "Ngày tham gia",
    name: "CreatedAt",
    show: true,
  },
  {
    label: "Ngày cập nhật",
    name: "UpdatedAt",
    show: false,
  },
];

export const WAREHOUSE_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "WarehouseID",
    show: true,
  },
  {
    label: "Tên kho hàng",
    name: "WarehouseName",
    show: true,
  },
  {
    label: "Số điện thoại",
    name: "PhoneNumber",
    show: true,
  },
  {
    label: "Địa chỉ",
    name: "Address",
    show: true,
  },
  {
    label: "Ngày tạo",
    name: "CreatedAt",
    show: false,
  },
  {
    label: "Ngày cập nhật",
    name: "UpdatedAt",
    show: false,
  },
];

export const BRAND_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "BrandID",
    show: true,
  },
  {
    label: "Tên thương hiệu",
    name: "BrandName",
    show: true,
  },
  {
    label: "Nhà cung cấp ID",
    name: "SupplierID",
    show: false,
  },
  {
    label: "Nhà cung cấp",
    name: "SupplierName",
    show: true,
  },
  {
    label: "Ngày tạo",
    name: "CreatedAt",
    show: false,
  },
  {
    label: "Ngày cập nhật",
    name: "UpdatedAt",
    show: false,
  },
];

export const ORDER_TABLE_FIELDS: TableField[] = [
  { label: "Mã đơn", name: "OrderID", show: true },
  { label: "Tên khách hàng", name: "CustomerName", show: true },
  { label: "Tên sản phẩm", name: "ProductName", show: true },
  { label: "Tổng cộng", name: "Total", show: true },
  { label: "Số lượng", name: "Quantity", show: true },
  { label: "Tồn kho", name: "Remain", show: true },
  { label: "Trạng thái", name: "StatusName", show: true },
  { label: "StatusID", name: "StatusID", show: false },
  { label: "CustomerID", name: "CustomerID", show: false },
  { label: "Ngày tạo", name: "CreatedAt", show: false },
  { label: "Cập nhật cuối", name: "UpdatedAt", show: false },
];

export const RECEIVED_NOTES_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "ReceivedNoteID",
    show: true,
  },
  {
    label: "Mã nhân viên",
    name: "EmployeeID",
    show: false,
  },
  {
    label: "Tên nhân viên",
    name: "EmployeeName",
    show: true,
  },
  {
    label: "Mã kho",
    name: "WarehouseID",
    show: false,
  },
  {
    label: "Tên kho",
    name: "WarehouseName",
    show: true,
  },
  {
    label: "Mã nhà cung cấp",
    name: "SupplierID",
    show: false,
  },
  {
    label: "Tên nhà cung cấp",
    name: "SupplierName",
    show: true,
  },
  {
    label: "Tổng tiền",
    name: "Total",
    show: true,
  },
  {
    label: "Số lượng sản phâm",
    name: "ProductCount",
    show: true,
  },
  {
    label: "Ngày nhập kho",
    name: "CreatedAt",
    show: true,
  },
  {
    label: "Ngày cập nhật",
    name: "UpdatedAt",
    show: false,
  },
];

export const PRODUCT_TABLE_FIELDS: TableField[] = [
  {
    label: "ID",
    name: "ProductID",
    show: true,
  },
  {
    label: "SKU",
    name: "SKU",
    show: true,
  },
  {
    label: "Hình ảnh",
    name: "ImageURL",
    show: true,
  },
  {
    label: "Giá bán",
    name: "Price",
    show: true,
  },
  {
    label: "Mã thương hiệu",
    name: "BrandID",
    show: false,
  },
  {
    label: "Màu sắc",
    name: "Color",
    show: false,
  },
  {
    label: "Kích thước",
    name: "Dimension",
    show: false,
  },
  {
    label: "Cân nặng",
    name: "Weight",
    show: false,
  },
  {
    label: "Kích thước màn hình",
    name: "ScreenSize",
    show: false,
  },
  {
    label: "Độ phân giải",
    name: "ScreenResolution",
    show: false,
  },
  {
    label: "Camera trước",
    name: "FrontCamera",
    show: false,
  },
  {
    label: "Camera sau",
    name: "RearCamera",
    show: false,
  },
  {
    label: "Thông số CPU",
    name: "CPU",
    show: false,
  },
  {
    label: "Dung lượng RAM",
    name: "RAM",
    show: false,
  },
  {
    label: "Dung lượng PIN",
    name: "Power",
    show: false,
  },
  {
    label: "Cổng sạc",
    name: "ChargingPort",
    show: false,
  },
  {
    label: "SIM",
    name: "SIM",
    show: false,
  },
  {
    label: "Bluetooth verison",
    name: "Bluetooth",
    show: false,
  },
  {
    label: "Jack tai nghe",
    name: "HeadphoneJack",
    show: false,
  },
  {
    label: "Dung lượng điện thoại",
    name: "Storage",
    show: false,
  },
  {
    label: "Trạng thái",
    name: "Status",
    show: true,
  },
  {
    label: "Độ ưu tiên",
    name: "Priority",
    show: true,
  },
  {
    label: "Ngày tạo",
    name: "CreatedAt",
    show: true,
  },
  {
    label: "Ngày cập nhật",
    name: "UpdatedAt",
    show: false,
  },
];

export const BASE_URL: string = "http://127.0.0.1:8000/api";

const enum API_PATHS {
  auth = "/employee-auth",

  employee = "/employee",

  department = "/department",

  position = "/position",

  status = "/status",

  supplier = "/supplier",

  brand = "/brand",

  warehouse = "/warehouse",

  receivedNote = "/received-note",

  batche = "/batche",

  product = "/product",

  order = "/order",

  customer = "/customer",
}

export enum API {
  login = API_PATHS.auth + "/login",
  register = API_PATHS.auth + "/register",
  logout = API_PATHS.auth + "/logout",
  me = API_PATHS.auth + "/me",

  getEmployees = API_PATHS.employee + "/",
  getShipper = API_PATHS.employee + "/getShipper",
  updateEmployees = API_PATHS.employee + "/update",
  deleteEmployees = API_PATHS.employee + "/delete",

  getDepartments = API_PATHS.department + "/",
  createDepartment = API_PATHS.department + "/create",
  updateDepartment = API_PATHS.department + "/update",
  deleteDepartment = API_PATHS.department + "/delete",

  getPositions = API_PATHS.position + "/",
  createPosition = API_PATHS.position + "/create",
  updatePosition = API_PATHS.position + "/update",
  deletePosition = API_PATHS.position + "/delete",

  getStatuses = API_PATHS.status + "/",
  createStatus = API_PATHS.status + "/create",
  updateStatus = API_PATHS.status + "/update",
  deleteStatus = API_PATHS.status + "/delete",

  getSuppliers = API_PATHS.supplier + "/",
  createSupplier = API_PATHS.supplier + "/create",
  updateSupplier = API_PATHS.supplier + "/update",
  deleteSupplier = API_PATHS.supplier + "/delete",

  getBrands = API_PATHS.brand + "/",
  createBrand = API_PATHS.brand + "/create",
  updateBrand = API_PATHS.brand + "/update",
  deleteBrand = API_PATHS.brand + "/delete",
  getBrandsBySupplier = API_PATHS.brand + "/getBrandsBySupplier",

  getWarehouses = API_PATHS.warehouse + "/",
  createWarehouse = API_PATHS.warehouse + "/create",
  updateWarehouse = API_PATHS.warehouse + "/update",
  deleteWarehouse = API_PATHS.warehouse + "/delete",

  getReceivedNotes = API_PATHS.receivedNote + "/",
  createReceivedNote = API_PATHS.receivedNote + "/create",
  updateReceivedNote = API_PATHS.receivedNote + "/update",
  deleteReceivedNote = API_PATHS.receivedNote + "/delete",

  getBatches = API_PATHS.batche + "/",
  createBatche = API_PATHS.batche + "/create",
  updateBatche = API_PATHS.batche + "/update",
  deleteBatche = API_PATHS.batche + "/delete",

  getProducts = API_PATHS.product + "/",
  searchSKUBySupplier = API_PATHS.product + "/searchSKUBySupplier",
  createProduct = API_PATHS.product + "/create",
  updateProduct = API_PATHS.product + "/update",
  deleteProduct = API_PATHS.product + "/delete",

  getOrders = API_PATHS.order + "/",
  getDashboard = API_PATHS.order + "/dashboard",
  updateOrder = API_PATHS.order + "/update",

  getCustomers = API_PATHS.customer + "/",
  updateCustomer = API_PATHS.customer + "/update",
}

export const MANAGER_MENU: Menu[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "/quan-ly-kho",
    label: "Quản lý kho",
    child: [
      {
        path: "/",
        label: "Danh sách kho hàng",
      },
      {
        path: "/phieu-nhap-kho",
        label: "Phiếu nhập kho",
      },
      // {
      //   path: "/phieu-xuat-kho",
      //   label: "Phiếu xuất kho",
      // },
    ],
  },
  {
    path: "/quan-ly-nha-cung-cap",
    label: "Quản lý nhà cung cấp",
    child: [
      {
        path: "/",
        label: "Danh sách nhà cung cấp",
      },
      {
        path: "/thuong-hieu",
        label: "Quản lý thương hiệu",
      },
    ],
  },
  {
    path: "/quan-ly-don-hang",
    label: "Quản lý hoá đơn",
  },
  {
    path: "/danh-sach-khach-hang",
    label: "Quản lý khách hàng",
  },
  {
    path: "/quan-ly-nhan-vien",
    label: "Quản lý nhân viên",
  },
  {
    path: "/quan-ly-san-pham",
    label: "Quản lý sản phẩm",
  },
  {
    path: "/quan-ly-trang-thai-don-hang",
    label: "Quản lý trạng thái",
  },
  {
    path: "/quan-ly-phong-ban",
    label: "Quản lý phòng ban",
  },
  {
    path: "/quan-ly-chuc-vu",
    label: "Quản lý chức vụ",
  },
];

export const SALES_MENU: Menu[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "/quan-ly-don-hang",
    label: "Quản lý đơn hàng",
  },
  {
    path: "/danh-sach-khach-hang",
    label: "Danh sách khách hàng",
  },
  {
    path: "/danh-sach-shipper",
    label: "Danh sách shipper",
  },
];

export const WAREHOUSE_MENU: Menu[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "/danh-sach-kho-hang",
    label: "Danh sách kho hàng",
  },
  {
    path: "/danh-sach-nha-cung-cap",
    label: "Danh sách nhà cung cấp",
  },
  {
    path: "/quan-ly-san-pham",
    label: "Quản lý sản phẩm",
  },
  {
    path: "/quan-ly-nhap-kho",
    label: "Quản lý nhập kho",
  },
  // {
  //   path: "/quan-ly-xuat-kho",
  //   label: "Quản lý xuất kho",
  // },
];

export const SHIPPER_MENU: Menu[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "/danh-sach-kho-hang",
    label: "Danh sách kho hàng",
  },
  {
    path: "/thong-tin-cong-viec",
    label: "Thông tin công việc",
  },
];
