import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Disease {
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
	renderDiseases = (props: any) => {
		let els = [];
		const diseases = props.diseases;
		if (diseases !== null) {
			for (let disease of diseases) {
				let prec_els: any = [];
				if (disease.precautions != null) {
					for (let precaution of disease.precautions) {
						prec_els.push(<>{precaution}, </>);
					}
				}
				els.push(
					<div>
						<div>{disease.type}</div>
						<div>{disease.description}</div>
						<div>{prec_els}</div>
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
				<form onSubmit={this.handleSubmit}>
					<input
						value={this.state.query}
						onChange={this.handleChange}
					/>
					<input type="submit" />
				</form>
				<pre>
					<this.renderDiseases diseases={this.state.diseases} />
				</pre>
			</div>
		);
	}
}

export default PrecautionsPage;
