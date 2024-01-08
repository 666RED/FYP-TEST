import { React, useReducer } from "react";
import { BsEyeFill } from "react-icons/bs/index.js";
import { MdCancel } from "react-icons/md/index.js";
import { INITIAL_STATE, registerReducer } from "../reducers/registerReducer.js";
import "../styles/style.css";
import { enqueueSnackbar } from "notistack";
import Spinner from "./Spinner.js";

const RegisterForm = ({
	setDisplayRegForm,
	setLoginEmail,
	setLoginPassword,
	setLoginEmailBorder,
	setLoginPasswordBorder,
}) => {
	const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch({ type: "LOADING" });
			const emailReg = /^(.+)@(student\.uthm\.edu\.my|uthm\.edu\.my)$/;
			const phoneReg = /^0[0-9]{8,}$/;
			if (!phoneReg.test(state.phoneNumber)) {
				enqueueSnackbar("Invalid phone number", {
					variant: "error",
				});
				dispatch({ type: "INVALID_PHONE_NUMBER" });
			} else if (!emailReg.test(state.email)) {
				enqueueSnackbar("Only Student / Staff Email Address", {
					variant: "error",
				});
				dispatch({ type: "INVALID_EMAIL" });
			} else {
				await fetch("https://fyp-fsktm-connect.onrender.com/auth/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userName: state.name,
						userGender: state.gender,
						userEmailAddress: state.email.toLowerCase(),
						userPhoneNumber: state.phoneNumber,
						userPassword: state.password,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.msg === "Email existed") {
							enqueueSnackbar("Email already existed", {
								variant: "error",
							});
							dispatch({ type: "EMAIL_EXISTED" });
						} else if (data.msg === "Phone number existed") {
							enqueueSnackbar("Phone number already existed", {
								variant: "error",
							});
							dispatch({ type: "PHONE_NUMBER_EXISTED" });
						} else if (data.msg === "Success") {
							enqueueSnackbar("Registered", {
								variant: "success",
							});
							dispatch({ type: "SUCCESS_REGISTER" });
							setLoginEmail("");
							setLoginPassword("");
							setDisplayRegForm(false);
							setLoginEmailBorder(true);
							setLoginPasswordBorder(true);
						}
					});
			}
			dispatch({ type: "LOADING_FALSE" });
		} catch (error) {
			enqueueSnackbar("Could not connect to the server", { variant: "error" });
			dispatch({ type: "LOADING_FALSE" });
		}
	};

	return (
		<div>
			{state.loading && <Spinner />}
			<div className="z-1 position-fixed top-0 bottom-0 start-0 end-0 bg-dark opacity-75"></div>
			<div className="z-2 position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center">
				<form
					onSubmit={handleSubmit}
					className="container bg-white form p-3 border-secondary border rounded-5 position-absolute"
					style={{ maxWidth: "340px" }}
				>
					<h1 className="text-center">Register now</h1>
					<MdCancel
						className="position-absolute fs-1 text-danger cancel-icon"
						onClick={() => setDisplayRegForm(false)}
					/>
					<hr />
					{/* inputs */}
					{/* NAME */}
					<label htmlFor="register-name" className="form-label">
						Name:
					</label>
					<input
						type="text"
						id="register-name"
						value={state.name}
						onChange={(e) =>
							dispatch({ type: "SET_NAME", payload: e.target.value })
						}
						className={`form-control py-2 d-inline border-secondary`}
						required
						minLength={3}
						maxLength={50}
					/>
					{/* GENDER */}
					<label className="form-label mt-3">Gender:</label>
					<div className="d-flex">
						<div className="form-check">
							<input
								type="radio"
								className="form-check-input border-secondary"
								id="genderRadio1"
								name="gender"
								value="male"
								onChange={(e) =>
									dispatch({ type: "SET_GENDER", payload: e.target.value })
								}
								required
							/>
							<label htmlFor="genderRadio1" className="form-check-label me-3">
								Male
							</label>
						</div>
						<div className="form-check">
							<input
								type="radio"
								className="form-check-input border-secondary"
								id="genderRadio2"
								name="gender"
								value="female"
								required
								onChange={(e) =>
									dispatch({ type: "SET_GENDER", payload: e.target.value })
								}
							/>
							<label htmlFor="genderRadio2" className="form-check-label">
								Female
							</label>
						</div>
					</div>
					{/* EMAIL */}
					<label htmlFor="register-email" className="form-label mt-3">
						Email Address:
					</label>
					<input
						type="email"
						id="register-email"
						className={`form-control py-2 ${
							state.validEmail ? "border-secondary" : "border-danger"
						}`}
						placeholder="Student / Stuff Email Address"
						value={state.email}
						minLength={20}
						maxLength={50}
						onChange={(e) =>
							dispatch({ type: "SET_EMAIL", payload: e.target.value })
						}
						required
					/>
					{/* PHONE NUMBER */}
					<label htmlFor="register-phone-number" className="form-label mt-3">
						Phone Number:
					</label>
					<input
						type="text"
						id="register-phone-number"
						className={`form-control ${
							state.validPhoneNumber ? "border-secondary" : "border-danger"
						} py-2`}
						placeholder="e.g. 0137829473"
						value={state.phoneNumber}
						onChange={(e) => {
							dispatch({ type: "SET_PHONE_NUMBER", payload: e.target.value });
						}}
						required
					/>
					{/* PASSWORD */}
					<label htmlFor="register-password" className="form-label mt-3">
						Password:
					</label>
					<div className="position-relative">
						<input
							minLength={8}
							maxLength={30}
							type={state.viewMode}
							id="register-password"
							className={`form-control py-2 border-secondary`}
							placeholder="At least 8 characters"
							value={state.password}
							onChange={(e) =>
								dispatch({ type: "SET_PASSWORD", payload: e.target.value })
							}
							required
						/>
						<BsEyeFill
							className="position-absolute fs-4 eye-icon"
							onClick={() => dispatch({ type: "TOGGLE_PASSWORD" })}
						/>
					</div>
					{/* SUBMIT BUTTON */}
					<button className="btn btn-success d-block w-50 mx-auto p-2 fs-5 mt-4">
						SUBMIT
					</button>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
