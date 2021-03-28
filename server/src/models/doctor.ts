import mongoose, { model, Schema, Types } from 'mongoose';

export const name = 'Doctor';

export const schema = new Schema({
    name: String,
    type:  Types.ObjectId,
    cell: String,
});

const Doctor = model(name, schema);
export default Doctor;