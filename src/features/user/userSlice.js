import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import swal from "sweetalert";
import axios from "axios";

const baseUrl = "http://23.21.204.21:8080/api/v1";

const initialState = {
	loading: false,
	data: {},
	errors: null,
};

//Login User
export const login = createAsyncThunk("auth/login", async (values) => {
	const {formValue, onSubmitProps, props, handleAuth} = values;

	await axios
		.post(baseUrl + "/auth/login", formValue)
		.then((response) => {
			swal({
				title: "Logged In Succesfully!",
				icon: "success",
				button: "OK",
			});
			localStorage.setItem("token", response.data.token);
			onSubmitProps.resetForm();
			handleAuth();
			props.history.push("/dashboard");
			// window.location.reload();
		})
		.catch((err) => {
			swal({
				title: `${err.response.data.status}`,
				text: `${err.response.data.message}`,
				icon: "error",
				button: "OK",
			});
		});
});

//Logout User
export const logout = createAsyncThunk("auth/logout", async (values) => {
	const {props, handleAuth} = values;
	swal({
		title: "Logged Out Succesfully!",
		icon: "success",
		button: "OK",
	});
	localStorage.removeItem("token");
	handleAuth();
	props.history.push("/");
});

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
	},
});

export default userSlice.reducer;
