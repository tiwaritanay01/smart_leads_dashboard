import api from "@/api/axios";
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type { Lead, LeadSource, LeadStatus } from "@/types/lead";

export type LeadSort = "latest" | "oldest";

export interface LeadQuery {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: LeadSort;
  page?: number;
  limit?: number;
}

export interface LeadPayload {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

const unwrap = <T,>(response: ApiResponse<T>): T => {
  if (!response.data) {
    throw new Error(response.message);
  }
  return response.data;
};

export const fetchLeads = async (
  query: LeadQuery
): Promise<PaginatedResponse<Lead>> => {
  const { data } = await api.get<ApiResponse<PaginatedResponse<Lead>>>(
    "/leads",
    { params: query }
  );

  return unwrap(data);
};

export const fetchLeadById = async (id: string): Promise<Lead> => {
  const { data } = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
  return unwrap(data);
};

export const createLead = async (payload: LeadPayload): Promise<Lead> => {
  const { data } = await api.post<ApiResponse<Lead>>("/leads", payload);
  return unwrap(data);
};

export const updateLead = async (
  id: string,
  payload: Partial<LeadPayload>
): Promise<Lead> => {
  const { data } = await api.put<ApiResponse<Lead>>(`/leads/${id}`, payload);
  return unwrap(data);
};

export const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

export const exportLeadsCsv = async (query: LeadQuery): Promise<Blob> => {
  const { data } = await api.get<Blob>("/leads/export", {
    params: query,
    responseType: "blob"
  });

  return data;
};
