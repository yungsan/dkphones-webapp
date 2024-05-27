import { useEffect, useState } from "react";
import { FetchResponse, InputField, Widget } from "../../utils/interfaces";
import { FaUserTie } from "react-icons/fa";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { BRAND_TABLE_FIELDS } from "../../utils/definitions";
import MyModal from "../../components/Modal/Modal";
import { DBTable, createFromTable, fetchFromTable } from "../../utils/api";

const HEADING = "Danh sách thương hiệu";
const TABLE = DBTable.Brands;

function Brands() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [BrandName, setBrandName] = useState("");
  const [SupplierList, setSupplierList] = useState<any[]>([]);
  const [SupplierID, setSupplierID] = useState(1);

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      const s: FetchResponse = await fetchFromTable(DBTable.Suppliers);

      setSupplierList(s.data);

      setFetching(false);
    };
    fetchData();
  }, []);

  const widgets: Widget[] = [
    {
      title: "Thêm thương hiệu",
      span: "Thêm một thương hiệu!",
      icon: FaUserTie,
      onClick: () => setOpen(true),
    },
  ];

  const inputFields: InputField[] = [
    {
      label: "Tên thương hiệu",
      classes: "w-full",
      type: "text",
      name: "BrandName",
      value: BrandName,
      setValue: setBrandName,
    },
    {
      label: "Phòng ban",
      classes: "w-full",
      type: "radio",
      name: "SupplierID",
      value: SupplierID,
      setValue: setSupplierID,
      options: SupplierList.map((d) => {
        return {
          label: d.SupplierName,
          value: d.SupplierID,
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
      SupplierID,
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
          heading="Thêm thương hiệu"
        />
      )}
      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>
      <MyTable
        tableName={TABLE}
        fields={BRAND_TABLE_FIELDS}
        updateFields={inputFields}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default Brands;
