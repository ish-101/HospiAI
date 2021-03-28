import React from 'react';
import './Home.scss';
import Logo from '../logo.png';

export function HomePage() {
	return (
		<div className="logo">
			<img src={Logo} />
            <p className='tag'>Get Appointments. Get Diagnosed.</p>
		</div>
	);
}
