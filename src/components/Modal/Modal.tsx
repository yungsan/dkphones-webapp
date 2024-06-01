import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { InputField } from "../../utils/interfaces";
import UploadWidget from "../UploadWidget";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: "65%", xs: "90%" },
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const renderSelectCheckbox = (field: any) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-checkbox-label">SKUs</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={field.list?.value}
        onChange={field.list?.handle}
        input={<OutlinedInput label="Danh sách SKU" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {field.value.map((data: any, index: number) => (
          <MenuItem key={index} value={data.SKU}>
            <Checkbox checked={field.list?.value.indexOf(data.SKU) > -1} />
            <ListItemText primary={data.SKU} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
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
      onChange={(e) => field.setValue(e.target.value)}
      inputProps={{
        autoComplete: "new-password",
        form: {
          autocomplete: "off",
        },
      }}
    />
  );
};

function MyModal({
  openState,
  loading,
  inputFields,
  handleSubmit,
  heading,
}: {
  openState: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  loading: boolean;
  inputFields: InputField[];
  handleSubmit: () => void;
  heading: string;
}) {
  console.log(inputFields);

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
        <form
          autoComplete="off"
          id="modal-modal-description"
          className="mt-2 flex flex-wrap"
        >
          {inputFields.map((field, index) => {
            return (
              <div key={index} className={`my-2 lg:px-4 ${field.classes}`}>
                {field.type === "text" ||
                field.type === "password" ||
                field.type === "email"
                  ? renderTextField(field)
                  : field.type === "radio"
                  ? renderSelect(field)
                  : field.type === "checkbox"
                  ? renderSelectCheckbox(field)
                  : field.type === "file" && (
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

export default MyModal;
