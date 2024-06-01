import { useContext, useEffect, useState } from "react";
import { FetchResponse, InputField, Widget } from "../../utils/interfaces";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import {
  DBTable,
  createFromTable,
  fetchFromTable,
  searchSKUBySupplier,
} from "../../utils/api";
import { RECEIVED_NOTES_TABLE_FIELDS } from "../../utils/definitions";
import { FaUserTie } from "react-icons/fa";
import { CurrentUserContext } from "../../App";
import RNModal from "../../components/Modal/ReceivedNoteModal";

const HEADING = "Danh sách kho hàng";
const TABLE = DBTable.ReceivedNotes;

function ReceivedNotes() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [_fetching, _setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const [SupplierID, setSupplierID] = useState(1);
  const [SupplierList, setSupplierList] = useState<any[]>([]);
  const [WarehouseID, setWarehouseID] = useState(1);
  const [WarehouseList, setWarehouseList] = useState<any[]>([]);

  const [SKUAndProductIDList, setSKUAndProductIDList] = useState<
    { SKU: string; ProductID: any }[]
  >([]);

  const [Quantity, setQuantity] = useState<number>(0);
  const [Price, setPrice] = useState<number>(0);
  const [productList, setProductList] = useState<
    { SKU: string; Quantity: number; Price: number }[]
  >([]);

  const userContext = useContext(CurrentUserContext);

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      const s: FetchResponse = await fetchFromTable(DBTable.Suppliers);
      const w: FetchResponse = await fetchFromTable(DBTable.Warehouses);

      setSupplierList(s.data);
      setWarehouseList(w.data);

      setFetching(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    _setFetching(true);

    const fetchData = async () => {
      const p: FetchResponse = await searchSKUBySupplier(SupplierID);
      const SKUs = p.data.map((d) => {
        return {
          SKU: d.SKU,
          ProductID: d.ProductID,
          label: d.SKU,
        };
      });
      setSKUAndProductIDList(SKUs);

      _setFetching(false);
    };
    fetchData();
  }, [SupplierID]);

  const widgets: Widget[] = [
    {
      title: "Lập phiếu nhập kho",
      span: "Tiếp nhận lô hàng vào kho.",
      icon: FaUserTie,
      onClick: () => setOpen(true),
    },
  ];

  const handleGetSKUAndQuantity = (_: any) => {
    console.log(_);
  };

  const inputFields: InputField[] = [
    {
      label: "Kho hàng",
      classes: "w-full",
      type: "radio",
      name: "WarehouseID",
      value: WarehouseID,
      setValue: setWarehouseID,
      show: true,
      options: WarehouseList.map((d) => {
        return {
          label: d.WarehouseName,
          value: d.WarehouseID,
        };
      }),
    },
    {
      label: "Nhà cung cấp",
      classes: "w-full",
      type: "radio",
      name: "SupplierID",
      value: SupplierID,
      setValue: setSupplierID,
      show: true,
      options: SupplierList.map((d) => {
        return {
          label: d.SupplierName,
          value: d.SupplierID,
        };
      }),
    },
    {
      label: "SKU",
      classes: "lg:w-1/2 w-full",
      type: "checkbox",
      name: "SKUList",
      value: SKUAndProductIDList,
      setValue: () => setSKUAndProductIDList,
    },
    {
      label: "Số lượng",
      classes: "lg:w-1/4 w-full",
      type: "text",
      name: "Quantity",
      value: Quantity,
      setValue: setQuantity,
    },
    {
      label: "Giá nhập",
      classes: "lg:w-1/4 w-full",
      type: "text",
      name: "Price",
      value: Price,
      setValue: setPrice,
    },
    {
      classes: "w-full",
      type: "btn",
      name: "getData",
      value: null,
      setValue: handleGetSKUAndQuantity,
    },
  ];

  const handleClose = () => {
    // setBrandName("");
    setOpen(false);
  };

  const handleCreate = () => {
    setLoading(true);

    setLoading(false);
    const data = {
      SupplierID,
      EmployeeID: userContext?.EmployeeID,
      WarehouseID,
      BatcheData: productList,
    };

    const _create = async () => await createFromTable(TABLE, data);
    _create().then((r) => {
      console.log(r);
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
      {!fetching && !_fetching && (
        <RNModal
          openState={{
            open: open,
            setOpen: handleClose,
          }}
          inputFields={inputFields}
          handleSubmit={handleCreate}
          loading={loading}
          heading="Lập phiếu nhập kho"
          productListState={{
            productList,
            setProductList,
          }}
        />
      )}
      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>
      <MyTable
        tableName={TABLE}
        updateFields={inputFields}
        fields={RECEIVED_NOTES_TABLE_FIELDS}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default ReceivedNotes;
