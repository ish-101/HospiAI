import mongoose, { model, Schema, Types } from 'mongoose';

export const name = 'Doctor';

export const schema = new Schema({
	name: String,
	type: { type: Types.ObjectId, ref: 'Doctor_Type' },
	cell: String,
});

const Doctor = model(name, schema);
export default Doctor;
