import { useState } from "react";
import type { Lead } from "@/types/lead";
import type { LeadPayload } from "@/api/leads";
import { updateLead } from "@/api/leads";
import { getErrorMessage } from "@/utils/errors";

export const useUpdateLead = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    id: string,
    payload: Partial<LeadPayload>
  ): Promise<Lead> => {
    setIsLoading(true);
    setError(null);

    try {
      const lead = await updateLead(id, payload);
      setIsLoading(false);
      return lead;
    } catch (err) {
      setIsLoading(false);
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    }
  };

  return { updateLead: mutate, isLoading, error };
};
