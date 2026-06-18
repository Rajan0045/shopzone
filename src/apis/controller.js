import { resetCartState } from "../redux/features/cart/cartSlice";
import { clearUser } from "../redux/features/user/userSlice";
import { store } from "../redux/store";

export const logout = async () => {
    store.dispatch(clearUser());
    store.dispatch(resetCartState());
    window.location.href = '/login';
};
