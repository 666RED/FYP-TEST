import { User } from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
	try {
		const { userId } = req.query;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(400).json({ msg: "User not found" });
		}

		delete user.userPassword;

		res.status(200).json({ msg: "Success", user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const editProfile = async (req, res) => {
	try {
		const { userId, bio } = req.body;

		const profileImage = req.files && req.files.profileImage;
		const coverImage = req.files && req.files.coverImage;

		let user;

		if (!profileImage && !coverImage) {
			user = await User.findByIdAndUpdate(
				userId,
				{
					$set: {
						"userProfile.profileObj.profileBio": bio,
					},
				},
				{ new: true }
			);
		} else if (!profileImage) {
			user = await User.findByIdAndUpdate(
				userId,
				{
					$set: {
						"userProfile.profileObj.profileCoverImagePath":
							coverImage[0].filename,
						"userProfile.profileObj.profileBio": bio,
					},
				},
				{ new: true }
			);
		} else if (!coverImage) {
			user = await User.findByIdAndUpdate(
				userId,
				{
					$set: {
						"userProfile.profileObj.profileImagePath": profileImage[0].filename,
						"userProfile.profileObj.profileBio": bio,
					},
				},
				{ new: true }
			);
		} else {
			user = await User.findByIdAndUpdate(
				userId,
				{
					$set: {
						"userProfile.profileObj.profileImagePath": profileImage[0].filename,
						"userProfile.profileObj.profileCoverImagePath":
							coverImage[0].filename,
						"userProfile.profileObj.profileBio": bio,
					},
				},
				{ new: true }
			);
		}

		if (!user) {
			return res.status(400).json({ msg: "User not found" });
		}

		res.status(200).json({ msg: "Success", user });
	} catch (err) {
		console.log(err);

		res.status(500).json({ error: err.message });
	}
};
