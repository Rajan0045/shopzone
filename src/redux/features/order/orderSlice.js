import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import api from "../../../apis/axios";

export const getMyOrders = createAsyncThunk("orders/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/order/list");
      return response.data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data
          ?.message ||
        "Failed to fetch orders"
      );
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        getMyOrders.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getMyOrders.fulfilled,
        (state, action) => {
          state.loading = false;
          state.orders =
            action.payload;
        }
      )

      .addCase(
        getMyOrders.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );
  },
});

export const {
  resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;