import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const userData = {
		"email": email,
		"password": password
	}

	const sendUserData = async () => {
		if (email && password) {
			const result = await actions.login(userData)
			if (result) {
				navigate("/private")
			} else {
				alert("Credenciales incorrectas")
			}
		}
	}

	return (
		<div className="mt-5">
			<h1 className="text-center">Login</h1>
			<div className="container-sm" style={{ "width": "50%" }}>
				<form>
					<div className="form-group mb-3">
						<label className="mb-2" htmlFor="exampleInputEmail1">Email address</label>
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter email" />
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div className="form-group mb-4">
						<label className="text-left mb-2" htmlFor="exampleInputPassword1">Password</label>
						<input
							value={password}
							onChange={e => setPassword(e.target.value)}
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Password" />
					</div>
					<button
						type="submit"
						onClick={() => sendUserData()}
						className="btn btn-primary">Submit</button>
				</form>
			</div>
		</div>
	);
};
