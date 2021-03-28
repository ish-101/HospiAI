import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Search } from '../components/Search';
import {Filter} from '../components/Filter';
import {Schedule} from '../components/Schedule';
// import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";

export interface Appointment {
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
		dsel: [true, true, false, false]
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
	render() {
		return (
			<div>
				<Search
					query={this.state.query}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
				<Schedule dtypes={this.state.types} dsel={this.state.dsel} appointments={this.state.appointments} />
			</div>
		);
	}
}

export default AppointmentPage;
