import type { ILead } from "@/types/lead";

const escapeCsv = (value: string): string => {
  const needsQuotes = /[",\n\r]/.test(value);
  const escaped = value.replace(/"/g, "\"\"");
  return needsQuotes ? `"${escaped}"` : escaped;
};

export const leadsToCsv = (leads: ILead[]): string => {
  const header = ["Name", "Email", "Status", "Source", "CreatedAt"];
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    lead.createdAt instanceof Date
      ? lead.createdAt.toISOString()
      : new Date(lead.createdAt).toISOString()
  ]);

  const lines = rows.map((row) => row.map((value) => escapeCsv(String(value))).join(","));
  return [header.join(","), ...lines].join("\n");
};
