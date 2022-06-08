import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const AdminView = (props) => {
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

	return (
		<div className="mt-3">
			<Link to="/dashboard/admin" className="m-3">
				Back
			</Link>
			<h4 className="m-3">Admin Details</h4>
			{Object.keys(oneData).length > 0 && (
				<div className="card card-body m-3" style={{width: "30rem"}}>
					<h5>ID: {oneData.id}</h5>
					<h5>
						Title:{" "}
						{oneData.title.length === 0 ? "---" : `${oneData.title}`}
					</h5>
					<h5>
						Full Name: {oneData.firstName} {oneData.lastName}
					</h5>
					<h5>Email: {oneData.person.email}</h5>
					<h5>
						Phone:{" "}
						{oneData.primaryPhoneNumber.length === 0
							? "---"
							: `${oneData.primaryPhoneNumber}`}
					</h5>
					<h5>
						Hired Date:{" "}
						{oneData.hireDate === null ? "---" : `${oneData.hireDate}`}
					</h5>
					<h5>Role: {oneData.person.role.name}</h5>
					<h5>
						Address:{" "}
						{oneData.address.address1.length === 0
							? "---"
							: `${oneData.address.address1}`}{" "}
						{oneData.address.address2.length === 0
							? "---"
							: `${oneData.address.address2}`}
					</h5>
					<h5>
						Zip code:{" "}
						{oneData.address.zipCode.length === 0
							? "---"
							: `${oneData.address.zipCode}`}
					</h5>
					<h5>
						City, State:{" "}
						{oneData.address.city.length === 0
							? "---"
							: `${oneData.address.city}`}
						,{" "}
						{oneData.address.state.length === 0
							? "---"
							: `${oneData.address.state}`}
					</h5>
				</div>
			)}
		</div>
	);
};

export default AdminView;
