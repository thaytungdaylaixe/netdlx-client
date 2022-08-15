import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "../api";

export const updateData = createAsyncThunk(
  "hv/updateData",
  async ({ formValue, navigate, toast }, { dispatch, rejectWithValue }) => {
    try {
      const { name, label, editData } = formValue;

      const response = await postData("/dlx/updatedata", formValue);

      const { data } = response;

      await dispatch(deleteDataDlx(formValue));
      await dispatch(pushDataDlx({ ...data, name }));

      toast.success("Sửa " + label + " thành công.");
      return { name, editData, data };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const createData = createAsyncThunk(
  "hv/createData",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const name = "hocvien";
      const response = await postData("/dlx/hocvien/create", {
        name,
        formValue,
      });
      const { data } = response;

      toast.success("Thêm học viên thành công.");
      navigate("/daylaixe/hocvien");

      return { data };
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllByUser = createAsyncThunk(
  "hv/getAllByUser",
  async (idUser, { rejectWithValue }) => {
    try {
      const response = await postData("/dlx/hocvien/getall", { idUser });

      console.log(response.data);

      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteByUser = createAsyncThunk(
  "hv/deleteByUser",
  async ({ formValue, navigate, toast }, { dispatch, rejectWithValue }) => {
    try {
      await postData("/dlx/deletedata", formValue);

      await dispatch(deleteDataDlx(formValue));

      toast.success("Xóa " + formValue.value + " thành công.");

      return;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const hvSlice = createSlice({
  name: "hv",
  initialState: {
    hv: [],
    hv_error: "",
    hv_loading: false,
  },
  reducers: {
    setDataDlx: (state, action) => {
      state[action.payload.name] = action.payload;
    },
    pushDataDlx: (state, action) => {
      state.hv = [...state.hv, action.payload.data];
    },
    deleteDataDlx: (state, action) => {
      console.log(action.payload);
      state.hv = state.hv.filter((data) => data._id !== action.payload._id);
    },
  },
  extraReducers: {
    [createData.pending]: (state, action) => {
      state.loading = true;
    },
    [createData.fulfilled]: (state, action) => {
      state.loading = false;
      state.hv = [...state.hv, action.payload.data];
    },
    [createData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getAllByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.hv = action.payload;
    },
    [getAllByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { pushDataDlx, deleteDataDlx } = hvSlice.actions;

export default hvSlice.reducer;
