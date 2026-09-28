import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
{
name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
},
email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
},
phoneNumber: {
    type: String,
    trim: true,
    default: '',
},
password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
},
handle: {
    type: String,
    required: [true, 'Please provide a unique handle/username'],
    unique: true,
    lowercase: true,
    trim: true,
},
bio: {
    type: String,
    default: '',
},
avatarUrl: {
    type: String,
    default: '',
},
resumeUrl: {
    type: String,
    default: '',
},
resumeFileName: {
    type: String,
    default: '',
},
role: {
    type: String,
    enum: ['super_admin', 'talent'],
    default: 'talent',
},
resetCode: {
    type: String,
    default: null,
},
resetCodeExpiry: {
    type: Date,
    default: null,
},
resetCodeAttempts: {
    type: Number,
    default: 0,
},
resetCodeLastRequestedAt: {
    type: Date,
    default: null,
},
sessionVersion: {
    type: Number,
    default: 0,
},
socialLinks: {
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    github: { type: String, default: '' },
},
expertise: {
    type: [String],
    default: [],
},
skills: {
    type: [String],
    default: [],
},
portfolioTheme: {
    type: String,
    default: 'espresso',
},
portfolioTemplate: {
    type: String,
    default: 'modern',
},
},
{
timestamps: true,
collection: 'users',
toJSON: { virtuals: true },
toObject: { virtuals: true },
}
);

UserSchema.virtual('certifications', {
ref: 'Certification',
localField: '_id',
foreignField: 'user',
});

// Added Virtual relationship for Education
UserSchema.virtual('education', {
ref: 'Education',
localField: '_id',
foreignField: 'user',
});

// Next.js dev can retain the compiled Mongoose model while this module reloads.
// Extend that cached model too, so newly added profile fields remain writable.
if (mongoose.models.User) {
mongoose.models.User.schema.add({
    resumeUrl: { type: String, default: '' },
    resumeFileName: { type: String, default: '' },
});
}

export default mongoose.models.User || mongoose.model('User', UserSchema);
