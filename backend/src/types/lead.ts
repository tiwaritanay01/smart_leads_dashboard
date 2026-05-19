export enum LeadStatus {
  New = "New",
  Contacted = "Contacted",
  Qualified = "Qualified",
  Lost = "Lost"
}

export enum LeadSource {
  Website = "Website",
  Instagram = "Instagram",
  Referral = "Referral"
}

export interface ILead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
  createdBy: string;
}
