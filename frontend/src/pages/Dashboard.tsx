import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import LeadFilters from "@/components/leads/LeadFilters";
import LeadsTable from "@/components/leads/LeadsTable";
import LeadFormModal from "@/components/leads/LeadFormModal";
import { useLeads } from "@/hooks/useLeads";
import { useCreateLead } from "@/hooks/useCreateLead";
import { useUpdateLead } from "@/hooks/useUpdateLead";
import { useDeleteLead } from "@/hooks/useDeleteLead";
import { exportLeadsCsv } from "@/api/leads";
import type { Lead } from "@/types/lead";
import { getErrorMessage } from "@/utils/errors";

const Dashboard = () => {
  const {
    leads,
    total,
    totalPages,
    isLoading,
    error,
    filters,
    setFilters,
    setPage,
    resetFilters,
    refresh
  } = useLeads();

  const { createLead, isLoading: isCreating } = useCreateLead();
  const { updateLead, isLoading: isUpdating } = useUpdateLead();
  const { deleteLead, isLoading: isDeleting } = useDeleteLead();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const isSaving = isCreating || isUpdating;

  const stats = useMemo(
    () => [
      { label: "Total leads", value: total },
      { label: "Active filters", value: [filters.status, filters.source, filters.search].filter(Boolean).length },
      { label: "Current page", value: filters.page ?? 1 }
    ],
    [total, filters]
  );

  const openCreateModal = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleSubmit = async (payload: {
    name: string;
    email: string;
    status: Lead["status"];
    source: Lead["source"];
  }) => {
    try {
      if (editingLead) {
        await updateLead(editingLead._id, payload);
        toast.success("Lead updated");
      } else {
        await createLead(payload);
        toast.success("Lead created");
      }

      await refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const handleDelete = async (lead: Lead) => {
    const confirmed = window.confirm(
      `Delete ${lead.name}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteLead(lead._id);
      toast.success("Lead deleted");
      await refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportLeadsCsv({
        ...filters,
        search: filters.search || undefined
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "leads.csv";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <AppShell
      title="Lead Command Center"
      subtitle="Track, qualify, and convert your smartest opportunities."
      actions={
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost" onClick={handleExport}>
            Export CSV
          </Button>
          <Button onClick={openCreateModal}>New Lead</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-ink/10 bg-white/80 p-5 shadow-soft"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate">
                {item.label}
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <LeadFilters
          status={filters.status}
          source={filters.source}
          search={filters.search}
          sort={filters.sort}
          onChange={setFilters}
          onClear={resetFilters}
        />

        <LeadsTable
          leads={leads}
          isLoading={isLoading}
          error={error}
          onRetry={refresh}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate">
            Page {filters.page ?? 1} of {totalPages} • {total} total leads
          </p>
          <Pagination
            currentPage={filters.page ?? 1}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      <LeadFormModal
        isOpen={isModalOpen}
        lead={editingLead}
        isLoading={isSaving}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {isDeleting ? (
        <div className="mt-4 text-sm text-ember">Deleting lead...</div>
      ) : null}
    </AppShell>
  );
};

export default Dashboard;
