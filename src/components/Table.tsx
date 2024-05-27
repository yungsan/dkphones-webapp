/* eslint-disable react-hooks/exhaustive-deps */
import { GoTrash } from "react-icons/go";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatDate, formatPrice } from "../utils/utils";
import MyModal from "./Modal/Modal";
import { GetResquest, InputField, TableField } from "../utils/interfaces";
import {
  DBTable,
  deleteFromTable,
  fetchFromTable,
  updateFromTable,
} from "../utils/api";

interface Props {
  tableName: DBTable;
  fields: TableField[];
  updateFields: InputField[];
  isUpdateState: {
    isUpdate: boolean;
    setIsUpdate: Dispatch<SetStateAction<boolean>>;
  };
  readonly?: boolean;
  dataFrom?: any;
}

function MyTable({
  tableName,
  fields,
  updateFields,
  isUpdateState,
  readonly,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<any[]>([]);
  const [targetId, setTargetId] = useState<{
    name: string;
    value: any;
  }>({
    name: fields[0].name,
    value: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response: {
        success: boolean;
        data: any[];
      } = await fetchFromTable(tableName);
      setData(response.data);
      console.log(response);

      setLoading(false);
    };
    fetchData();
  }, [isUpdateState.isUpdate]);

  const deleteRow = (row: any) => {
    if (updateFields.length === 0 || readonly) return;

    const _delete = async () =>
      await deleteFromTable(tableName, {
        name: fields[0].name,
        value: row[fields[0].name],
      });
    _delete().then(() => isUpdateState.setIsUpdate((p) => !p));
  };

  const updateRow = (id: any) => {
    if (updateFields.length === 0 || readonly) return;
    const _getOne = async () =>
      await fetchFromTable(tableName, {
        [fields[0].name]: id,
      });
    _getOne().then((response: GetResquest) => {
      updateFields?.map((field) => {
        if (field.type !== "password") {
          const _key: string = field.name;
          const _value = response.data[_key] ? response.data[_key] : "";
          field.setValue(_value);
        }
      });
      setTargetId({
        name: fields[0].name,
        value: response.data[fields[0].name],
      });

      setOpen(true);
    });
  };

  const renderByType = (key: string, value: any) => {
    const type = typeof value;

    let _value = value;
    if (key === "CreatedAt" || key === "UpdatedAt") _value = formatDate(value);
    if (key === "Price" || key === "Total") _value = formatPrice(_value);

    let _align:
      | "left"
      | "center"
      | "right"
      | "justify"
      | "inherit"
      | undefined = "left";

    if (key.slice(-2) !== "ID" && type == "number") _align = "left";

    if (key === "ImageURL") {
      return (
        <TableCell key={key + value} align={_align}>
          <div className="w-20 h-20">
            <img
              src={_value}
              alt="img"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </TableCell>
      );
    }

    return (
      <TableCell key={key + value} align={_align}>
        {_value}
      </TableCell>
    );
  };

  const handleUpdate = () => {
    const _update = async () =>
      await updateFromTable(tableName, targetId, updateFields);
    _update().then((r) => {
      console.log(r);

      setOpen(false);
      isUpdateState.setIsUpdate((p) => !p);
    });
  };

  return (
    <div className="w-full">
      <MyModal
        openState={{
          open,
          setOpen,
        }}
        loading={loading}
        inputFields={updateFields}
        handleSubmit={handleUpdate}
        heading="Cập nhật thông tin"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {fields.map(
                (field, index) =>
                  field.show && <TableCell key={index}>{field.label}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              data.map((entity, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <div className="flex gap-x-4">
                      <GoTrash
                        className="cursor-pointer"
                        onClick={() => deleteRow(entity)}
                        size={20}
                      />
                      <MdOutlineRemoveRedEye
                        className="cursor-pointer"
                        onClick={() => updateRow(entity[fields[0].name])}
                        size={20}
                      />
                    </div>
                  </TableCell>
                  {fields.map(
                    (field) =>
                      field.show && renderByType(field.name, entity[field.name])
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyTable;
