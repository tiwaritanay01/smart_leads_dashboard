import { z } from "zod";
import { LeadSource, LeadStatus } from "@/types/lead";

const emptyToUndefined = (value: unknown): unknown => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

export const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  status: z.nativeEnum(LeadStatus),
  source: z.nativeEnum(LeadSource)
});

export const updateLeadSchema = z
  .object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
  });

export const leadQuerySchema = z.object({
  status: z.nativeEnum(LeadStatus).optional(),
  source: z.nativeEnum(LeadSource).optional(),
  search: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(10).default(10),
  sort: z.enum(["latest", "oldest"]).default("latest")
});

export const leadIdSchema = z.object({
  id: z.string().min(1)
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadQueryInput = z.infer<typeof leadQuerySchema>;
export type LeadIdParams = z.infer<typeof leadIdSchema>;
