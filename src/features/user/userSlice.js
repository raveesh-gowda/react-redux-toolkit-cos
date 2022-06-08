import {createSlice} from "@reduxjs/toolkit";

import { login, logout } from "./userServices";

const initialState = {
	loading: false,
	data: {},
	errors: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {
		[login.pending]: (state) => {
			state.loading = true;
		},
		[login.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload;
		},
		[login.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.errors.message;
		},
		[logout.fulfilled]: (state) => {
			state.data = {}
		}
	},
});

export default userSlice.reducer;
