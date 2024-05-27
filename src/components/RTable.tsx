/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatDate, formatPrice } from "../utils/utils";
import { TableField } from "../utils/interfaces";

interface Props {
  fields: TableField[];
  fetchFunction: any;
}

function RTable({ fetchFunction, fields }: Props) {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response: {
        success: boolean;
        data: any[];
      } = await fetchFunction();
      setData(response.data);

      setLoading(false);
    };
    fetchData();
  }, []);

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

  return (
    <div className="w-full">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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

export default RTable;
