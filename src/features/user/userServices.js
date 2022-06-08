import {createAsyncThunk} from "@reduxjs/toolkit";
import swal from "sweetalert";
import axios from "axios";

// console.log(process.env.REACT_APP_BASE_URL)

//Login User
export const login = createAsyncThunk("auth/login", async (values) => {
	const {formValue, onSubmitProps, props, handleAuth} = values;

	await axios
		.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, formValue)
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

const userServices = {
	logout,
	login,
};

export default userServices;
