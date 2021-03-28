import express, { Application } from 'express';
import { connect as db_connect, ConnectOptions } from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import appointment from './controllers/appointment';

dotenv.config();

const run = async () => {
	const DB_URI = process.env['DB_URI'];
	if (DB_URI) {
		const db_options: ConnectOptions = {
			user: process.env['DB_UID'],
			pass: process.env['DB_PWD'],
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		try {
			const db_connection = await db_connect(DB_URI, db_options);
		} catch {
			process.exit(1);
		}

		const app: Application = express();
		app.use(cors());
		app.use(express.json());

		app.use('/appointment', appointment);

		const PORT = 3001;
		app.listen(PORT, () => {
			console.log(`Example app listening at http://localhost:${PORT}`);
		});
	}
};

run().catch((error) => console.error(error.stack));
