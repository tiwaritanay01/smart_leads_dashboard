import { useCallback, useEffect, useState } from "react";
import { fetchLeadById } from "@/api/leads";
import type { Lead } from "@/types/lead";
import { getErrorMessage } from "@/utils/errors";

export const useLeadDetail = (id?: string) => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLead = useCallback(async () => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = await fetchLeadById(id);
      setLead(payload);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setLead(null);
      setError(getErrorMessage(err));
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadLead();
  }, [loadLead]);

  return { lead, isLoading, error, refresh: loadLead };
};
