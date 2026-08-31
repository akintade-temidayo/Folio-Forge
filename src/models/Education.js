import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema(
{
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
},
institution: {
    type: String,
    required: [true, 'Please provide an institution name'],
    trim: true,
},
degree: {
    type: String,
    required: [true, 'Please provide a degree or qualification'],
    trim: true,
},
fieldOfStudy: {
    type: String,
    trim: true,
    default: '',
},
startDate: {
    type: String,
    required: [true, 'Please provide a start date'],
    trim: true,
},
endDate: {
    type: String,
    required: [true, 'Please provide an end date or select Present'],
    trim: true,
},
grade: {
    type: String,
    trim: true,
    default: '',
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
collection: 'education',
}
);

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);