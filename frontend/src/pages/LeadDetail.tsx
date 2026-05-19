import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import LeadFormModal from "@/components/leads/LeadFormModal";
import RoleGuard from "@/components/auth/RoleGuard";
import { UserRole } from "@/types/user";
import { LeadStatus, LeadSource } from "@/types/lead";
import { useLeadDetail } from "@/hooks/useLeadDetail";
import { useUpdateLead } from "@/hooks/useUpdateLead";
import { useDeleteLead } from "@/hooks/useDeleteLead";
import { formatDate } from "@/utils/format";
import { getErrorMessage } from "@/utils/errors";

const LeadDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { lead, isLoading, error, refresh } = useLeadDetail(id);
  const { updateLead, isLoading: isUpdating } = useUpdateLead();
  const { deleteLead, isLoading: isDeleting } = useDeleteLead();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async (payload: {
    name: string;
    email: string;
    status: LeadStatus;
    source: LeadSource;
  }) => {
    if (!id) {
      return;
    }

    try {
      await updateLead(id, payload);
      toast.success("Lead updated");
      await refresh();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    if (!id || !lead) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${lead.name}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteLead(id);
      toast.success("Lead deleted");
      navigate("/dashboard");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-4 py-10">
        <ErrorState message={error} onRetry={refresh} />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen px-4 py-10">
        <ErrorState message="Lead not found" />
      </div>
    );
  }

  return (
    <AppShell
      title="Lead Overview"
      subtitle="Review details and adjust the lead status as you progress."
      actions={
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>Back</Button>
          <Button onClick={() => setIsModalOpen(true)}>Edit lead</Button>
          <RoleGuard role={UserRole.Admin}>
            <Button variant="danger" onClick={handleDelete} loading={isDeleting}>
              Delete
            </Button>
          </RoleGuard>
        </div>
      }
    >
      <div className="rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-white/90">
              {lead.name}
            </h2>
            <p className="text-sm text-slate dark:text-white/50">{lead.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge label={lead.status} tone={lead.status === "Lost" ? "ember" : "mint"} />
            <Badge label={lead.source} tone={lead.source === "Instagram" ? "ember" : "neutral"} />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-sand/40 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate dark:text-white/40">
              Created at
            </p>
            <p className="mt-2 text-lg font-semibold text-ink dark:text-white/90">
              {formatDate(lead.createdAt)}
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-sand/40 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate dark:text-white/40">
              Status
            </p>
            <p className="mt-2 text-lg font-semibold text-ink dark:text-white/90">
              {lead.status}
            </p>
          </div>
        </div>
      </div>

      <LeadFormModal
        isOpen={isModalOpen}
        lead={lead}
        isLoading={isUpdating || isDeleting}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
      />
    </AppShell>
  );
};

export default LeadDetail;
