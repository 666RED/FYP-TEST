import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		commentDescription: {
			type: String,
			required: true,
		},
		commentLikes: {
			type: Number,
		},
		commentTime: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Comment = mongoose.model("Comment", commentSchema);
