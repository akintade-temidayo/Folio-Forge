import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
{
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
},
title: {
    type: String,
    required: [true, 'Please provide a service title'],
    trim: true,
},
description: {
    type: String,
    required: [true, 'Please provide a service description'],
    trim: true,
},
minPrice: {
    type: Number,
    default: 0,
},
maxPrice: {
    type: Number,
    default: 0,
},
icon: {
    type: String,
    default: 'Video',
},
},
{ timestamps: true }
);

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);