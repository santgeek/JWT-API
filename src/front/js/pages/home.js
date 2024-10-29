import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	async function submitForm(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		const email = formData.get("email")
		const password = formData.get("password")
		if (!password || !email) {
			console.log("datos incompletos")
		}
		let success = await actions.loginUser(email, password)
		if (success) {
			navigate("/private")
			console.log("Usuario logueado")
		} else {
			console.log("Error en el inicio de sesión")
		}
	}

	return (
		<div className="mt-5">
			<h1 className="text-center">Login</h1>
			<div className="container-sm" style={{ "width": "50%" }}>
				<form onSubmit={submitForm}>
					<div className="form-group mb-3">
						<label className="mb-2" htmlFor="email">Email address</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							aria-describedby="emailHelp"
							placeholder="Enter email"
							required />
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div className="form-group mb-4">
						<label className="text-left mb-2" htmlFor="password">Password</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="Password"
							required />
					</div>
					<button
						type="submit"
						className="btn btn-primary">Submit</button>
				</form>
			</div>
		</div>
	);
};
