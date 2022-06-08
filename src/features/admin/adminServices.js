import {createAsyncThunk} from "@reduxjs/toolkit";
import swal from "sweetalert";
import axios from "axios";

//All Admins
export const asyncAllAdmins = createAsyncThunk(
	"all/admins",
	async (pageNumber) => {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/admins?page=${
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

//Search admin by name
export const asyncAdminByName = createAsyncThunk(
	"byName/admins",
	async (value) => {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/admins?name=${value}`,
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
				`${process.env.REACT_APP_BASE_URL}/admins`,
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
			await axios.delete(`${process.env.REACT_APP_BASE_URL}/admins/${id}`, {
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
				`${process.env.REACT_APP_BASE_URL}/admins/${formValues.id}`,
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

const adminServices = {
	asyncAllAdmins,
	asyncAdminByName,
	asyncCreateAdmin,
	asyncDeleteAdmin,
	asyncEditAdmin,
};

export default adminServices;
