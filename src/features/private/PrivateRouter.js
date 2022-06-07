import {Route, Redirect} from "react-router-dom";

const PrivateRouter = ({component: Component, ...rest}) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				return localStorage.getItem("token") ? (
					<Component {...props} />
				) : (
					<Redirect to={{pathname: "/login"}} />
				);
			}}
		/>
	);
};

export default PrivateRouter;
