import { useEffect, useState } from "react";
import { FetchResponse, Widget } from "../../utils/interfaces";
import { FaUserTie } from "react-icons/fa";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import { DBTable, getDashboard } from "../../utils/api";
import { formatMoney, formatPrice } from "../../utils/utils";
import {
  BRAND_TABLE_FIELDS,
  SUPPLIER_TABLE_FIELDS,
} from "../../utils/definitions";
import MyTable from "../../components/Table";

const HEADING = "Danh sách thương hiệu";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      const d: FetchResponse = await getDashboard();
      console.log(d.data);

      setData(d.data);

      setFetching(false);
    };
    fetchData();
  }, []);

  const widgets: Widget[] = [
    {
      title: "Tổng doanh thu",
      span: "Doanh thu toàn thời gian",
      number: formatMoney(Number(data["Total"])),
      classses: "p-10 w-24 h-24",
    },
    {
      title: "Tổng chi phí nhập kho",
      span: "Chi phí nhập kho toàn thời gian",
      number: formatMoney(Number(data["Cost"])),
      classses: "p-10 w-24 h-24",
    },
    {
      title: "Lợi nhuận",
      span: "Lợi nhuận toàn thời gian",
      number: formatMoney(Number(data["Profit"])),
      classses: "p-10 w-24 h-24",
    },
  ];

  return (
    <div className="">
      <div
        className={clsx("flex flex-wrap mb-12", {
          "justify-between": widgets.length >= 4,
        })}
      >
        {widgets.map((widget, index) => (
          <div key={index} className="w-1/3">
            <PageWidget props={widget} />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full">
          <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
            Danh sách nhà cung cấp
          </h1>
          <MyTable
            tableName={DBTable.Suppliers}
            fields={SUPPLIER_TABLE_FIELDS}
            updateFields={[]}
            readonly={true}
            isUpdateState={{ isUpdate, setIsUpdate }}
          />
        </div>
        <div className="w-full my-8">
          <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
            Danh sách thương hiệu
          </h1>
          <MyTable
            tableName={DBTable.Brands}
            fields={BRAND_TABLE_FIELDS}
            updateFields={[]}
            readonly={true}
            isUpdateState={{ isUpdate, setIsUpdate }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
