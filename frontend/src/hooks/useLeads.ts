import { useCallback, useEffect, useState } from "react";
import type { Lead } from "@/types/lead";
import type { LeadQuery, LeadSort } from "@/api/leads";
import { fetchLeads } from "@/api/leads";
import { useDebounce } from "@/hooks/useDebounce";
import { getErrorMessage } from "@/utils/errors";

interface UseLeadsState {
  leads: Lead[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  filters: LeadQuery & { search: string; sort: LeadSort };
}

const defaultFilters: UseLeadsState["filters"] = {
  status: undefined,
  source: undefined,
  search: "",
  sort: "latest",
  page: 1,
  limit: 10
};

export const useLeads = () => {
  const [state, setState] = useState<UseLeadsState>({
    leads: [],
    total: 0,
    totalPages: 1,
    isLoading: false,
    error: null,
    filters: defaultFilters
  });

  const debouncedSearch = useDebounce(state.filters.search, 400);

  const loadLeads = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const payload = await fetchLeads({
        ...state.filters,
        search: debouncedSearch || undefined
      });

      setState((prev) => ({
        ...prev,
        leads: payload.data,
        total: payload.total,
        totalPages: Math.max(1, payload.totalPages),
        isLoading: false
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: getErrorMessage(error)
      }));
    }
  }, [state.filters, debouncedSearch]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const updateFilters = (updates: Partial<UseLeadsState["filters"]>) => {
    setState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...updates,
        page: updates.page ?? 1
      }
    }));
  };

  const setPage = (page: number) => {
    updateFilters({ page });
  };

  const resetFilters = () => {
    setState((prev) => ({ ...prev, filters: { ...defaultFilters } }));
  };

  return {
    ...state,
    setFilters: updateFilters,
    setPage,
    resetFilters,
    refresh: loadLeads
  };
};
