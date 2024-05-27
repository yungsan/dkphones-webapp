export enum Roles {
  MANAGER = 1, // ban lanh dao
  WAREHOUSE = 2, // kho
  SALES = 3, // ban hang
  SHIPPER = 4, // giao hang
}

export interface Menu {
  path: string;
  label: string;
  icon?: string;
  show?: boolean;
  child?: Menu[];
}

export interface TableField {
  label?: string;
  name: string;
  show: boolean;
}

export interface Employee {
  EmployeeID?: number | string;
  EmployeeName?: string;
  EmployeeEmail?: string;
  Salary?: number;
  PositionName?: string;
  DepartmentName?: string;
  Gender?: number;
}

export interface InputAttr {
  type: string;
  placeholder: string;
  id?: string;
  value: string;
  name?: string;
}

export interface FormField {
  label: string;
  input: InputAttr;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  user: Employee;
}

export interface Widget {
  title?: string;
  span?: string;
  icon?: any;
  number?: number | string;
  onClick?: () => void;
  classses?: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    EmployeeName: string;
    EmployeeEmail: string;
    Gender: number;
    PhoneNumber: string;
    UpdatedAt: string;
    CreatedAt: string;
    EmployeeID: number;
  };
}

export interface InputField {
  id?: any;
  label?: string | null;
  classes?: string;
  type: string;
  name: string;
  value?: any;
  setValue?: any;
  show?: boolean;
  action?: boolean;
  list?: {
    value: any;
    handle: any;
  };
  options?: {
    value: any;
    label: string;
  }[];
}

export interface CurrentUser {
  EmployeeID: number;
  EmployeeName: string;
  PhoneNumber: string;
  Gender: number;
  EmployeeEmail: string;
  Salary: number;
  PositionID: number;
  DepartmentID: number;
  CreatedAt: string; // ISO 8601 date string
  UpdatedAt: string; // ISO 8601 date string
}

export interface GetResquest {
  success: boolean;
  data: any;
  [key: string]: any;
}

export interface FetchResponse {
  success: boolean;
  data: any[];
}
