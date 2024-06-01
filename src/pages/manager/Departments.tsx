import { useState } from "react";
import { InputField, Widget } from "../../utils/interfaces";
import { FaHouseUser } from "react-icons/fa6";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { DBTable, createFromTable } from "../../utils/api";
import { DEPARTMENT_TABLE_FIELDS } from "../../utils/definitions";
import MyModal from "../../components/Modal/Modal";

const HEADING = "Danh sách phòng ban";

function Departments() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [DepartmentName, setDepartmentName] = useState("");

  const widgets: Widget[] = [
    {
      title: "Thêm phòng ban",
      span: "Tạo một phòng ban mới!",
      icon: FaHouseUser,
      onClick: () => setOpen(true),
    },
  ];

  const inputFields: InputField[] = [
    {
      label: "Tên phòng ban",
      classes: "w-full",
      type: "text",
      name: "DepartmentName",
      value: DepartmentName,
      setValue: setDepartmentName,
    },
  ];

  const handleClose = () => {
    setDepartmentName("");
    setOpen(false);
  };

  const handleCreate = () => {
    setLoading(true);

    const data = {
      DepartmentName,
    };

    const _create = async () =>
      await createFromTable(DBTable.Departments, data);
    _create().then(() => {
      setLoading(false);
      setIsUpdate((p) => !p);
      handleClose();
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
      <MyModal
        openState={{
          open: open,
          setOpen: setOpen,
        }}
        loading={loading}
        inputFields={inputFields}
        handleSubmit={handleCreate}
        heading="Thêm nhân viên mới"
      />
      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>
      <MyTable
        tableName={DBTable.Departments}
        updateFields={inputFields}
        fields={DEPARTMENT_TABLE_FIELDS}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default Departments;
