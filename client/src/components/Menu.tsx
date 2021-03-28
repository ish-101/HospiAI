import { Link } from 'react-router-dom';
import { FaRegHospital } from 'react-icons/fa';
import './Menu.scss';

export function Menu() {
	return (
		<nav className="menu">
			<ul>
				<li className="menu-home">
					<Link to="/">
						<FaRegHospital size="1.5rem" />
					</Link>
				</li>
				<li>
					<Link to="/precautions">Diagnosis</Link>
				</li>
				<li>
					<Link to="/appointment">Appointment</Link>
				</li>
			</ul>
		</nav>
	);
}
