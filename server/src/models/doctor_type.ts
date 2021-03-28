import mongoose, { model, Schema, Types } from 'mongoose';

export const name = 'Doctor_Type';

export const schema = new Schema({
	type: String,
});

const DoctorType = model(name, schema);
export default DoctorType;
