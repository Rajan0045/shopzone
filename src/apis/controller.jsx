import { resetCartState } from "../redux/features/cart/cartSlice";
import { clearUser } from "../redux/features/user/userSlice";
import { Navigate, Outlet } from "react-router-dom";
import { store } from "../redux/store";
import React from "react";

export const logout = async () => {
    store.dispatch(clearUser());
    store.dispatch(resetCartState());
    window.location.href = '/login';
};

export const OwnerProtectedRoute = ({ children }) => {
    const user = store.getState()?.user?.user;
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (user.role !== "owner") {
        return <Navigate to="/" replace />;
    }
    return children;
};
