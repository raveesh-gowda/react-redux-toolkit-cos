import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import NavBar from "./NavBar";

const App = (props) => {
	const [userLoggedIn, setUserLoggedIn] = useState(false);

	const handleAuth = () => {
		setUserLoggedIn(!userLoggedIn);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			handleAuth();
		}
	}, [dispatch]);

	return (
		<div>
			<h2 className="h1 text-center mt-3 mb-3">Assignment 1</h2>
			<NavBar handleAuth={handleAuth} userLoggedIn={userLoggedIn} />
		</div>
	);
};

export default App;
