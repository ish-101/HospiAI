import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Diagnosis } from '../components/Diagnosis';


export interface Disease {
	type: String;
	description: String;
	precautions: [String];
}

class PrecautionsPage extends React.Component {
	state = {
		query: '',
		diseases: null,
	};
	handleChange = async (event: any) => {
		await this.setState({ query: event.target.value });
	};
	handleSubmit = async (event: any) => {
		await event.preventDefault();
		const URL = 'http://127.0.0.1:3001/precautions/symptoms';
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
			diseases: data,
		});
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						value={this.state.query}
						onChange={this.handleChange}
					/>
					<input type="submit" />
				</form>
				<div>
					<Diagnosis diseases={this.state.diseases} />
				</div>
			</div>
		);
	}
}

export default PrecautionsPage;
