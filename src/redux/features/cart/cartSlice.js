import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import api from "../../../apis/axios";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/cart/items");
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },

    resetCartState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getCart.fulfilled,
        (state, action) => {
          state.loading = false;
          state.cartItems = action.payload;
        }
      )

      .addCase(
        getCart.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearCart,
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;