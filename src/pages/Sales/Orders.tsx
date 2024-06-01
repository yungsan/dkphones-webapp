import { useEffect, useState } from "react";
import { FetchResponse, InputField, Widget } from "../../utils/interfaces";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { ORDER_TABLE_FIELDS } from "../../utils/definitions";
import MyModal from "../../components/Modal/Modal";
import { DBTable, createFromTable, fetchFromTable } from "../../utils/api";

const HEADING = "Danh sách đơn hàng cần xử lý";
const TABLE = DBTable.Orders;

function Orders() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [BrandName, setBrandName] = useState("");
  const [StatusList, setStatusListList] = useState<any[]>([]);
  const [StatusID, setStatusID] = useState(1);

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      const s: FetchResponse = await fetchFromTable(DBTable.Statuses);

      setStatusListList(s.data);

      setFetching(false);
    };
    fetchData();
  }, []);

  const widgets: Widget[] = [];

  const inputFields: InputField[] = [
    {
      label: "Mã hoá đơn",
      classes: "w-full",
      type: "text",
      name: "OrderID",
      value: BrandName,
      setValue: setBrandName,
    },
    {
      label: "Trạng thái",
      classes: "w-full",
      type: "radio",
      name: "StatusID",
      value: StatusID,
      setValue: setStatusID,
      options: StatusList.map((d) => {
        return {
          label: d.StatusName,
          value: d.StatusID,
        };
      }),
    },
  ];

  const handleClose = () => {
    setBrandName("");
    setOpen(false);
  };

  const handleCreate = () => {
    setLoading(true);

    const data = {
      BrandName,
      SupplierID: StatusID,
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

      {!fetching && (
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
      )}
      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>
      <MyTable
        tableName={TABLE}
        fields={ORDER_TABLE_FIELDS}
        updateFields={inputFields}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default Orders;
