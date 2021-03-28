import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrecautionsPage from './pages/Precautions';
import AppointmentPage from './pages/Appointment';
import { HomePage } from './pages/Home';
import { Menu } from './components/Menu';

function App() {
	return (
		<Router>
			<Menu />
			<Switch>
				<Route path="/appointment">
					<AppointmentPage />
				</Route>
				<Route path="/precautions">
					<PrecautionsPage />
				</Route>
				<Route path="/">
					<HomePage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
