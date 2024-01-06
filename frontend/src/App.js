import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import Homepage from "./pages/homepage.js";
import RecoverPassword from "./pages/recoverPassword.js";
import AuthVerificationCode from "./pages/authVerificationCode.js";
import ResetPassword from "./pages/resetPassword.js";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/home" element={<Homepage />} />
			<Route path="/recover-password" element={<RecoverPassword />} />
			<Route
				path="/recover-password/auth/:userId"
				element={<AuthVerificationCode />}
			/>
			<Route
				path="/recover-password/reset-password/:userId"
				element={<ResetPassword />}
			/>
		</Routes>
	);
}

export default App;
