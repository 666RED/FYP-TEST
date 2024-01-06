import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = () => {
	return (
		<div className="z-3 position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-dark opacity-75">
			<Oval />
		</div>
	);
};

export default Spinner;
