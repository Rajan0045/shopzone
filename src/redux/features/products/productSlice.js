import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Constants } from "../../../apis/constant";

/* FETCH PRODUCTS */

export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",
    async (
      {
        limit = 12,
        skip = 1,
        search = null,
      },
      thunkAPI
    ) => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${Constants.development}/products/list`,
          {
            params: {
              limit,
              skip,
              search,
            },
            headers: {
              Authorization: `Bearer ${user?.token || ""
                }`,
            }
          }
        );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
          "Failed to fetch products"
        );
      }
    }
  );

/* SLICE */

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    error: null,

    total: 0,
    limit: 12,
    currentPage: 1,
    search: "",
  },

  reducers: {
    setCurrentPage: (
      state,
      action
    ) => {
      state.currentPage =
        action.payload;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products =
            action.payload.products || [];

          state.total =
            action.payload.total || 0;
        }
      )

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch products";
        }
      );
  },
});

export const {
  setCurrentPage,
  setSearch,
} = productSlice.actions;

export default productSlice.reducer;