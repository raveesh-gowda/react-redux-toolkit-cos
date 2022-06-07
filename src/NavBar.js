import {Link, Route, withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";

import Login from "./features/user/Login";
import UserDashboard from "./features/user/UserDashboard";
import PrivateRouter from "./features/private/PrivateRouter";
import AdminList from "./features/admin/AdminList";
import AdminForm from "./features/admin/AdminForm";
import AdminView from "./features/admin/AdminView";
import AdminEdit from "./features/admin/AdminEdit";
import ClientView from "./features/client/ClientView";
import ClientList from "./features/client/ClientList";
import {logout} from "./features/user/userSlice";
import ClientForm from "./features/client/ClientForm";
import ClientEdit from "./features/client/ClientEdit";

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
