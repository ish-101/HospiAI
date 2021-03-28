import mongoose, { model, Schema, Types } from 'mongoose';
import Doctor from './doctor';

export const name = 'Appointment';

export const schema = new Schema({
	doctor_id: { type: Types.ObjectId, ref: 'Doctor' },
	start_time: String,
	end_time: String,
});

const Appointment = model(name, schema);
export default Appointment;
