import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Search } from '../components/Search';
// import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";

interface Appointment {
	doctor_id: {
		name: String;
		type: {
			type: String;
		};
		cell: String;
	};
	start_time: String;
	end_time: String;
}

class AppointmentPage extends React.Component {
	state = {
		query: '',
		appointments: null,
		types: null,
	};
	handleChange = async (event: any) => {
		await this.setState({ query: event.target.value });
	};
	handleSubmit = async (event: any) => {
		await event.preventDefault();
		const URL = 'http://127.0.0.1:3001/appointment/symptoms';
		const HEADERS = {
			'Content-Type': 'application/json',
		};
		const DATA = {
			query: this.state.query,
		};
		const CONFIG: AxiosRequestConfig = {
			method: 'post',
			headers: HEADERS,
			data: DATA,
		};
		const response: AxiosResponse = await axios(URL, CONFIG);
		let data: any = response.data;
		await this.setState({
			types: data.types,
			appointments: data.appointments,
		});
	};
	renderTypes = (props: any) => {
		let els = [];
		const types = props.types;
		if (types !== null && types !== undefined && types[0] !== undefined) {
			for (let type of types) {
				els.push(<div>{type.type}</div>);
			}
		}
		return <div>{els}</div>;
	};
	renderAppointments = (props: any) => {
		let els = [];
		const appointments: Appointment[] = props.appointments;
		if (appointments !== null && appointments !== undefined  && appointments[0] !== undefined) {
			for (let appointment of appointments) {
				els.push(
					<div>
						<div>Start Time: {appointment.start_time}</div>
						<div>End Time: {appointment.end_time}</div>
						<div>Doctor Name: {appointment.doctor_id.name}</div>
						<div>
							Doctor Type: {appointment.doctor_id.type.type}
						</div>
						<div>Doctor Phone: {appointment.doctor_id.cell}</div>
						<br />
					</div>
				);
			}
		}
		return <div>{els}</div>;
	};
	render() {
		return (
			<div>
				<Search
					query={this.state.query}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
				<this.renderTypes types={this.state.types} />
				<br />
				<this.renderAppointments
					appointments={this.state.appointments}
				/>
			</div>
		);
	}
}

export default AppointmentPage;
