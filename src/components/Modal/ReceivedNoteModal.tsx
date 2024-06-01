import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { InputField } from "../../utils/interfaces";
import UploadWidget from "../UploadWidget";

interface Props {
  openState: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  loading: boolean;
  inputFields: InputField[];
  handleSubmit: () => void;
  heading: string;
  productListState: {
    productList: { SKU: string; Quantity: number; Price: number }[];
    setProductList: Dispatch<
      SetStateAction<{ SKU: string; Quantity: number; Price: number }[]>
    >;
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: "65%", xs: "90%" },
  height: "fit",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const renderSelect = (field: any) => {
  return (
    <div className="">
      <Select
        className={field.classes}
        value={field.value}
        fullWidth
        onChange={(e) => field.setValue(e.target.value)}
      >
        {field.options !== undefined &&
          field.options.map((opt: any, index: number) => {
            return opt.value === field.value ? (
              <MenuItem key={index} value={opt.value} selected>
                {opt.label}
              </MenuItem>
            ) : (
              <MenuItem key={index} value={opt.value}>
                {opt.label}
              </MenuItem>
            );
          })}
      </Select>
    </div>
  );
};

function RNModal({
  openState,
  loading,
  inputFields,
  handleSubmit,
  heading,
  productListState,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const renderSelectCheckbox = (field: any) => {
    return (
      <Autocomplete
        disablePortal
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="combo-box-demo"
        options={field.value}
        renderInput={(params) => <TextField {...params} label="SKU" />}
      />
    );
  };

  const renderTextField = (field: any) => {
    return (
      <TextField
        type={field.type}
        label={field.label}
        variant="outlined"
        className={field.classes}
        fullWidth
        name={field.name}
        value={field.value}
        onChange={(e) => {
          if (field.name === "Quantity") {
            setQuantity(e.target.value);
          }
          if (field.name === "Price") {
            setPrice(e.target.value);
          }
          field.setValue(e.target.value);
        }}
        inputProps={{
          autoComplete: "new-password",
          form: {
            autocomplete: "off",
          },
        }}
      />
    );
  };

  const createBtn = () => {
    return (
      <Button
        type="button"
        className="h-full"
        fullWidth
        variant="contained"
        onClick={() => {
          const _ = {
            SKU: inputValue,
            Quantity: quantity,
            Price: price,
          };

          productListState.setProductList((p) => [...p, _]);
        }}
      >
        Thêm sản phẩm
      </Button>
    );
  };

  return (
    <Modal
      open={openState.open}
      onClose={() => openState.setOpen((p) => !p)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h1"
          className="text-center uppercase"
        >
          {heading}
        </Typography>
        <div className="w-full flex flex-wrap">
          <div className="w-full">
            {productListState.productList.map((value, index) => (
              <ButtonGroup
                key={index}
                variant="text"
                aria-label="Basic button group"
                fullWidth
              >
                <Button>{value.SKU}</Button>
                <Button>{value.Quantity}</Button>
                <Button>{value.Price}</Button>
              </ButtonGroup>
            ))}
          </div>
        </div>
        <form
          autoComplete="off"
          id="modal-modal-description"
          className="mt-2 flex flex-wrap"
        >
          {inputFields.map((field, index) => {
            return (
              <div key={index} className={`my-2 px-4 ${field.classes}`}>
                {field.type === "text" ? (
                  renderTextField(field)
                ) : field.type === "radio" ? (
                  renderSelect(field)
                ) : field.type === "checkbox" ? (
                  renderSelectCheckbox(field)
                ) : field.type === "btn" ? (
                  createBtn()
                ) : (
                  <UploadWidget setURL={field.setValue} URL={field.value} />
                )}
              </div>
            );
          })}
        </form>
        <button
          onClick={() => handleSubmit()}
          className={clsx(
            "bg-primary-500 text-white px-4 py-2 w-full rounded-md",
            { "bg-white border-primary-500 border": loading }
          )}
        >
          {loading ? <CircularProgress size={20} /> : heading}
        </button>
      </Box>
    </Modal>
  );
}

export default RNModal;
