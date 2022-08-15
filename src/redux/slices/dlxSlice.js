import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "../api";

// export const updateData = createAsyncThunk('data/update', async (params, {dispatch}) => {
//   const result = await sdkClient.update({ params })
//   dispatch(getData())
//   return result
// })

export const createData = createAsyncThunk(
  "datadlx/createSanhoc",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const { name, label } = formValue;
      const response = await postData("/dlx/createdata", formValue);

      const { data } = response;

      toast.success("Thêm " + label + " thành công.");
      navigate("/daylaixe/add");
      return { name, data };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllByUser = createAsyncThunk(
  "datadlx/getAllByUser",
  async (idUser, { rejectWithValue }) => {
    try {
      const response = await postData("/dlx/getall", { idUser });

      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteByUser = createAsyncThunk(
  "datadlx/deleteByUser",
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

const dlxSlice = createSlice({
  name: "datadlx",
  initialState: {
    sanhoc: [],
    nguon: [],
    truongthi: [],
    khoathi: [],
    error: "",
    loading: false,
  },
  reducers: {
    setDataDlx: (state, action) => {
      state[action.payload.name] = action.payload;
    },
    pushDataDlx: (state, action) => {
      state[action.payload.name] = [
        ...state[action.payload.name],
        action.payload,
      ];
    },
    deleteDataDlx: (state, action) => {
      state[action.payload.name] = state[action.payload.name].filter(
        (data) => data._id !== action.payload._id
      );
    },
  },
  extraReducers: {
    [createData.pending]: (state, action) => {
      state.loading = true;
    },
    [createData.fulfilled]: (state, action) => {
      state.loading = false;
      state[action.payload.name] = [
        ...state[action.payload.name],
        action.payload.data,
      ];
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
      state.sanhoc = action.payload.sanhoc;
      state.nguon = action.payload.nguon;
      state.truongthi = action.payload.truongthi;
      state.khoathi = action.payload.khoathi;
    },
    [getAllByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { deleteDataDlx } = dlxSlice.actions;

export default dlxSlice.reducer;
