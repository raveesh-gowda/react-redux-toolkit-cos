import {Link, Route, withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";

import Login from "./user/Login";
import UserDashboard from "./user/UserDashboard";
import {logout} from "./user/userServices";
import PrivateRouter from "./private/PrivateRouter";
import AdminList from "./admin/AdminList";
import AdminForm from "./admin/AdminForm";
import AdminView from "./admin/AdminView";
import AdminEdit from "./admin/AdminEdit";
import ClientView from "./client/ClientView";
import ClientList from "./client/ClientList";
import ClientForm from "./client/ClientForm";
import ClientEdit from "./client/ClientEdit";

const NavBar = (props) => {
	const {handleAuth, userLoggedIn} = props;

	const dispatch = useDispatch();

	const handleLogout = () => {
		const values = {
			handleAuth,
			props,
		};
		dispatch(logout(values));
	};

	return (
		<div>
			{userLoggedIn ? (
				<>
					<div className="navbar navbar-expand-lg navbar-dark bg-secondary nav justify-content-evenly">
						<Link to="/dashboard" className="nav-link text-white">
							UserDashboard
						</Link>
						<Link
							to="/"
							onClick={handleLogout}
							className="nav-link text-white"
						>
							Logout
						</Link>
					</div>
				</>
			) : (
				<Link to="/login" className="nav-link text-blue">
					Login
				</Link>
			)}

			<Route
				path="/login"
				render={(props) => {
					return <Login {...props} handleAuth={handleAuth} />;
				}}
				exact={true}
			/>
			<PrivateRouter
				path="/dashboard"
				component={UserDashboard}
				exact={true}
			/>
			<PrivateRouter
				path="/dashboard/admin"
				component={AdminList}
				exact={true}
			/>
			<PrivateRouter
				path="/dashboard/admin/create"
				component={AdminForm}
				exact={true}
			/>
			<PrivateRouter
				path="/dashboard/admin/id/:id"
				component={AdminView}
				exact={true}
			/>
			<PrivateRouter
				path="/dashboard/admin/edit/:id"
				component={AdminEdit}
				exact={true}
			/>
			<PrivateRouter
				path="/dashboard/client"
				component={ClientList}
				exact={true}
			/>

			<PrivateRouter
				path="/dashboard/client/create"
				component={ClientForm}
				exact={true}
			/>
			<PrivateRouter
				path="/dashboard/client/edit/:id"
				component={ClientEdit}
				exact={true}
			/>
			<PrivateRouter
				path="/dashboard/client/id/:id"
				component={ClientView}
				exact={true}
			/>
		</div>
	);
};

export default withRouter(NavBar);
