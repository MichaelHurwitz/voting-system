import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICandidate extends Document {
  _id: Types.ObjectId;
  name: string;
  image: string;
  votes: number;
}

const CandidateSchema = new Schema<ICandidate>({
  name: {
    type: String,
    required: [true, "Candidate name is required"],
    trim: true,
    minlength: [2, "Candidate name must be at least 2 characters long"],
    maxlength: [50, "Candidate name cannot exceed 50 characters"],
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
  },
  votes: {
    type: Number,
    default: 0,
    min: [0, "Votes cannot be negative"],
  },
});

export default mongoose.model<ICandidate>("Candidate", CandidateSchema);
