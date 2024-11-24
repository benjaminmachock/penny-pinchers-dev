// REVIEW (SCHEMA ONLY) - ! (NOT A MODEL - SUBDOCUMENT SCHEMA FOR THOUGHT MODEL)
import { Schema, Document, ObjectId, Types } from "mongoose";

interface iReview extends Document {
  reviewId: ObjectId;
  reviewBody: string;
  username: string;
  createdAt: Date;
}

const formatTimeStamp = (timestamp: Date | undefined): string => {
  return timestamp ? timestamp.toLocaleDateString("en-US") : "";
};

const reviewSchema = new Schema<iReview>({
  reviewId: {
    //use mongoose's objectid data type
    type: Schema.Types.ObjectId,
    //default value is set to a new object data type
    default: () => new Types.ObjectId(),
  },
  reviewBody: {
    type: String,
    required: true,
    //add length validation
    minLength: 1,
    maxLength: 2800,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    //set default value to current timestamp
    default: Date.now,
    //getter method to format timestamp
    get: formatTimeStamp as any,
  },
});

//exported to Thought
export { reviewSchema, iReview };
