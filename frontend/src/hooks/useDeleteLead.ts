import { useState } from "react";
import { deleteLead } from "@/api/leads";
import { getErrorMessage } from "@/utils/errors";

export const useDeleteLead = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteLead(id);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    }
  };

  return { deleteLead: mutate, isLoading, error };
};
