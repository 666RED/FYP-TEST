import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/footer.js";
import RegisterForm from "../components/registerForm.js";
import "../styles/style.css";
import { useSnackbar } from "notistack";
import { BsEyeFill } from "react-icons/bs/index.js";
import { INITIAL_STATE, loginReducer } from "../reducers/loginReducer.js";
import Spinner from "../components/spinner.js";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayRegForm, setDisplayRegForm] = useState(false);
	const [viewPassword, setViewPassword] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userEmailAddress: email,
					userPassword: password,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.msg === "Not exist") {
						enqueueSnackbar("User does not exist", { variant: "error" });
						dispatch({ type: "USER_NOT_EXIST" });
					} else if (data.msg === "Invalid credentials") {
						enqueueSnackbar("Incorrect password", { variant: "error" });
						dispatch({ type: "INCORRECT_PASSWORD" });
					} else if (data.msg === "Success") {
						enqueueSnackbar("Login", { variant: "success" });
						dispatch({ type: "LOGIN" });
						navigate("/home");
					}
					setLoading(false);
				});
		} catch (error) {
			enqueueSnackbar("Could not connect to the server", { variant: "error" });
			setLoading(false);
		}
	};

	return (
		<div>
			{loading && <Spinner />}
			{displayRegForm && <RegisterForm setDisplayRegForm={setDisplayRegForm} />}
			<div className="container mt-3" style={{ maxWidth: "400px" }}>
				<h1>Logo</h1>
				<form
					onSubmit={handleSubmit}
					className="form p-3 border-secondary border rounded-5 mt-4"
				>
					<h1 className="text-center">User Login</h1>
					<hr />
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						minLength={20}
						maxLength={50}
						value={email}
						className={`form-control ${
							state.isUserExist ? "border-secondary" : "border-danger"
						} mt-4 py-3`}
						placeholder="Student / Staff Email Address"
						required
					/>
					<div className="position-relative z-0">
						<input
							type={viewPassword ? "text" : "password"}
							id="password"
							minLength={8}
							maxLength={30}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={`form-control my-4 ${
								state.isPasswordCorrect ? "border-secondary" : "border-danger"
							} py-3`}
							placeholder="Password"
							required
						/>
						<BsEyeFill
							className="position-absolute fs-4 eye-icon"
							onClick={() => setViewPassword(!viewPassword)}
						/>
					</div>
					<button className="btn btn-primary d-block w-50 mx-auto p-2 fs-5">
						LOGIN
					</button>
					<p
						className="text-center d-block mt-4 text-primary forgot-password-text"
						onClick={() => navigate("/recover-password")}
					>
						Forgot password?
					</p>
				</form>
				<h2 className="text-center my-3">OR</h2>
				<button
					className="btn btn-success d-block mx-auto fs-5 mb-3"
					onClick={() => setDisplayRegForm(true)}
				>
					Register New Account
				</button>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
