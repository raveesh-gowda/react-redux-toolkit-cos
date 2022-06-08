import {createAsyncThunk} from "@reduxjs/toolkit";
import swal from "sweetalert";
import axios from "axios";

//All Clients
export const asyncAllClients = createAsyncThunk(
	"all/clients",
	async (pageNumber) => {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/clients?page=${
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
				`${process.env.REACT_APP_BASE_URL}/clients?page=0&limit=10&name=${value}`,
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
			await axios.delete(`${process.env.REACT_APP_BASE_URL}/clients/${id}`, {
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
				`${process.env.REACT_APP_BASE_URL}/clients`,
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
				`${process.env.REACT_APP_BASE_URL}/clients/${formValues.id}`,
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

const clientServices = {
	asyncAllClients,
	asyncClientByName,
	asyncCreateClient,
	asyncDeleteClient,
	asyncEditClient,
};

export default clientServices;
