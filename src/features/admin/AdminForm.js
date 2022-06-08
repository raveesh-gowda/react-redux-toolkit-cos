import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";

import {asyncCreateAdmin} from "./adminServices";
import {Link} from "react-router-dom";

const AdminForm = (props) => {
	const initialValues = {
		firstName: "",
		lastName: "",
		title: "",
		extension: "",
		primaryPhoneNumber: "",
		hours: "",
		hireDate: "",
		person: {
			email: "",
			secret: "",
			role: {
				id: "",
			},
		},
		address: {
			address1: "",
			address2: "",
			city: "",
			state: "",
			zipCode: "",
		},
		practices: [
			{
				id: 0,
				name: "",
			},
		],
	};

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("*First Name is required!"),
		lastName: Yup.string().required("*Last Name is required!"),
		title: Yup.string().required("*Title is required!"),
		person: Yup.object().shape({
			email: Yup.string().required("*Email is required!"),
			secret: Yup.string()
				.required("*Password is required!")
				.min(8, "*Password is too short, should be maore than 8 characters")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
					"*Must constain 1 uppercase, 1 number and 1 special case character"
				),
			role: Yup.object().shape({
				id: Yup.string().required("*Role ID is required"),
			}),
		}),
		hireDate: Yup.string().required("*Hire date is required"),
	});

	const dispatch = useDispatch();

	const handleSubmit = (formValues, onSubmitProps) => {
		const values = {
			formValues,
			onSubmitProps,
			props,
		};
		// console.log(values);
		dispatch(asyncCreateAdmin(values));
	};

	return (
		<div className="mt-3">
			<Link to="/dashboard/admin" className="m-3">
				Back
			</Link>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<div className="container card border-dark mt-2 bg-warning bg-opacity-25">
					<Form className="card-body">
						<h4 className="m-2">Create Admin</h4>
						<div className="d-flex justify-content-between mb-2">
							<div>
								<label
									htmlFor="title"
									className="form-label text-secondary"
								>
									Title<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="title"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="title">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
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
									htmlFor="secret"
									className="form-label text-secondary"
								>
									Password<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="person.secret"
									type="password"
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="person.secret">
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
									Hiring Date<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="hireDate"
									type="date"
									style={{width: "16rem"}}
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="hireDate">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
							</div>
						</div>
						<button
							type="submit"
							className="btn bg-primary bg-opacity-75 mt-2 me-3"
						>
							Submit
						</button>
					</Form>
				</div>
			</Formik>
		</div>
	);
};

export default AdminForm;
