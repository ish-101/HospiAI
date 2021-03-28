import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppointmentPage } from "./pages/Appointment"
import { HomePage } from "./pages/Home"

function App() {
	return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/appointment">Demo Appointment</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route path="/appointment">
					<AppointmentPage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
