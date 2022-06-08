import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import swal from "sweetalert";

import {asyncEditAdmin} from "./adminServices";

const AdminEdit = (props) => {
	const {id} = props.match.params;

	const [oneData, setOneData] = useState({});

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/admins/${id}`, {
				headers: {Authorization: localStorage.getItem("token")},
			})
			.then((response) => {
				setOneData(response.data);
			})
			.catch((err) => {
				swal({
					title: `${err.response.data.message}`,
					text: "Record Not Found",
					icon: "error",
					button: "OK",
				});
			});
	}, [id]);

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("*First Name is required!"),
		lastName: Yup.string().required("*Last Name is required!"),
		person: Yup.object().shape({
			email: Yup.string().required("*Email is required!"),
			role: Yup.object().shape({
				id: Yup.string().required("*Role ID is required"),
			}),
		}),
	});

	const dispatch = useDispatch();

	const handleEdit = (formValues) => {
		dispatch(asyncEditAdmin(formValues));
		props.history.push("/dashboard/admin")
	};

	return (
		<div className="mt-3">
			<Link to="/dashboard/admin" className="m-3">
				Back
			</Link>
			{Object.keys(oneData).length > 0 && (
				<Formik
					initialValues={oneData}
					validationSchema={validationSchema}
					onSubmit={handleEdit}
				>
					<div className="container card border-dark mt-2 bg-warning bg-opacity-25">
						<Form className="card-body">
							<h4 className="m-2">Edit Admin</h4>
							<div className="d-flex justify-content-between mb-2">
								<div>
									<label
										htmlFor="title"
										className="form-label text-secondary"
									>
										Title
									</label>
									<br />
									<Field
										name="title"
										default="Mr"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
								</div>
								<div>
									<label
										htmlFor="firstName"
										className="form-label text-secondary"
									>
										First Name<span style={{color: "red"}}>*</span>
									</label>
									<br />
									<Field
										name="firstName"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
									<ErrorMessage name="firstName">
										{(msg) => <div style={{color: "red"}}>{msg}</div>}
									</ErrorMessage>
								</div>
								<div>
									<label
										htmlFor="lastName"
										className="form-label text-secondary"
									>
										Last Name<span style={{color: "red"}}>*</span>
									</label>
									<br />
									<Field
										name="lastName"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
									<ErrorMessage name="lastName">
										{(msg) => <div style={{color: "red"}}>{msg}</div>}
									</ErrorMessage>
								</div>
							</div>
							<div className="d-flex justify-content-between mb-2">
								<div>
									<label
										htmlFor="email"
										className="form-label text-secondary"
									>
										Email<span style={{color: "red"}}>*</span>
									</label>
									<br />
									<Field
										name="person.email"
										type="email"
										className="bg-secondary bg-opacity-50"
									/>
									<ErrorMessage name="person.email">
										{(msg) => <div style={{color: "red"}}>{msg}</div>}
									</ErrorMessage>
								</div>
								<div>
									<label
										htmlFor="role"
										className="form-label text-secondary"
									>
										Role ID<span style={{color: "red"}}>*</span>
									</label>
									<br />
									<Field
										name="person.role.id"
										type="number"
										min="0"
										max="3"
										style={{width: "16rem"}}
										className="bg-secondary bg-opacity-50"
									/>
									<ErrorMessage name="person.role.id">
										{(msg) => <div style={{color: "red"}}>{msg}</div>}
									</ErrorMessage>
								</div>
							</div>
							<div className="d-flex justify-content-between mb-2">
								<div>
									<label
										htmlFor="extension"
										className="form-label text-secondary"
									>
										Extension
									</label>
									<br />
									<Field
										name="extension"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
								</div>
								<div>
									<label
										htmlFor="primaryPhoneNumber"
										className="form-label text-secondary"
									>
										Phone Number
									</label>
									<br />
									<Field
										name="primaryPhoneNumber"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
								</div>
								<div>
									<label
										htmlFor="hours"
										className="form-label text-secondary"
									>
										Hours
									</label>
									<br />
									<Field
										name="hours"
										type="number"
										className="bg-secondary bg-opacity-50"
									/>
								</div>
							</div>
							<div className="d-flex justify-content-between mb-2">
								<div>
									<label
										htmlFor="address1"
										className="form-label text-secondary"
									>
										Address Line 1
									</label>
									<br />
									<Field
										name="address.address1"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
								</div>
								<div>
									<label
										htmlFor="address2"
										className="form-label text-secondary"
									>
										Address Line 2
									</label>
									<br />
									<Field
										name="address.address2"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
								</div>
								<div>
									<label
										htmlFor="city"
										className="form-label text-secondary"
									>
										City
									</label>
									<br />
									<Field
										name="address.city"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
								</div>
							</div>
							<div className="d-flex justify-content-between mb-2">
								<div>
									<label
										htmlFor="state"
										className="form-label text-secondary"
									>
										State
									</label>
									<br />
									<Field
										name="address.state"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
								</div>
								<div>
									<label
										htmlFor="zipcode"
										className="form-label text-secondary"
									>
										Zipcode
									</label>
									<br />
									<Field
										name="address.zipCode"
										type="text"
										className="bg-secondary bg-opacity-50"
									/>
								</div>
								<div>
									<label
										htmlFor="hireDate"
										className="form-label text-secondary"
									>
										Hiring Date
									</label>
									<br />
									<Field
										name="hireDate"
										type="date"
										style={{width: "16rem"}}
										className="bg-secondary bg-opacity-50"
									/>
								</div>
							</div>
							<button
								type="submit"
								className="btn bg-info bg-opacity-75 mt-2 me-3"
							>
								Update
							</button>
						</Form>
					</div>
				</Formik>
			)}
		</div>
	);
};

export default AdminEdit;
