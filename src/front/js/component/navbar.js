import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const handleLogout = () => {
		actions.logout()
		setIsLoggedIn(false)
	}

	useEffect(() => {
		const checkToken = async () => {
			const token = localStorage.getItem('accessToken');
			setIsLoggedIn(!!token);
		};
		checkToken();
	}, [store.accessToken]);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container ms-5 d-flex justify-content-between">
				<div className="navbar-brand ms-5">
					My page
				</div>
				{isLoggedIn ? (
					<button className="btn btn-sm btn-outline-danger" type="button" onClick={handleLogout}>
						Logout
					</button>
				) : (
					<Link to={"/demo"}>
						<button className="btn btn-sm btn-outline-success" type="button">Sign up!</button>
					</Link>
				)}
			</div>
		</nav>
	);
};
