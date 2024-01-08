import { Routes, Route } from "react-router-dom";
import Login from "./pages/loginPages/login.js";
import Homepage from "./pages/homepages/homepage.js";
import RecoverPassword from "./pages/recoverPasswordPages/recoverPassword.js";
import AuthVerificationCode from "./pages/recoverPasswordPages/authVerificationCode.js";
import ResetPassword from "./pages/recoverPasswordPages/resetPassword.js";
import Profile from "./pages/profilePages/userProfile.js";
import EditProfile from "./pages/profilePages/editProfile.js";
import ViewFriends from "./pages/profilePages/viewFriends.js";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/home/:userId" element={<Homepage />} />
			<Route path="/recover-password" element={<RecoverPassword />} />
			<Route
				path="/recover-password/auth/:userId"
				element={<AuthVerificationCode />}
			/>
			<Route
				path="/recover-password/reset-password/:userId"
				element={<ResetPassword />}
			/>
			<Route path="/profile/:userId" element={<Profile />} />
			<Route path="/profile/edit-profile/:userId" element={<EditProfile />} />
			<Route path="/profile/view-friends/:userId" element={<ViewFriends />} />
		</Routes>
	);
}

export default App;
