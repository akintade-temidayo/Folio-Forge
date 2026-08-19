import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
{
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
clientName: { type: String, required: true },
clientRole: { type: String },
comment: { type: String, required: true },
rating: { type: Number, default: 5 },
isApproved: { type: Boolean, default: true },
},
{ timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);