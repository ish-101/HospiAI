import React, { useState } from 'react';
import { Filter } from './Filter';
import { Appointment } from '../pages/Appointment';
import './Schedule.scss';

function Calendar(props: any) {
	let els = [];
	let appointments: Appointment[] = props.appointments;
	if (
		appointments !== null &&
		appointments !== undefined &&
		appointments[0] !== undefined
	) {
		for (let appointment of appointments) {
			els.push(
				<div>
					<div>Start Time: {appointment.start_time}</div>
					<div>End Time: {appointment.end_time}</div>
					<div>Doctor Name: {appointment.doctor_id.name}</div>
					<div>Doctor Type: {appointment.doctor_id.type.type}</div>
					<div>Doctor Phone: {appointment.doctor_id.cell}</div>
					<br />
				</div>
			);
		}
	}
	return <div>{els}</div>;
}

export function Schedule(props: any) {
	return (
		<div>
			<Filter dtypes={props.dtypes} dsel={props.dsel} />
			<Calendar appointments={props.appointments} />
		</div>
	);
}
