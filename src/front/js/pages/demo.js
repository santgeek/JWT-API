import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	async function submitSignupForm(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		const email = formData.get("email")
		const password = formData.get("password")
		if (!password || !email) {
			console.log("datos incompletos")
		}
		let success = await actions.signup(email, password)
		if (success) {
			navigate("/")
			console.log("Usuario registrado")
		} else {
			alert("Error al registrar usuario")
			console.log("Error en la creación de usuario")
		}
	}

	return (
		<div className="container">
			<form onSubmit={submitSignupForm} className="container mb-4">
				<h3 className="text-center mt-4 mb-4">Please, fill in the next form</h3>
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
					className="btn btn-primary">Register</button>
			</form>



			<Link to="/">
				<button className="btn btn-success">Back home</button>
			</Link>
		</div>
	);
};
