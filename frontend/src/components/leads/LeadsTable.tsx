import type { Lead } from "@/types/lead";
import { UserRole } from "@/types/user";
import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import RoleGuard from "@/components/auth/RoleGuard";
import { formatDate } from "@/utils/format";

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const statusTone = (status: Lead["status"]) => {
  if (status === "Qualified") return "mint";
  if (status === "Lost") return "ember";
  if (status === "Contacted") return "ink";
  return "neutral";
};

const sourceTone = (source: Lead["source"]) => {
  if (source === "Instagram") return "ember";
  if (source === "Referral") return "mint";
  return "neutral";
};

const LeadsTable = ({
  leads,
  isLoading,
  error,
  onRetry,
  onEdit,
  onDelete
}: LeadsTableProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-14 animate-pulse rounded-2xl border border-ink/10 bg-white/70"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        title="No leads found"
        description="Try adjusting filters or add your first lead to get started."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-ink/10 bg-white/80 shadow-soft">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-sand/70 text-xs uppercase tracking-[0.2em] text-slate">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Source</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-t border-ink/10">
              <td className="px-6 py-4 font-semibold text-ink">
                <Link
                  to={`/leads/${lead._id}`}
                  className="transition hover:text-ember"
                >
                  {lead.name}
                </Link>
              </td>
              <td className="px-6 py-4 text-slate">{lead.email}</td>
              <td className="px-6 py-4">
                <Badge label={lead.status} tone={statusTone(lead.status)} />
              </td>
              <td className="px-6 py-4">
                <Badge label={lead.source} tone={sourceTone(lead.source)} />
              </td>
              <td className="px-6 py-4 text-slate">
                {formatDate(lead.createdAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="ghost" onClick={() => onEdit(lead)}>
                    Edit
                  </Button>
                  <RoleGuard role={UserRole.Admin}>
                    <Button variant="danger" onClick={() => onDelete(lead)}>
                      Delete
                    </Button>
                  </RoleGuard>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
