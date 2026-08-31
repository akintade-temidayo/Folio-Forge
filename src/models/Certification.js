import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema(
{
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
},
title: {
    type: String,
    required: [true, 'Please provide a certification title'],
    trim: true,
},
fileUrl: {
    type: String,
    required: [true, 'Please provide an image, document, or URL for the certificate'],
    trim: true,
},
issueDate: {
    type: String,
    required: [true, 'Please provide an issue date'],
    trim: true,
},
credentialId: {
    type: String,
    required: true,
    trim: true,
},
},
{
timestamps: true,
collection: 'certifications',
}
);

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);