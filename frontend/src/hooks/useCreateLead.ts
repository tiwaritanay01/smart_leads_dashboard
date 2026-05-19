import { useState } from "react";
import type { Lead } from "@/types/lead";
import type { LeadPayload } from "@/api/leads";
import { createLead } from "@/api/leads";
import { getErrorMessage } from "@/utils/errors";

export const useCreateLead = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (payload: LeadPayload): Promise<Lead> => {
    setIsLoading(true);
    setError(null);

    try {
      const lead = await createLead(payload);
      setIsLoading(false);
      return lead;
    } catch (err) {
      setIsLoading(false);
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    }
  };

  return { createLead: mutate, isLoading, error };
};
