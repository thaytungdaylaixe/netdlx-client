export const trimText = (text) => {
  return text.replace(/^\s+|\s+$/gm, "").replace(/\s\s+/g, " ");
};

function validateNumber(sdt) {
  const re = /^[0-9]*$/gm;
  return re.test(sdt);
}

export const checkTextEmpty = (text) => {
  if (text === "") return "Bạn chưa nhập dữ liệu.";
  return null;
};

export const Validate = (formValue) => {
  let errors = {};

  for (const [key, value] of Object.entries(formValue)) {
    delete errors[key];
    let check = Valid(key, value);
    if (check) errors[key] = check;
  }

  return errors;
};

export const Valid = (name, value) => {
  value = trimText(value.toString());

  switch (name) {
    case "sdt":
      if (value === "") return "Bạn chưa nhập số điện thoại.";
      if (!validateNumber(value)) return "Số điện thoại không đúng.";
      if (value.length < 10) return "Số điện thoại không đủ.";
      return null;

    case "sogiohoc":
      if (value === "") return "Bạn chưa nhập số giờ học.";
      if (!validateNumber(value)) return "Số giờ học không đúng.";
      return null;

    case "hovaten":
      if (value === "") return "Bạn chưa nhập họ và tên.";
      if (value.length < 4) return "Họ và tên phải lớn hơn 4 ký tự.";
      return null;

    case "password":
      if (value === "") return "Bạn chưa nhập mật khẩu.";
      if (value.length < 6) return "Mật khẩu phải hơn 6 ký tự.";
      return null;

    case "cf_password":
      if (value === "") return "Bạn chưa nhập mật khẩu.";
      return null;

    case "role":
      if (value === "") return "Mời bạn chọn.";

    // eslint-disable-next-line no-fallthrough
    default:
      return null;
  }
};

export const ValidDangky = (data) => {
  const errors = {};
  let countErrors = 0;

  if (data.sdt === "") {
    errors.sdt = "Bạn chưa nhập số điện thoại.";
    countErrors += 1;
  }
  if (!validateNumber(data.sdt)) {
    errors.sdt = "Số điện thoại không đúng.";
    countErrors += 1;
  }

  if (data.hovaten === "") {
    errors.hovaten = "Bạn chưa nhập họ và tên.";
    countErrors += 1;
  } else if (data.hovaten.length < 4) {
    errors.hovaten = "Họ và tên phải lớn hơn 4 ký tự.";
    countErrors += 1;
  }

  if (data.password === "") {
    errors.password = "Bạn chưa nhập mật khẩu.";
    countErrors += 1;
  } else if (data.password.length < 6) {
    errors.password = "Mật khẩu phải hơn 6 ký tự.";
    countErrors += 1;
  } else if (data.password !== data.cf_password) {
    errors.cf_password = "Mật khẩu không khớp.";
    countErrors += 1;
  }

  if (data.cf_password === "") {
    errors.cf_password = "Bạn chưa nhập lại mật khẩu.";
    countErrors += 1;
  } else if (data.password !== data.cf_password) {
    errors.cf_password = "Mật khẩu không khớp.";
    countErrors += 1;
  }

  if (data.role === "") {
    errors.role = "Mời bạn chọn.";
    countErrors += 1;
  }

  return { errors, countErrors };
};

export const ValidDangNhap = (data) => {
  const errors = {};
  let countErrors = 0;

  if (data.sdt === "") {
    errors.sdt = "Bạn chưa nhập số điện thoại.";
    countErrors += 1;
  }
  if (data.sdt.length < 10) {
    errors.sdt = "Số điện thoại không đủ.";
    countErrors += 1;
  }
  if (!validateNumber(data.sdt)) {
    errors.sdt = "Số điện thoại không đúng.";
    countErrors += 1;
  }

  if (data.password === "") {
    errors.password = "Bạn chưa nhập mật khẩu.";
    countErrors += 1;
  } else if (data.password.length < 6) {
    errors.password = "Mật khẩu phải hơn 6 ký tự.";
    countErrors += 1;
  }

  return { errors, countErrors };
};
