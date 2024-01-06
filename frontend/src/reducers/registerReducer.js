export const INITIAL_STATE = {
	name: "",
	gender: "",
	email: "",
	phoneNumber: "",
	password: "",
	viewMode: "password",
	validPhoneNumber: true,
	validEmail: true,
	loading: false,
};

export const registerReducer = (state, action) => {
	switch (action.type) {
		case "SET_NAME":
			return {
				...state,
				name: action.payload,
			};
		case "SET_GENDER":
			return {
				...state,
				gender: action.payload,
			};
		case "SET_EMAIL":
			return {
				...state,
				email: action.payload,
			};
		case "SET_PHONE_NUMBER":
			const reg = /[0-9]/;
			if (
				!reg.test(action.payload.charAt(action.payload.length - 1)) &&
				action.payload.length !== 0
			) {
				return {
					...state,
				};
			}
			if (action.payload.length > 11) {
				return {
					...state,
				};
			}
			return {
				...state,
				phoneNumber: action.payload,
			};
		case "SET_PASSWORD":
			return {
				...state,
				password: action.payload,
			};
		case "TOGGLE_PASSWORD":
			state.viewMode = state.viewMode === "password" ? "text" : "password";
			return {
				...state,
			};
		case "INVALID_EMAIL":
			return {
				...state,
				validEmail: false,
				validPhoneNumber: true,
			};
		case "INVALID_PHONE_NUMBER":
			return {
				...state,
				validEmail: true,
				validPhoneNumber: false,
			};
		case "LOADING":
			return {
				...state,
				loading: true,
			};
		case "EMAIL_EXISTED":
			return {
				...state,
				validEmail: false,
				validPhoneNumber: true,
			};
		case "PHONE_NUMBER_EXISTED":
			return {
				...state,
				validEmail: true,
				validPhoneNumber: false,
			};
		case "SUCCESS_REGISTER":
			return {
				...state,
				validEmail: true,
				validPhoneNumber: true,
			};
		case "LOADING_FALSE":
			return {
				...state,
				loading: false,
			};
		default:
	}
};
