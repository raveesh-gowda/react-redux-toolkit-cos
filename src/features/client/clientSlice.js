import {createSlice} from "@reduxjs/toolkit";

import {
	asyncAllClients,
	asyncClientByName,
	asyncCreateClient,
	asyncDeleteClient,
	asyncEditClient,
} from "./clientServices";

const initialState = {
	loading: false,
	data: [],
	searchData:[],
	hasNext: true,
	errors: null,
};

const clientSlice = createSlice({
	name: "client",
	initialState,
	reducers: {
		resetData: (state) => {
			state.data = [];
		},
	},
	extraReducers: {
		[asyncAllClients.pending]: (state) => {
			state.loading = true;
		},
		[asyncAllClients.fulfilled]: (state, action) => {
			state.loading = false;
			if (action.payload.data.length > 1) {
				state.data = state.data.concat(action.payload.data);
			}
			state.hasNext = action.payload.meta.pagination.hasNext;
		},
		[asyncAllClients.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload.message;
		},
		[asyncClientByName.fulfilled]: (state, action) => {
			state.searchData = action.payload.data;
		},
		[asyncClientByName.rejected]: (state, action) => {
			state.errors = action.payload.message;
		},
		[asyncCreateClient.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = [{...action.payload.data}, ...state.data];
		},
		[asyncCreateClient.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload.message;
		},
		[asyncDeleteClient.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = state.data.filter((ele) => ele.id !== action.payload);
		},
		[asyncDeleteClient.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload.message;
		},
		[asyncEditClient.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = state.data.map((ele) => {
				if (ele.id === action.payload.id) {
					return {...action.payload};
				} else {
					return {...ele};
				}
			});
		},
		[asyncEditClient.rejected]: (state, action) => {
			state.loading = false;
			state.errors = action.payload.message;
		},
	},
});

export const {resetData} = clientSlice.actions;

export default clientSlice.reducer;
