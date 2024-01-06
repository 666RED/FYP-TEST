import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
// use later
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<SnackbarProvider autoHideDuration={3000} maxSnack={2}>
			<App />
		</SnackbarProvider>
	</BrowserRouter>
);
