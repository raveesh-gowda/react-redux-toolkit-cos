import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import swal from "sweetalert";
import axios from "axios";

const initialState = {
	loading: false,
	data: [],
	hasNext: true,
	errors: null,
};

//All Clients
export const asyncAllClients = createAsyncThunk(
	"all/clients",
	async (pageNumber) => {
		try {
			const res = await axios.get(
				`http://23.21.204.21:8080/api/v1/clients?page=${
					pageNumber ? pageNumber : 0
				}&limit=10`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			return res.data;
		} catch (err) {
			swal({
				title: `${err.response.data.message}`,
				icon: "error",
				button: "OK",
			});
		}
	}
);

//Search client by name
export const asyncClientByName = createAsyncThunk(
	"byName/clients",
	async (value) => {
		try {
			const res = await axios.get(
				`http://23.21.204.21:8080/api/v1/clients?page=0&limit=10&name=${value}`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			// console.log(res.data)
			return res.data;
		} catch (err) {
			swal({
				title: `${err.response.data.message}`,
				icon: "error",
				button: "OK",
			});
		}
	}
);

//Delete Client
export const asyncDeleteClient = createAsyncThunk(
	"delete/clients",
	async (id) => {
		try {
			await axios.delete(`http://23.21.204.21:8080/api/v1/clients/${id}`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
			return id;
			// console.log(res);
		} catch (err) {
			swal({
				title: `${err.response.data.message}`,
				icon: "error",
				button: "OK",
			});
		}
	}
);

//Create Client
export const asyncCreateClient = createAsyncThunk(
	"create/admins",
	async (values) => {
		const {formValues, onSubmitProps, props} = values;
		try {
			const res = await axios.post(
				"http://23.21.204.21:8080/api/v1/clients",
				formValues,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			onSubmitProps.resetForm();
			props.history.push("/dashboard/client");
			swal({
				title: "Created admin successfully!!",
				icon: "success",
				button: "OK",
			});
			return res;
		} catch (err) {
			swal({
				title: `${err.response.data.message}`,
				icon: "error",
				button: "OK",
			});
		}
	}
);

//Edit Client
export const asyncEditClient = createAsyncThunk(
	"edit/clients",
	async (formValues) => {
		try {
			await axios.put(
				`http://23.21.204.21:8080/api/v1/clients/${formValues.id}`,
				formValues,
				{headers: {Authorization: localStorage.getItem("token")}}
			);
			swal({
				title: "Updated admin successfully!!",
				icon: "success",
				button: "OK",
			});
			return formValues;
		} catch (err) {
			swal({
				title: `${err.response.data.message}`,
				icon: "error",
				button: "OK",
			});
		}
	}
);

const clientSlice = createSlice({
	name: "client",
	initialState,
	reducers: {},
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
			state.data = action.payload.data;
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

export default clientSlice.reducer;
