import { TextField } from "@mui/material";

const Input = (props) => {
  const { name, type, value, label, error, autoFocus, size, inputChange } =
    props;

  const handleOnChange = async (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    inputChange({ name, value });
  };

  return (
    <TextField
      error={error && !!error}
      helperText={error && error}
      margin="normal"
      size={size}
      required
      fullWidth
      id={name}
      label={label}
      name={name}
      type={type}
      autoComplete={name}
      value={value}
      autoFocus={autoFocus}
      onChange={handleOnChange}
    />
  );
};

export default Input;
