import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
{
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
name: {
    type: String,
    required: [true, 'Please provide a category name'],
    trim: true,
},
slug: {
    type: String,
    required: true,
    lowercase: true,
},
sortOrder: {
    type: Number,
    default: 0,
},
},
{ timestamps: true }
);

// Ensures a category slug is unique PER USER, not globally
CategorySchema.index({ userId: 1, slug: 1 }, { unique: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);