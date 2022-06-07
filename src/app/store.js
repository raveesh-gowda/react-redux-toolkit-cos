import {configureStore} from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminSlice";
import clientReducer from "../features/client/clientSlice"

export const store = configureStore({
	reducer: {
		user: userReducer,
		admin: adminReducer,
		client:clientReducer
	},
});
