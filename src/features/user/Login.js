import {useDispatch} from "react-redux";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {login} from "./userSlice";

const Login = (props) => {
	const {handleAuth} = props;

	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().required("*Email is required!"),
		password: Yup.string().required("*Password is required!"),
	});

	const dispatch = useDispatch();

	const handleSubmit = (formValue, onSubmitProps) => {
		const values = {
			formValue,
			onSubmitProps,
			handleAuth,
			props,
		};
		// console.log(values)
		dispatch(login(values));
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			<Form
				className="m-3 form form-control border-dark shadow"
				style={{width: "18rem"}}
			>
				<h3 className="display-6 mt-2">Login Page</h3>
				<div>
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<br />
					<Field name="email" type="text" />
					<ErrorMessage name="email">
						{(msg) => <div style={{color: "red"}}>{msg}</div>}
					</ErrorMessage>
				</div>
				<div>
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<br />
					<Field name="password" type="password" />
					<ErrorMessage name="password">
						{(msg) => <div style={{color: "red"}}>{msg}</div>}
					</ErrorMessage>
				</div>
				<div>
					<button
						type="submit"
						className="btn btn-sm btn-secondary mt-2 mb-2"
					>
						Login
					</button>
				</div>
			</Form>
		</Formik>
	);
};

export default Login;
