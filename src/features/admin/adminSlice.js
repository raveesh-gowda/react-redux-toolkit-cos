import {createSlice} from "@reduxjs/toolkit";

import {
	asyncAllAdmins,
	asyncAdminByName,
	asyncCreateAdmin,
	asyncDeleteAdmin,
	asyncEditAdmin,
} from "./adminServices";

const initialState = {
	loading: false,
	data: [],
	errors: null,
	hasNext: true,
};

const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {},
	extraReducers: {
		[asyncAllAdmins.pending]: (state) => {
			state.loading = true;
		},
		[asyncAllAdmins.fulfilled]: (state, action) => {
			if (action.payload.data.length > 1) {
				state.data = state.data.concat(action.payload.data);
			}
			state.hasNext = action.payload.meta.pagination.hasNext;
		},
		[asyncAllAdmins.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload.message;
		},
		[asyncAdminByName.fulfilled]: (state, action) => {
			state.data = action.payload.data;
		},
		[asyncAdminByName.rejected]: (state, action) => {
			state.errors = action.payload.message;
		},
		[asyncCreateAdmin.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = [{...action.payload.data}, ...state.data];
		},
		[asyncCreateAdmin.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload.message;
		},
		[asyncDeleteAdmin.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = state.data.filter((ele) => ele.id !== action.payload);
		},
		[asyncDeleteAdmin.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload.message;
		},
		[asyncEditAdmin.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = state.data.map((ele) => {
				if (ele.id === action.payload.id) {
					return {...action.payload};
				} else {
					return {...ele};
				}
			});
		},
		[asyncEditAdmin.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload.message;
		},
	},
});

export default adminSlice.reducer;
