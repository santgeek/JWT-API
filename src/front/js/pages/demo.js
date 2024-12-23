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
				<div className="row justify-content-center mb-4">
					<div className="col-12 col-md-6">
						<label className="mb-2 text-start" htmlFor="email">Email address</label>
						<input
							type="email"
							className="form-control w-100 mx-auto"
							id="email"
							name="email"
							aria-describedby="emailHelp"
							placeholder="Enter email"
							required />
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>

						<div className="mt-3">
							<label className="text-left mb-2" htmlFor="password">Password</label>
							<input
								type="password"
								className="form-control w-100 mx-auto"
								id="password"
								name="password"
								placeholder="Password"
								required />
						</div>
					</div>
				</div>

				<div className="d-flex justify-content-center">
					<button
						type="submit"
						className="btn btn-primary me-3">Register
					</button>
					<Link to="/">
						<button className="btn btn-success">Back home</button>
					</Link>
				</div>
			</form>




		</div>
	);
};
