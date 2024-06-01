import { useState } from "react";
import { Widget } from "../../utils/interfaces";
import clsx from "clsx";
import PageWidget from "../../components/PageWidget";
import MyTable from "../../components/Table";
import { WAREHOUSE_TABLE_FIELDS } from "../../utils/definitions";
import { DBTable } from "../../utils/api";

const HEADING = "Danh sách kho hàng";
const TABLE = DBTable.Warehouses;

function WarehousesList() {
  const [isUpdate, setIsUpdate] = useState(false);

  const widgets: Widget[] = [];

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

      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>

      <MyTable
        tableName={TABLE}
        fields={WAREHOUSE_TABLE_FIELDS}
        updateFields={[]}
        isUpdateState={{ isUpdate, setIsUpdate }}
      />
    </div>
  );
}

export default WarehousesList;
