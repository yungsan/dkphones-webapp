import { useState } from "react";
import { InputField, Widget } from "../../utils/interfaces";
import { FaUserTie } from "react-icons/fa";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { SUPPLIER_TABLE_FIELDS } from "../../utils/definitions";
import MyModal from "../../components/Modal/Modal";
import { DBTable, createFromTable } from "../../utils/api";

function Suppliers() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [SupplierName, setSupplierName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");

  const HEADING = "Danh sách nhà cung cấp";

  const widgets: Widget[] = [
    {
      title: "Thêm nhà cung cấp",
      span: "Tạo một nhà cung cấp mới!",
      icon: FaUserTie,
      onClick: () => setOpen(true),
    },
  ];

  const inputFields: InputField[] = [
    {
      label: "Tên nhà cung cấp",
      classes: "w-full",
      type: "text",
      name: "SupplierName",
      value: SupplierName,
      setValue: setSupplierName,
    },
    {
      label: "Email liên lạc",
      classes: "w-full",
      type: "text",
      name: "Email",
      value: Email,
      setValue: setEmail,
    },
    {
      label: "Số điện thoại",
      classes: "w-full",
      type: "text",
      name: "PhoneNumber",
      value: PhoneNumber,
      setValue: setPhoneNumber,
    },
  ];

  const handleClose = () => {
    setSupplierName("");
    setOpen(false);
  };

  const handleCreate = () => {
    setLoading(true);

    const data = {
      SupplierName,
      Email,
      PhoneNumber,
    };

    const _create = async () => await createFromTable(DBTable.Suppliers, data);
    _create().then(() => {
      setLoading(false);
      setIsUpdate((p) => !p);
      handleClose();
    });
  };

  return (
    <div className="">
      <div
        className={clsx("flex flex-wrap gap-x-4 mb-12", {
          "justify-between": widgets.length >= 4,
        })}
      >
        {widgets.map((widget, index) => (
          <div key={index} className="w-1/4">
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
        heading="Tạo nhà cung cấp"
      />

      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>

      <MyTable
        tableName={DBTable.Suppliers}
        fields={SUPPLIER_TABLE_FIELDS}
        updateFields={inputFields}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default Suppliers;
