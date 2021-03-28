import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import express, { Application, Request, Response } from 'express';
import mongoose, { model, Schema, Types } from 'mongoose';
import Appointment from '../models/appointment';
import Doctor from '../models/doctor';
import DoctorType from '../models/doctor_type';

interface SearchResult {
	document: number;
	score: number;
}

const app: Application = express();

app.post('/symptoms', async (req: Request, res: Response) => {
	let response: any = {};
	try {
		const query = req.body.query;

		const doctor_types_data = await DoctorType.find({});
		const doctor_types = doctor_types_data.map(
			(doctor_type: any) => doctor_type.type
		);

		const URL = `https://api.openai.com/v1/engines/davinci/search`;
		const HEADERS = {
			Authorization: `Bearer ${process.env['OPENAI_KEY']}`,
			'Content-Type': 'application/json',
		};
		const DATA = {
			documents: doctor_types,
			query: query,
		};
		const CONFIG: AxiosRequestConfig = {
			method: 'post',
			headers: HEADERS,
			data: DATA,
		};
		const openaiResponse: AxiosResponse = await axios(URL, CONFIG);
		let data: SearchResult[] = openaiResponse.data.data;
		data = data.sort((a, b) => b.score - a.score);
		const chosen_categories_data: SearchResult[] = data.slice(0, 4);
		const chosen_categories = chosen_categories_data.map(
			(c: any) => doctor_types_data[c.document]
		);
		const chosen_category_ids = chosen_categories.map(
			(c: any) => c._id
		);

		const chosen_doctors_data = await Doctor.find({
			type: { $in: chosen_category_ids },
		}).exec();
		const chosen_doctors = chosen_doctors_data.map((c: any) => c._id);

		let appointments = await Appointment.find({
			doctor_id: { $in: chosen_doctors },
		})
			.populate({
				path: 'doctor_id',
				populate: {
					path: 'type',
				},
			})
			.exec();

		response.types = chosen_categories;
		response.appointments = appointments;
	} catch {}
	res.send(response);
});

export default app;
