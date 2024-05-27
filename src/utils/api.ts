import axios from "axios";
import { API, BASE_URL, COOKIES } from "./definitions";
import { InputField } from "./interfaces";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${COOKIES.get("access_token")}`,
  },
});

export enum DBTable {
  Employees = "Employees",
  Departments = "Departments",
  Positions = "Positions",
  Statuses = "Statuses",
  Suppliers = "Suppliers",
  Brands = "Brands",
  Warehouses = "Warehouses",
  ReceivedNotes = "ReceivedNotes",
  Batches = "Batches",
  Products = "Products",
  Orders = "Orders",
  Customers = "Customers",
}

export async function login(formData: {
  EmployeeEmail: string;
  Password: string;
}) {
  try {
    const response = await instance.post(API.login, formData);

    return response.data;
  } catch (error) {
    alert("Lỗi đăng nhập.");
  }
}

export async function register(formData: {
  EmployeeName: string;
  EmployeeEmail: string;
  Gender: number;
  PhoneNumber: string;
  Password: string;
}) {
  try {
    const response = await instance.post(API.register, formData);

    return response.data;
  } catch (error) {
    alert("Lỗi đăng ký.");
  }
}

export async function logout() {
  try {
    const response = await instance.post(API.logout);
    COOKIES.remove("access_token", {
      path: "/",
    });

    location.reload();
    return response.data;
  } catch (error) {
    alert("Lỗi đăng ký.");
  }
}

export async function fetchFromTable(table: DBTable, options?: any) {
  let url = "";
  switch (table) {
    case DBTable.Employees:
      url = API.getEmployees;
      break;
    case DBTable.Departments:
      url = API.getDepartments;
      break;
    case DBTable.Positions:
      url = API.getPositions;
      break;
    case DBTable.Statuses:
      url = API.getStatuses;
      break;
    case DBTable.Suppliers:
      url = API.getSuppliers;
      break;
    case DBTable.Brands:
      url = API.getBrands;
      break;
    case DBTable.Warehouses:
      url = API.getWarehouses;
      break;
    case DBTable.ReceivedNotes:
      url = API.getReceivedNotes;
      break;
    case DBTable.Batches:
      url = API.getBatches;
      break;
    case DBTable.Products:
      url = API.getProducts;
      break;
    case DBTable.Orders:
      url = API.getOrders;
      break;
    case DBTable.Customers:
      url = API.getCustomers;
      break;
  }

  try {
    const response = await instance.get(url, {
      params: options,
    });

    return response.data;
  } catch (error) {
    alert(error);
  }
}

export async function createFromTable(
  table: DBTable,
  data: { [key: string]: any }
) {
  let url = "";
  switch (table) {
    case DBTable.Departments:
      url = API.createDepartment;
      break;
    case DBTable.Positions:
      url = API.createPosition;
      break;
    case DBTable.Statuses:
      url = API.createStatus;
      break;
    case DBTable.Suppliers:
      url = API.createSupplier;
      break;
    case DBTable.Brands:
      url = API.createBrand;
      break;
    case DBTable.Warehouses:
      url = API.createWarehouse;
      break;
    case DBTable.ReceivedNotes:
      url = API.createReceivedNote;
      break;
    case DBTable.Batches:
      url = API.createBatche;
      break;
    case DBTable.Products:
      url = API.createProduct;
      break;
  }

  try {
    const response = await instance.post(url, data);
    console.log(response);

    return response.data;
  } catch (error) {
    alert(error);
  }
}

export async function updateFromTable(
  table: DBTable,
  id: {
    name: string;
    value: any;
  },
  updateData: InputField[]
) {
  let url = "";
  switch (table) {
    case DBTable.Employees:
      url = API.updateEmployees;
      break;
    case DBTable.Departments:
      url = API.updateDepartment;
      break;
    case DBTable.Positions:
      url = API.updatePosition;
      break;
    case DBTable.Statuses:
      url = API.updateStatus;
      break;
    case DBTable.Suppliers:
      url = API.updateSupplier;
      break;
    case DBTable.Brands:
      url = API.updateBrand;
      break;
    case DBTable.Warehouses:
      url = API.updateWarehouse;
      break;
    case DBTable.Batches:
      url = API.updateBatche;
      break;
    case DBTable.Products:
      url = API.updateProduct;
      break;
    case DBTable.Orders:
      url = API.updateOrder;
      break;
  }

  try {
    const body: { [key: string]: any } = {
      [id.name]: id.value,
    };
    updateData.map((data) => {
      if (data.type !== "password") body[data.name] = data.value;
    });

    const response = await instance.put(url, body);
    return response.data;
  } catch (error) {
    alert(error);
  }
}

export async function deleteFromTable(
  table: DBTable,
  id: {
    name: string;
    value: any;
  }
) {
  let url = "";
  switch (table) {
    case DBTable.Employees:
      url = API.deleteEmployees;
      break;
    case DBTable.Departments:
      url = API.deleteDepartment;
      break;
    case DBTable.Positions:
      url = API.deletePosition;
      break;
    case DBTable.Statuses:
      url = API.deleteStatus;
      break;
    case DBTable.Suppliers:
      url = API.deleteSupplier;
      break;
    case DBTable.Brands:
      url = API.deleteBrand;
      break;
    case DBTable.Warehouses:
      url = API.deleteWarehouse;
      break;
    case DBTable.Batches:
      url = API.deleteBatche;
      break;
    case DBTable.Products:
      url = API.deleteProduct;
      break;
  }

  try {
    const response = await instance.delete(url, {
      data: {
        [id.name]: id.value,
      },
    });
    return response.data;
  } catch (error) {
    alert(error);
  }
}

export async function fetchCurrentUser() {
  try {
    const response = await instance.post(API.me);
    return response.data;
  } catch (error) {
    alert(error);
  }
}

export async function searchSKUBySupplier(SupplierID: any) {
  try {
    const response = await instance.post(API.searchSKUBySupplier, {
      SupplierID,
    });
    return response.data;
  } catch (error) {
    alert(error);
  }
}

export async function getShipper() {
  try {
    const response = await instance.get(API.getShipper);
    return response.data;
  } catch (error) {
    alert(error);
  }
}

export async function getDashboard() {
  try {
    const response = await instance.get(API.getDashboard);
    return response.data;
  } catch (error) {
    alert(error);
  }
}
