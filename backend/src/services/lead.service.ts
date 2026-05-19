import mongoose, { type QueryFilter } from "mongoose";
import { LeadModel, LeadDocument } from "@/models/Lead";
import type { ILead, LeadSource, LeadStatus } from "@/types/lead";
import type {
  CreateLeadInput,
  LeadQueryInput,
  UpdateLeadInput
} from "@/validators/lead.validator";
import { AppError } from "@/utils/appError";

const toLead = (lead: LeadDocument): ILead => {
  return {
    _id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    createdAt: lead.createdAt,
    createdBy: lead.createdBy.toString()
  };
};

const buildQuery = (filters: {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
}): QueryFilter<LeadDocument> => {
  const query: QueryFilter<LeadDocument> = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.source) {
    query.source = filters.source;
  }

  if (filters.search) {
    const regex = new RegExp(filters.search, "i");
    query.$or = [{ name: regex }, { email: regex }];
  }

  return query;
};

export const getLeads = async (
  filters: LeadQueryInput
): Promise<{ leads: ILead[]; total: number }> => {
  const query = buildQuery(filters);
  const sortDirection = filters.sort === "oldest" ? 1 : -1;
  const skip = (filters.page - 1) * filters.limit;

  const [leads, total] = await Promise.all([
    LeadModel.find(query)
      .sort({ createdAt: sortDirection })
      .skip(skip)
      .limit(filters.limit),
    LeadModel.countDocuments(query)
  ]);

  return { leads: leads.map(toLead), total };
};

export const getLeadById = async (id: string): Promise<ILead> => {
  const lead = await LeadModel.findById(id);

  if (!lead) {
    throw new AppError("Lead not found", 404);
  }

  return toLead(lead);
};

export const createLead = async (
  payload: CreateLeadInput,
  userId: string
): Promise<ILead> => {
  const lead = await LeadModel.create({
    ...payload,
    createdBy: userId
  });

  return toLead(lead);
};

export const updateLead = async (
  id: string,
  payload: UpdateLeadInput
): Promise<ILead> => {
  const lead = await LeadModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });

  if (!lead) {
    throw new AppError("Lead not found", 404);
  }

  return toLead(lead);
};

export const deleteLead = async (id: string): Promise<void> => {
  const lead = await LeadModel.findByIdAndDelete(id);

  if (!lead) {
    throw new AppError("Lead not found", 404);
  }
};

export const exportLeads = async (filters: LeadQueryInput): Promise<ILead[]> => {
  const query = buildQuery(filters);
  const sortDirection = filters.sort === "oldest" ? 1 : -1;

  const leads = await LeadModel.find(query).sort({ createdAt: sortDirection });
  return leads.map(toLead);
};
