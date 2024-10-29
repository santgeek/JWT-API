import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-sm me-5 ms-5">
				<div className="navbar-brand">
					My page
				</div>
				<Link to={"/demo"}>
					<button className="btn btn-sm btn-outline-success" type="button">Sign up!</button>
				</Link>

			</div>
		</nav>
	);
};
