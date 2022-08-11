import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const Select = (props) => {
  const { name, options, label, error, size, inputChange } = props;

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  return (
    <Autocomplete
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue);

        inputChange({
          name,
          value: (newValue && newValue.key) || "",
        });
      }}
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      getOptionLabel={(options) => options.value}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error && !!error}
          helperText={error && error}
          label={label}
          margin="normal"
          size={size}
          fullWidth
        />
      )}
    />
  );
};

export default Select;
