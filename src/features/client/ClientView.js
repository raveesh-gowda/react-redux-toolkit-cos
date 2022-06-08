import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ClientView = (props) => {
	const {id} = props.match.params;

	const [oneData, setOneData] = useState({});

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/clients/${id}`, {
				headers: {Authorization: localStorage.getItem("token")},
			})
			.then((response) => {
				// console.log(response.data);
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
			<Link to="/dashboard/client" className="m-3">
				Back
			</Link>
			<h4 className="m-3">Client Details</h4>
			{Object.keys(oneData).length > 0 && (
				<div className="card card-body m-3" style={{width: "40rem"}}>
					<h5>ID: {oneData.id}</h5>
					<h5>Account Number: {oneData.accountNumber}</h5>
					<h5>
						Full Name: {oneData.firstName} {oneData.lastName}
					</h5>
					<h5>DOB: {oneData.dob}</h5>
					<h5>Gender: {oneData.gender}</h5>
					<h5>
						Guardian:{" "}
						{oneData.guardian.length === 0
							? "---"
							: `${oneData.guardian}`}
					</h5>
					<h5>
						Email:{" "}
						{oneData.email.length === 0 ? "---" : `${oneData.email}`}
					</h5>
					<h5>Phone Number: {oneData.primaryPhoneNumber}</h5>
					<h5>
						Address:{" "}
						{oneData.address.address1.length === 0
							? "---"
							: `${oneData.address.address1}`}
						,{" "}
						{oneData.address.address2.length === 0
							? "---"
							: `${oneData.address.address2}`}
						,{" "}
						{oneData.address.city.length === 0
							? "---"
							: `${oneData.address.city}`}
						,{" "}
						{oneData.address.state.length === 0
							? "---"
							: `${oneData.address.state}`}
					</h5>
					<h5>Zip Code: {oneData.address.zipCode}</h5>
					<h5>
						Emergency Contact Name & Number:{" "}
						{oneData.emergencyContactName.length === 0
							? "---"
							: `${oneData.emergencyContactName}`}{" "}
						&{" "}
						{oneData.emergencyContactNumber.length === 0
							? "---"
							: `${oneData.emergencyContactNumber}`}
					</h5>
					<h5>
						Status:{" "}
						{oneData.activeFlag === true ? "Active" : "Not Active"}
					</h5>
					<h5>
						Assigned Clinicians:{" "}
						{oneData.clinicians.length > 0
							? oneData.clinicians.map((ele) => {
									return (
										<li key={ele.id}>
											{ele.firstName} {ele.lastName}
										</li>
									);
							  })
							: "No Clinicians Assigned"}
					</h5>
					<h5>Client Notes: {oneData.note} </h5>
					<h5>Billing Notes: {oneData.billingNote} </h5>
					<h5>
						Insured's First Name:{" "}
						{oneData.insuredFirstName.length === 0
							? "---"
							: `${oneData.insuredFirstName}`}
					</h5>
					<h5>
						Insured's Last Name:{" "}
						{oneData.insuredLastName.length === 0
							? "---"
							: `${oneData.insuredLastName}`}
					</h5>
					<h5>
						Insurance Company Name:{" "}
						{oneData.insurance === null
							? "---"
							: `${oneData.insurance.name}`}{" "}
					</h5>
					<h5>
						Insured's Relationship:{" "}
						{oneData.insuredRelationship.length === 0
							? "---"
							: `${oneData.insuredRelationship}`}
					</h5>
					<h5>
						Insurance Group Number:{" "}
						{oneData.insuranceGroupNumber.length === 0
							? "---"
							: `${oneData.insuranceGroupNumber}`}{" "}
					</h5>
					<h5>
						Insurance Policy Number:{" "}
						{oneData.insurancePolicyNumber.length === 0
							? "---"
							: `${oneData.insurancePolicyNumber}`}
					</h5>
				</div>
			)}
		</div>
	);
};

export default ClientView;
