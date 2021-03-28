import mongoose, { model, Schema, Types } from 'mongoose';

export const name = 'Disease';

export const schema = new Schema({
	type: String,
	description: String,
	precautions: [String],
});

const DoctorType = model(name, schema);
export default DoctorType;
