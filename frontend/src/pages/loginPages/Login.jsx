import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { BsEyeFill } from "react-icons/bs/index.js";
import RegisterForm from "./RegisterForm.jsx";
import Spinner from "../../components/Spinner.jsx";
import {
	setDisplayRegForm,
	setLoading,
	userNotExist,
	invalidCredentials,
	setEmail,
	setPassword,
	setViewPassword,
	successLogin,
} from "../../features/loginSlice.js";
import { setUser } from "../../features/authSlice.js";
import { ServerContext } from "../../App.js";

const Login = () => {
	const serverURL = useContext(ServerContext);

	const dispatch = useDispatch();
	const {
		email,
		password,
		isUserExist,
		isPasswordCorrect,
		displayRegForm,
		viewPassword,
		loading,
	} = useSelector((store) => store.login);

	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await fetch(`${serverURL}/auth/login`, {
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
						dispatch(userNotExist());
						enqueueSnackbar("User does not exist", { variant: "error" });
					} else if (data.msg === "Invalid credentials") {
						dispatch(invalidCredentials());
						enqueueSnackbar("Incorrect password", { variant: "error" });
					} else if (data.msg === "Success") {
						console.log(data);

						dispatch(setUser({ token: data.token, user: data.user }));
						dispatch(successLogin());
						enqueueSnackbar("Login", { variant: "success" });
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
			{displayRegForm && <RegisterForm />}
			<div className="mt-5 w-1/2 mx-auto min-w-80 max-w-md text-center">
				<h1 className="text-2xl">Logo</h1>
				<form
					onSubmit={handleSubmit}
					className="p-3 border-gray-400 border rounded-lg mt-16 sm:mt-10"
				>
					<h1 className="text-center title mb-2">User Login</h1>
					<hr className="border-gray-400" />
					<input
						type="email"
						id="email"
						onChange={(e) => dispatch(setEmail(e.target.value))}
						minLength={20}
						maxLength={50}
						value={email}
						className={`w-full border ${
							isUserExist ? "border-gray-500" : "border-red-500"
						} mt-5 p-3 rounded-md`}
						placeholder="Student / Staff Email Address"
						required
					/>
					<div className="relative z-0">
						<input
							type={viewPassword ? "text" : "password"}
							id="password"
							minLength={8}
							maxLength={30}
							value={password}
							onChange={(e) => dispatch(setPassword(e.target.value))}
							className={`w-full form-control my-5 border ${
								isPasswordCorrect ? "border-gray-500" : "border-red-500"
							} p-3 rounded-md`}
							placeholder="Password"
							required
						/>
						<BsEyeFill
							className="absolute top-9 right-2 text-xl cursor-pointer hover:text-blue-600"
							onClick={() => dispatch(setViewPassword())}
						/>
					</div>
					<button className="btn-blue block w-1/2 mx-auto mt-5">LOGIN</button>
					<p
						className="text-center block mt-5 text-blue-600 cursor-pointer text-sm"
						onClick={() => navigate("/recover-password")}
					>
						Forgot password?
					</p>
				</form>
				<h2 className="text-center my-4">OR</h2>
				<button
					className="btn-green block mx-auto mb-3"
					onClick={() => dispatch(setDisplayRegForm())}
				>
					Register New Account
				</button>
			</div>
			<footer className="bg-gray-700 py-1 fixed bottom-0 w-full">
				<p className="text-white text-center m-0 text-xs">
					Copyright &#169; 2024
				</p>
			</footer>
		</div>
	);
};

export default Login;
