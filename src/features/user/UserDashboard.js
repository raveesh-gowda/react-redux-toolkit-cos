import {Link} from "react-router-dom";

const UserDashboard = (props) => {
	return (
		<div className="m-3">
			<h3>User Dashboard</h3>
			<div className="nav justify-content-evenly">
				<Link to="/dashboard/admin">Admin</Link>
				<Link to="/dashboard/client">Client</Link>
			</div>
		</div>
	);
};

export default UserDashboard;
