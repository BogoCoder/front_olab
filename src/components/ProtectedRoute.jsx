import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
	component: Component,
	isAuthenticated: isAuthenticated,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuthenticated) {
					return <Component {...rest} {...props} />;
				} else {
					console.log("Entró aquí hmmmmm");
					return (
						<Redirect to={{ pathname: "/", state: { from: props.location } }} />
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
