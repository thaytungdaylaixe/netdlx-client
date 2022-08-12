import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "../api";

export const createSanhoc = createAsyncThunk(
  "datadlx/createSanhoc",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await postData("/dlx/createdata", formValue);

      toast.success("Tour Added Successfully");
      navigate("/daylaixe/add");
      return response.data;
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

      // console.log("response", response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const dlx = createAsyncThunk(
  "datadlx/dlx",
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const response = await postData("/dlx/getall", formValue);

      return response.data;
    } catch (err) {
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
    setSanhoc: (state, action) => {
      state.sanhoc = action.payload;
    },
    pushSanhoc: (state, action) => {
      state.sanhoc = [...state.sanhoc, action.payload];
    },
  },
  extraReducers: {
    [createSanhoc.pending]: (state, action) => {
      state.loading = true;
    },
    [createSanhoc.fulfilled]: (state, action) => {
      state.loading = false;
      state.sanhoc = [...state.sanhoc, action.payload];
    },
    [createSanhoc.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getAllByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.sanhoc = action.payload.sanhoc;
    },
    [getAllByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setData } = dlxSlice.actions;

export default dlxSlice.reducer;
