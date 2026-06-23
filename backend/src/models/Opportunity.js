const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    contactName: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    requirement: {
      type: String,
      required: [true, 'Requirement is required'],
      trim: true,
    },
    estimatedValue: {
      type: Number,
      min: [0, 'Estimated value cannot be negative'],
      default: 0,
    },
    stage: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
      default: 'New',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    nextFollowUpDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Opportunity', opportunitySchema);
