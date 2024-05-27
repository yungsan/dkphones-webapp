import { useState } from "react";
import { InputField, Widget } from "../../utils/interfaces";
import { FaUserTie } from "react-icons/fa";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { POSITION_TABLE_FIELDS } from "../../utils/definitions";
import MyModal from "../../components/Modal/Modal";
import { DBTable, createFromTable } from "../../utils/api";

const HEADING = "Danh sách nhà cung cấp";

function Positions() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [PositionName, setPositionName] = useState("");

  const widgets: Widget[] = [
    {
      title: "Thêm vị trí",
      span: "Tạo một vị trí mới!",
      icon: FaUserTie,
      onClick: () => setOpen(true),
    },
  ];

  const inputFields: InputField[] = [
    {
      label: "Tên chức vụ",
      classes: "w-full",
      type: "text",
      name: "PositionName",
      value: PositionName,
      setValue: setPositionName,
    },
  ];

  const handleClose = () => {
    setPositionName("");
    setOpen(false);
  };

  const handleCreate = () => {
    setLoading(true);

    const data = {
      PositionName,
    };

    const _create = async () => await createFromTable(DBTable.Positions, data);
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
        heading="Tạo chức vụ mới"
      />

      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>

      <MyTable
        tableName={DBTable.Positions}
        fields={POSITION_TABLE_FIELDS}
        updateFields={inputFields}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default Positions;
