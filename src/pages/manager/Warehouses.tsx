import { useState } from "react";
import { InputField, Widget } from "../../utils/interfaces";
import { FaUserTie } from "react-icons/fa";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { WAREHOUSE_TABLE_FIELDS } from "../../utils/definitions";
import MyModal from "../../components/Modal/Modal";
import { DBTable, createFromTable } from "../../utils/api";

const HEADING = "Danh sách kho hàng";
const TABLE = DBTable.Warehouses;

function Warehouses() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [WarehouseName, setWarehouseName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");

  const widgets: Widget[] = [
    {
      title: "Thêm kho hàng",
      span: "Tạo một kho hàng!",
      icon: FaUserTie,
      onClick: () => setOpen(true),
    },
  ];

  const inputFields: InputField[] = [
    {
      label: "Tên kho",
      classes: "w-full",
      type: "text",
      name: "WarehouseName",
      value: WarehouseName,
      setValue: setWarehouseName,
    },
    {
      label: "Số điện thoại",
      classes: "w-full",
      type: "text",
      name: "PhoneNumber",
      value: PhoneNumber,
      setValue: setPhoneNumber,
    },
    {
      label: "Địa chỉ",
      classes: "w-full",
      type: "text",
      name: "Address",
      value: Address,
      setValue: setAddress,
    },
  ];

  const handleClose = () => {
    setWarehouseName("");
    setOpen(false);
  };

  const handleCreate = () => {
    setLoading(true);

    const data = {
      WarehouseName,
      PhoneNumber,
      Address,
    };

    const _create = async () => await createFromTable(TABLE, data);
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
          setOpen: handleClose,
        }}
        inputFields={inputFields}
        handleSubmit={handleCreate}
        loading={loading}
        heading="Tạo chức vụ mới"
      />

      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>

      <MyTable
        tableName={TABLE}
        fields={WAREHOUSE_TABLE_FIELDS}
        updateFields={inputFields}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default Warehouses;
