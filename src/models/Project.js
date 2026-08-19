import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
{
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
projectType: {
    type: String,
    enum: ['video', 'picture'],
    required: true,
    default: 'video',
},
title: { type: String, required: true },
slug: { type: String, unique: true, sparse: true },
category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

// Video-type fields
videoUrl: {
    type: String,
    required: function () {
    return this.projectType === 'video';
    },
},
previewClip: { type: String },

// Picture-type fields
images: {
    type: [String],
    validate: {
    validator: function (arr) {
        if (this.projectType !== 'picture') return true;
        return Array.isArray(arr) && arr.length > 0 && arr.length <= 4;
    },
    message: 'Picture projects need between 1 and 4 images.',
    },
},
externalLink: { type: String },

completionDate: { type: Date },
description: { type: String },
isFeatured: { type: Boolean, default: false },
},
{ timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);