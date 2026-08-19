import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
{
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
},
role: {
    type: String,
    required: [true, 'Role/Job title is required'],
    trim: true,
},
company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
},
location: {
    type: String,
    trim: true,
    default: '',
},
period: {
    type: String, // e.g., "Jan 2023 - Present" or "2021 - 2022"
    required: [true, 'Period/Duration is required'],
    trim: true,
},
description: {
    type: String,
    trim: true,
    default: '',
},
order: {
    type: Number,
    default: 0,
},
},
{
timestamps: true,
}
);

export default mongoose.models.Experience ||
mongoose.model('Experience', ExperienceSchema);