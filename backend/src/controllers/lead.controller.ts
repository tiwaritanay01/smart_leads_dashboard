import type { Request, Response } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { AppError } from "@/utils/appError";
import { leadsToCsv } from "@/utils/csv";
import type { PaginatedResponse } from "@/types/api";
import type { ILead } from "@/types/lead";
import type {
  CreateLeadInput,
  LeadIdParams,
  LeadQueryInput,
  UpdateLeadInput
} from "@/validators/lead.validator";
import {
  createLead,
  deleteLead,
  exportLeads,
  getLeadById,
  getLeads,
  updateLead
} from "@/services/lead.service";

export const listLeads = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as LeadQueryInput;
  const { leads, total } = await getLeads(query);
  const totalPages = Math.ceil(total / query.limit);

  const payload: PaginatedResponse<ILead> = {
    data: leads,
    total,
    page: query.page,
    limit: query.limit,
    totalPages
  };

  res.status(200).json({
    success: true,
    message: "Leads fetched",
    data: payload
  });
});

export const getLead = asyncHandler(async (req: Request, res: Response) => {
  const params = req.params as LeadIdParams;
  const lead = await getLeadById(params.id);

  res.status(200).json({
    success: true,
    message: "Lead fetched",
    data: lead
  });
});

export const createLeadRecord = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const payload = req.body as CreateLeadInput;
  const lead = await createLead(payload, req.user.userId);

  res.status(201).json({
    success: true,
    message: "Lead created",
    data: lead
  });
});

export const updateLeadRecord = asyncHandler(async (req: Request, res: Response) => {
  const params = req.params as LeadIdParams;
  const payload = req.body as UpdateLeadInput;
  const lead = await updateLead(params.id, payload);

  res.status(200).json({
    success: true,
    message: "Lead updated",
    data: lead
  });
});

export const deleteLeadRecord = asyncHandler(async (req: Request, res: Response) => {
  const params = req.params as LeadIdParams;
  await deleteLead(params.id);

  res.status(200).json({
    success: true,
    message: "Lead deleted"
  });
});

export const exportLeadsCsv = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as LeadQueryInput;
  const leads = await exportLeads(query);
  const csv = leadsToCsv(leads);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
  res.status(200).send(csv);
});
