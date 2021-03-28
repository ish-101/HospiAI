import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import express, { Application, Request, Response } from 'express';
import Disease from '../models/disease';
import OpenAIResult from '../models/openai_result';

const app: Application = express();

app.post('/symptoms', async (req: Request, res: Response) => {
	let response: any = {};
	try {
		const query = req.body.query;

		const disaease_data = await Disease.find({});
		const disaease_types = disaease_data.map(
			(disaease: any) => disaease.type
		);

		const URL = `https://api.openai.com/v1/engines/davinci/search`;
		const HEADERS = {
			Authorization: `Bearer ${process.env['OPENAI_KEY']}`,
			'Content-Type': 'application/json',
		};
		const DATA = {
			documents: disaease_types,
			query: query,
		};
		const CONFIG: AxiosRequestConfig = {
			method: 'post',
			headers: HEADERS,
			data: DATA,
		};
		const openaiResponse: AxiosResponse = await axios(URL, CONFIG);
		let data: OpenAIResult[] = openaiResponse.data.data;
		data = data.sort((a, b) => b.score - a.score);
		const chosen_categories_data: OpenAIResult[] = data.slice(0, 4);
		const chosen_categories = chosen_categories_data.map(
			(c: any) => disaease_data[c.document]
		);

		response = chosen_categories;
	} catch {}
	res.send(response);
});

export default app;
