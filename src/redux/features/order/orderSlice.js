import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push({
                id: Date.now(),
                items: action.payload.items,
                total: action.payload.total,
                date: new Date().toISOString(),
            });
        },
    },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;