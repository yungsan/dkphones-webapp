import { useState } from "react";
import { InputField, Widget } from "../../utils/interfaces";
import { FaHouseUser } from "react-icons/fa6";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { DBTable, createFromTable } from "../../utils/api";
import { STATUS_TABLE_FIELDS } from "../../utils/definitions";
import MyModal from "../../components/Modal/Modal";

const HEADING = "Danh sách trạng thái đơn hàng";

function Statuses() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [StatusName, setStatusName] = useState("");

  const widgets: Widget[] = [
    {
      title: "Thêm trạng thái",
      span: "Tạo một trạng thái đơn hàng mới!",
      icon: FaHouseUser,
      onClick: () => setOpen(true),
    },
  ];

  const inputFields: InputField[] = [
    {
      label: "Tên trạng thái",
      classes: "w-full",
      type: "text",
      name: "StatusName",
      value: StatusName,
      setValue: setStatusName,
    },
  ];

  const handleClose = () => {
    setStatusName("");
    setOpen(false);
  };

  const handleCreate = () => {
    setLoading(true);

    const data = {
      StatusName: StatusName,
    };

    const _create = async () => await createFromTable(DBTable.Statuses, data);
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
          setOpen: setOpen,
        }}
        loading={loading}
        inputFields={inputFields}
        handleSubmit={handleCreate}
        heading="Tạo trạng thái mới"
      />
      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>
      <MyTable
        tableName={DBTable.Statuses}
        fields={STATUS_TABLE_FIELDS}
        isUpdateState={{ isUpdate, setIsUpdate }}
        updateFields={inputFields}
      />
    </div>
  );
}

export default Statuses;
