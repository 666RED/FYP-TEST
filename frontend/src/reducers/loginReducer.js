export const INITIAL_STATE = {
	isUserExist: true,
	isPasswordCorrect: true,
};

export const loginReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				isUserExist: true,
				isPasswordCorrect: true,
			};
		case "USER_NOT_EXIST":
			return {
				isUserExist: false,
				isPasswordCorrect: true,
			};
		case "INCORRECT_PASSWORD":
			return {
				isUserExist: true,
				isPasswordCorrect: false,
			};
		default:
			return {
				isUserExist: false,
				isPasswordCorrect: false,
			};
	}
};
