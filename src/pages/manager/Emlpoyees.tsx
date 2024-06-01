import { FaUserPlus } from "react-icons/fa";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { MdGroups } from "react-icons/md";
import { FetchResponse, InputField, Widget } from "../../utils/interfaces";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { DBTable, fetchFromTable, register } from "../../utils/api";
import { EMPLOYEE_TABLE_FIELDS } from "../../utils/definitions";
import MyModal from "../../components/Modal/Modal";

const HEADING = "Danh sách nhân viên";

function Employees() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeEmail, setEmployeeEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [Gender, setGender] = useState("0");
  const [Salary, setSalary] = useState(0);
  const [Department, setDepartment] = useState(1);
  const [DepartmentList, setDepartmentList] = useState<any[]>([]);
  const [Position, setPosition] = useState(1);
  const [PositionList, setPositionList] = useState<any[]>([]);

  const widgets: Widget[] = [
    {
      title: "Thêm nhân viên",
      span: "Chào đón một thành viên mới!",
      icon: FaUserPlus,
      onClick: () => setOpen(true),
    },
    {
      title: "Tổng số nhân viên",
      icon: MdGroups,
      number: 50,
      span: "Parts of DKPhones family!",
    },
  ];

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      const d: FetchResponse = await fetchFromTable(DBTable.Departments);

      const p: FetchResponse = await fetchFromTable(DBTable.Positions);

      setDepartmentList(d.data);

      setPositionList(p.data);

      setFetching(false);
    };
    fetchData();
  }, []);

  const inputFields: InputField[] = [
    {
      label: "Họ và tên",
      classes: "w-full",
      type: "text",
      name: "EmployeeName",
      value: EmployeeName,
      setValue: setEmployeeName,
    },
    {
      label: "Địa chỉ Email",
      classes: "w-full",
      type: "email",
      name: "EmployeeEmail",
      value: EmployeeEmail,
      setValue: setEmployeeEmail,
    },
    {
      label: "Số điện thoại",
      classes: "w-2/3",
      type: "text",
      name: "PhoneNumber",
      value: PhoneNumber,
      setValue: setPhoneNumber,
    },
    {
      label: "Giới tính",
      classes: "w-1/3 pl-4",
      type: "radio",
      name: "Gender",
      value: Gender,
      setValue: setGender,
      options: [
        {
          label: "Nam",
          value: 0,
        },
        {
          label: "Nữ",
          value: 1,
        },
      ],
    },
    {
      label: "Phòng ban",
      classes: "w-1/2",
      type: "radio",
      name: "DepartmentID",
      value: Department,
      setValue: setDepartment,
      options: DepartmentList.map((d) => {
        return {
          label: d.DepartmentName,
          value: d.DepartmentID,
        };
      }),
    },
    {
      label: "Chức vụ",
      classes: "w-1/2 pl-4",
      type: "radio",
      name: "PositionID",
      value: Position,
      setValue: setPosition,
      options: PositionList.map((d) => {
        return {
          label: d.PositionName,
          value: d.PositionID,
        };
      }),
    },
    {
      label: "Lương cứng",
      classes: "w-full",
      type: "text",
      name: "Salary",
      value: Salary,
      setValue: setSalary,
    },
    {
      label: "Mật khẩu",
      classes: "w-full",
      type: "password",
      name: "Password",
      value: Password,
      setValue: setPassword,
    },
  ];

  const handleClose = () => {
    setEmployeeName("");
    setEmployeeEmail("");
    setPhoneNumber("");
    setPassword("");
    setGender("0");
    setDepartment(1);
    setOpen(false);
  };

  const handleRegister = () => {
    setLoading(true);

    const data = {
      EmployeeName,
      EmployeeEmail,
      PhoneNumber,
      Salary,
      Password,
      Gender: Number(Gender),
      DepartmentID: Department,
      PositionID: Position,
    };

    console.log(data);

    const _login = async () => await register(data);
    _login()
      .then(() => {
        setLoading(false);
        setIsUpdate((p) => !p);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <div
        className={clsx("flex flex-wrap mb-12 mt-12 lg:mt-0", {
          "justify-between": widgets.length >= 4,
        })}
      >
        {widgets.map((widget, index) => (
          <div key={index} className="lg:w-1/3 w-full mb-4 lg:mb-0">
            <PageWidget props={widget} />
          </div>
        ))}
      </div>
      {!fetching && (
        <MyModal
          openState={{
            open: open,
            setOpen: handleClose,
          }}
          inputFields={inputFields}
          handleSubmit={handleRegister}
          loading={loading}
          heading="Thêm phòng ban"
        />
      )}
      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>
      <MyTable
        tableName={DBTable.Employees}
        updateFields={inputFields}
        fields={EMPLOYEE_TABLE_FIELDS}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default Employees;
