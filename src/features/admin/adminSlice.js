import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import swal from "sweetalert";
import axios from "axios";

const initialState = {
	loading: false,
	data: [],
	errors: null,
	hasNext: true,
};

//All Admins
export const asyncAllAdmins = createAsyncThunk(
	"all/admins",
	async (pageNumber) => {
		try {
			const res = await axios.get(
				`http://23.21.204.21:8080/api/v1/admins?page=${
					pageNumber ? pageNumber : 0
				}&limit=10`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			console.log(res.data);
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

//Search admin by name
export const asyncAdminByName = createAsyncThunk(
	"byName/admins",
	async (value) => {
		try {
			const res = await axios.get(
				`http://23.21.204.21:8080/api/v1/admins?page=0&limit=10&name=${value}`,
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

//Create Admin
export const asyncCreateAdmin = createAsyncThunk(
	"create/admins",
	async (values) => {
		const {formValues, onSubmitProps, props} = values;
		try {
			const res = await axios.post(
				"http://23.21.204.21:8080/api/v1/admins",
				formValues,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			onSubmitProps.resetForm();
			props.history.push("/dashboard/admin");
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

//Delete Admin
export const asyncDeleteAdmin = createAsyncThunk(
	"delete/admins",
	async (id) => {
		try {
			await axios.delete(`http://23.21.204.21:8080/api/v1/admins/${id}`, {
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

//Edit Admin
export const asyncEditAdmin = createAsyncThunk(
	"edit/admins",
	async (formValues) => {
		try {
			await axios.put(
				`http://23.21.204.21:8080/api/v1/admins/${formValues.id}`,
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
