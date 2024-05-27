import { useEffect, useState } from "react";
import { FetchResponse, InputField, Widget } from "../../utils/interfaces";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { DBTable, createFromTable, fetchFromTable } from "../../utils/api";
import { PRODUCT_TABLE_FIELDS } from "../../utils/definitions";
import { FaUserTie } from "react-icons/fa";
import MyModal from "../../components/Modal/Modal";

const HEADING = "Danh sách sản phẩm";
const TABLE = DBTable.Products;

function Products() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ProductName, setProductName] = useState<any>("");
  const [Price, setPrice] = useState<number>(999000);
  const [ImageURL, setImageURL] = useState<any>(
    "https://cdn.vectorstock.com/i/1000v/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"
  );

  const [BrandID, setBrandID] = useState<any>(1);
  const [BrandList, setBrandList] = useState<any[]>([]);

  const [Color, setColor] = useState<any>("");
  const [Dimension, setDimension] = useState<any>("");
  const [Weight, setWeight] = useState<any>("");
  const [ScreenSize, setScreenSize] = useState<any>("");
  const [ScreenResolution, setScreenResolution] = useState<any>("");
  const [FrontCamera, setFrontCamera] = useState<any>("");
  const [RearCamera, setRearCamera] = useState<any>("");
  const [CPU, setCPU] = useState<any>("");
  const [RAM, setRAM] = useState<any>("");
  const [Power, setPower] = useState<any>("");
  const [ChargingPort, setChargingPort] = useState<any>("");
  const [SIM, setSIM] = useState<any>("");
  const [Bluetooth, setBluetooth] = useState<any>("");
  const [HeadphoneJack, setHeadphoneJack] = useState<any>("");
  const [Storage, setStorage] = useState<any>("");
  const [SKU, setSKU] = useState<any>("");
  const [Priority, setPriority] = useState<number>(0);
  const [Status, setStatus] = useState<number>(1);

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      const b: FetchResponse = await fetchFromTable(DBTable.Brands);
      setBrandList(b.data);
      setFetching(false);
    };
    fetchData();
  }, []);

  const widgets: Widget[] = [
    {
      title: "Thêm sản phẩm",
      span: "Tiếp nhận lô hàng vào kho.",
      icon: FaUserTie,
      onClick: () => setOpen(true),
    },
  ];

  const inputFields: InputField[] = [
    {
      label: "Tên sản phẩm",
      classes: "w-full",
      type: "text",
      name: "ProductName",
      value: ProductName,
      setValue: setProductName,
    },
    {
      label: "SKU",
      classes: "w-full",
      type: "text",
      name: "SKU",
      value: SKU,
      setValue: setSKU,
    },
    {
      label: "Đơn giá",
      classes: "w-1/2",
      type: "text",
      name: "Price",
      value: Price,
      setValue: setPrice,
    },
    {
      label: "Màu sắc",
      classes: "w-1/4",
      type: "text",
      name: "Color",
      value: Color,
      setValue: setColor,
    },
    {
      label: "Thương hiệu",
      classes: "w-1/4",
      type: "radio",
      name: "BrandID",
      value: BrandID,
      setValue: setBrandID,
      options: BrandList.map((d) => {
        return {
          label: d.BrandName,
          value: d.BrandID,
        };
      }),
    },
    {
      label: "Kích thước điện thoại (dài X rộng X dày)",
      classes: "w-1/2",
      type: "text",
      name: "Dimension",
      value: Dimension,
      setValue: setDimension,
    },
    {
      label: "Khối lượng",
      classes: "w-1/4",
      type: "text",
      name: "Weight",
      value: Weight,
      setValue: setWeight,
    },
    {
      label: "Độ phân giải",
      classes: "w-1/4",
      type: "text",
      name: "ScreenResolution",
      value: ScreenResolution,
      setValue: setScreenResolution,
    },
    {
      label: "Kích thước màn hình",
      classes: "w-1/2",
      type: "text",
      name: "ScreenSize",
      value: ScreenSize,
      setValue: setScreenSize,
    },
    {
      label: "Camera trước",
      classes: "w-1/2",
      type: "text",
      name: "FrontCamera",
      value: FrontCamera,
      setValue: setFrontCamera,
    },
    {
      label: "Camera sau",
      classes: "w-1/2",
      type: "text",
      name: "RearCamera",
      value: RearCamera,
      setValue: setRearCamera,
    },
    {
      label: "CPU",
      classes: "w-1/4",
      type: "text",
      name: "CPU",
      value: CPU,
      setValue: setCPU,
    },
    {
      label: "RAM",
      classes: "w-1/4",
      type: "text",
      name: "RAM",
      value: RAM,
      setValue: setRAM,
    },
    {
      label: "Dung lượng Pin",
      classes: "w-1/4",
      type: "text",
      name: "Power",
      value: Power,
      setValue: setPower,
    },
    {
      label: "Cổng sạc",
      classes: "w-1/4",
      type: "text",
      name: "ChargingPort",
      value: ChargingPort,
      setValue: setChargingPort,
    },
    {
      label: "SIM",
      classes: "w-1/4",
      type: "text",
      name: "SIM",
      value: SIM,
      setValue: setSIM,
    },
    {
      label: "Jack tai nghe",
      classes: "w-1/4",
      type: "text",
      name: "HeadphoneJack",
      value: HeadphoneJack,
      setValue: setHeadphoneJack,
    },
    {
      label: "Bluetooth",
      classes: "w-1/4",
      type: "text",
      name: "Bluetooth",
      value: Bluetooth,
      setValue: setBluetooth,
    },
    {
      label: "Bộ nhớ",
      classes: "w-1/4",
      type: "text",
      name: "Storage",
      value: Storage,
      setValue: setStorage,
    },
    {
      label: "Độ ưu tiên",
      classes: "w-1/4",
      type: "text",
      name: "Priority",
      value: Priority,
      setValue: setPriority,
    },
    {
      label: "Trạng thái",
      classes: "w-1/4",
      type: "radio",
      name: "Status",
      value: Status,
      setValue: setStatus,
      options: [
        {
          label: "Mở bán",
          value: 1,
        },
        {
          label: "Không bán",
          value: 0,
        },
      ],
    },
    {
      label: "Thumbnail",
      classes: "w-full",
      type: "file",
      name: "ImageURL",
      value: ImageURL,
      setValue: setImageURL,
    },
  ];

  const handleClose = () => {
    // setBrandName("");
    setOpen(false);
  };

  const handleCreate = () => {
    setLoading(true);
    const data = {
      ProductName,
      SKU,
      Price,
      ImageURL,
      BrandID,
      Color,
      Dimension,
      Weight,
      ScreenSize,
      ScreenResolution,
      FrontCamera,
      RearCamera,
      CPU,
      RAM,
      Power,
      ChargingPort,
      SIM,
      Bluetooth,
      HeadphoneJack,
      Storage,
      Priority,
      Status,
    };
    console.log(data);

    const _create = async () => await createFromTable(DBTable.Products, data);
    _create().then((res) => {
      console.log(res);
      setLoading(false);
      setIsUpdate((p) => !p);
    });
  };

  return (
    <div className="">
      <div
        className={clsx("w-full flex flex-wrap gap-x-4 mb-12", {
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
          heading="Thêm sản phẩm"
        />
      )}
      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>
      <MyTable
        tableName={TABLE}
        updateFields={inputFields}
        fields={PRODUCT_TABLE_FIELDS}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default Products;
