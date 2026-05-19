import { Schema, model, Types } from "mongoose";
import { ILead, LeadSource, LeadStatus } from "@/types/lead";

export interface LeadDocument extends Omit<ILead, "_id" | "createdBy"> {
  _id: Types.ObjectId;
  createdBy: Types.ObjectId;
}

const LeadSchema = new Schema<LeadDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      required: true
    },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

LeadSchema.index({ status: 1 });
LeadSchema.index({ source: 1 });
LeadSchema.index({ name: 1 });
LeadSchema.index({ email: 1 });
LeadSchema.index({ status: 1, source: 1, createdAt: -1 });

export const LeadModel = model<LeadDocument>("Lead", LeadSchema);
