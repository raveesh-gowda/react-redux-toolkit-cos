import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncCreateClient } from "./clientSlice";

const ClientForm = (props) => {
	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		gender: "",
		clientFlag: false,
		emailOptingIn: true,
		primaryPhoneNumber: "",
		secondaryPhoneNumber: "",
		guardian: "",
		emergencyContactNumber: "",
		emergencyContactName: "",
		dob: "",
		note: "",
		billingNote: "",
		insurance: null,
		insurancePolicyNumber: "",
		insuranceGroupNumber: "",
		insuredRelationship: "Self",
		insuredFirstName: "",
		insuredLastName: "",
		insuredDob: "",
		activeFlag: true,
		createUser: "",
		address: {
			address1: "",
			address2: "",
			city: "",
			state: "",
			zipCode: "",
		},
		clinicians: [],
		location: {
			id: 1,
			name: "CoStrategix",
			code: "CT",
			address: {
				id: 0,
				address1: "",
				address2: "",
				state: "",
				city: "",
				zipCode: "",
				location: {
					id: 1,
					clinicians: [],
					location: {
						id: 1,
						name: "",
					},
					label: "",
					value: "",
				},
			},
		},
	};

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("*First Name is required!"),
		lastName: Yup.string().required("*Last Name is required!"),
		gender: Yup.string().required("*Gender is required!"),
		dob: Yup.string().required("*Date of birth is required!"),
		primaryPhoneNumber: Yup.string().required("*Phone number is required!"),
		address: Yup.object().shape({
			address1: Yup.string().required("*Address line 1 is required!"),
			address2: Yup.string().required("*Address line 2 is required!"),
			city: Yup.string().required("*City is required!"),
			state: Yup.string().required("*State is required!"),
			zipCode: Yup.string().required("*Zip code is required!"),
		}),
		activeFlag: Yup.string().required("*Status is required!"),
	});

	const dispatch = useDispatch()

	const handleSubmit = (formValues, onSubmitProps) => {
		const values = {
			formValues,
			onSubmitProps,
			props,
		};
		// console.log(values);
		dispatch(asyncCreateClient(values))
	};;

	return (
		<div className="mt-3">
			<Link to="/dashboard/client" className="m-3">
				Back
			</Link>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<div className="container card border-dark mt-2 bg-warning bg-opacity-25">
					<Form className="card-body">
						<h4 className="m-2">Create Client</h4>
						<div className="d-flex justify-content-between mb-2">
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
							<div>
								<label
									htmlFor="gender"
									className="form-label text-secondary"
								>
									Gender<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="gender"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="gender">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
							</div>
						</div>
						<div className="form-check form-switch">
							<Field
								type="checkbox"
								name="clientFlag"
								className="form-check-input"
								style={{width: "3rem"}}
							/>{" "}
							<p className="form-label text-secondary"> Flag</p>
						</div>
						<div className="d-flex justify-content-between mb-2">
							<div>
								<label
									htmlFor="email"
									className="form-label text-secondary"
								>
									Email
								</label>
								<br />
								<Field
									name="email"
									type="email"
									className="bg-secondary bg-opacity-50"
								/>
								<br />
								<Field
									className="form-check-input"
									name="emailOptingIn"
									type="checkbox"
								/>{" "}
								Opting-In
							</div>
							<div>
								<label
									htmlFor="primaryPhoneNumber"
									className="form-label text-secondary"
								>
									Phone Number 1<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="primaryPhoneNumber"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="primaryPhoneNumber">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
							</div>
							<div>
								<label
									htmlFor="secondaryPhoneNumber"
									className="form-label text-secondary"
								>
									Phone Number 2
								</label>
								<br />
								<Field
									name="secondaryPhoneNumber"
									type="text"
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
									Address Line 1<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="address.address1"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="address.address1">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
							</div>
							<div>
								<label
									htmlFor="address2"
									className="form-label text-secondary"
								>
									Address Line 2<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="address.address2"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="address.address2">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
							</div>
							<div>
								<label
									htmlFor="city"
									className="form-label text-secondary"
								>
									City<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="address.city"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="address.city">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
							</div>
						</div>
						<div className="d-flex justify-content-between mb-2">
							<div>
								<label
									htmlFor="state"
									className="form-label text-secondary"
								>
									State<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="address.state"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="address.state">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
							</div>
							<div>
								<label
									htmlFor="zipcode"
									className="form-label text-secondary"
								>
									Zipcode<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="address.zipCode"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
								<ErrorMessage name="address.zipCode">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
							</div>
							<div>
								<label
									htmlFor="dob"
									className="form-label text-secondary"
								>
									Date of Birth<span style={{color: "red"}}>*</span>
								</label>
								<br />
								<Field
									name="dob"
									type="date"
									className="bg-secondary bg-opacity-50"
									style={{width: "16rem"}}
								/>
								<ErrorMessage name="dob">
									{(msg) => <div style={{color: "red"}}>{msg}</div>}
								</ErrorMessage>
							</div>
						</div>
						<div className="d-flex justify-content-between mb-2">
							<div>
								<label
									htmlFor="guardian"
									className="form-label text-secondary"
								>
									Guardian
								</label>
								<br />
								<Field
									name="guardian"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
							</div>
							<div>
								<label
									htmlFor="emergencyContactName"
									className="form-label text-secondary"
								>
									Emergency Contact Name
								</label>
								<br />
								<Field
									name="emergencyContactName"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
							</div>
							<div>
								<label
									htmlFor="emergencyContactNumber"
									className="form-label text-secondary"
								>
									Emergency Contact Number
								</label>
								<br />
								<Field
									name="emergencyContactNumber"
									type="text"
									className="bg-secondary bg-opacity-50"
								/>
							</div>
						</div>
						{/* <div className="d-flex justify-content-between mb-2">
							<div>
								<label
									htmlFor="clinicians"
									className="form-label text-secondary"
								>
									Assigned Clinician's
								</label>
								<br />
								<Field
									type="number"
									name="clinicians[0].id"
									className="bg-secondary bg-opacity-50"
								/>
							</div>
							<div>
								<label
									htmlFor="activeFlag"
									className="form-label text-secondary"
								>
									Status
								</label>
								<br />
								<Field
									name="status"
									className="bg-secondary bg-opacity-50"
								/>
							</div>
							<div>
								<label
									htmlFor="location"
									className="form-label text-secondary"
								>
									Default Location
								</label>
								<br />
								<Field
									name="location.address.address1"
									className="bg-secondary bg-opacity-50"
								/>
							</div>
						</div> */}
						<div>
							<label
								htmlFor="note"
								className="form-label text-secondary"
							>
								Notes
							</label>
							<br />
							<Field
								as="textarea"
								type="text"
								name="note"
								className="bg-secondary bg-opacity-50"
								style={{width: "100%"}}
							/>
						</div>
						<div>
							<label
								htmlFor="billingNote"
								className="form-label text-secondary"
							>
								Billing Notes
							</label>
							<br />
							<Field
								as="textarea"
								type="text"
								name="billingNote"
								className="bg-secondary bg-opacity-50 mb-2"
								style={{width: "100%"}}
							/>
						</div>
						<h5>Insurance Details</h5>
						<div className="d-flex justify-content-between mb-2">
							<div>
								<label htmlFor="" className="form-label text-secondary">
									Insurance Company Name
								</label>
								<br />
								<Field
									type="text"
									name="insurance.name"
									className="bg-secondary bg-opacity-50 mb-2"
									style={{width: "30rem"}}
								/>
							</div>
							<div>
								<label
									htmlFor="insuredRelationship"
									className="form-label text-secondary"
								>
									Insured's Relationship
								</label>
								<br />
								<Field
									type="text"
									name="insuredRelationship"
									className="bg-secondary bg-opacity-50 mb-2"
									style={{width: "30rem"}}
								/>
							</div>
						</div>
						<div className="d-flex justify-content-between mb-2">
							<div>
								<label
									htmlFor="insurancePolicyNumber"
									className="form-label text-secondary"
								>
									Insurance Policy Number
								</label>
								<br />
								<Field
									type="text"
									name="insurancePolicyNumber"
									className="bg-secondary bg-opacity-50 mb-2"
									style={{width: "30rem"}}
								/>
							</div>
							<div>
								<label
									htmlFor="insuranceGroupNumber"
									className="form-label text-secondary"
								>
									Insurance Group Number
								</label>
								<br />
								<Field
									type="text"
									name="insuranceGroupNumber"
									className="bg-secondary bg-opacity-50 mb-2"
									style={{width: "30rem"}}
								/>
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

export default ClientForm;
