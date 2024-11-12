import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    password: string;
    isAdmin: boolean;
    hasVoted: boolean;
    votedFor: Types.ObjectId | null;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username cannot exceed 30 chars!"],
        match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [3, "Password must be at least 3 characters long"],
        maxlength: [30, "Password cannot exceed 30 chars!"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasVoted: {
        type: Boolean,
        default: false
    },
    votedFor: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
        default: null
    }
});

declare global {
    namespace Express {
      interface Request {
        user: IUser;  
      }
    }
  }

export default mongoose.model<IUser>("User", UserSchema);
