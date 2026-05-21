import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

/* FETCH PRODUCTS */

export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",

    async ({
      limit = 12,
      skip = 0,
      search = "",
    }) => {
      let url = "";

      // SEARCH API
      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
      }

      // NORMAL PAGINATION API
      else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }

      const response = await fetch(url);

      const data = await response.json();

      return data;
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setSearch: (state, action) => {
      state.search = action.payload;

      // RESET PAGE WHEN SEARCHING
      state.currentPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder

      /* PENDING */

      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
        }
      )

      /* SUCCESS */

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products =
            action.payload.products;

          state.total =
            action.payload.total;
        }
      )

      /* ERROR */

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.error.message;
        }
      );
  },
});

/* EXPORTS */

export const {
  setCurrentPage,
  setSearch,
} = productSlice.actions;

export default productSlice.reducer;