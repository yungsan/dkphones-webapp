import { TableField } from "../../utils/interfaces";
import { getShipper } from "../../utils/api";
import RTable from "../../components/RTable";

const HEADING = "Danh sách kho hàng";

const TABLE_FIELDS: TableField[] = [
  {
    name: "EmployeeName",
    show: true,
    label: "Họ tên",
  },
  {
    name: "PhoneNumber",
    show: true,
    label: "Số điện thoại",
  },
];

function ShipperList() {
  return (
    <div className="">
      <h1 className="my-4 border-l-[1rem] border-l-primary-500 rounded-r-3xl px-8 uppercase py-4 font-bold w-fit bg-white shadow-md">
        {HEADING}
      </h1>

      <RTable fields={TABLE_FIELDS} fetchFunction={getShipper} />
    </div>
  );
}

export default ShipperList;
