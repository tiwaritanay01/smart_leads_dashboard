import type { LeadSort } from "@/api/leads";
import type { LeadSource, LeadStatus } from "@/types/lead";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface LeadFiltersProps {
  status?: LeadStatus;
  source?: LeadSource;
  search: string;
  sort: LeadSort;
  onChange: (updates: {
    status?: LeadStatus;
    source?: LeadSource;
    search?: string;
    sort?: LeadSort;
  }) => void;
  onClear: () => void;
}

const LeadFilters = ({ status, source, search, sort, onChange, onClear }: LeadFiltersProps) => {
  return (
    <div className="grid gap-4 rounded-3xl border border-ink/10 bg-white/70 p-6 shadow-soft md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
      <Input
        label="Search"
        placeholder="Search by name or email"
        value={search}
        onChange={(event) => onChange({ search: event.target.value })}
      />
      <Select
        label="Status"
        value={status ?? ""}
        onChange={(event) =>
          onChange({
            status: event.target.value
              ? (event.target.value as LeadStatus)
              : undefined
          })
        }
        options={[
          { label: "All", value: "" },
          { label: "New", value: "New" },
          { label: "Contacted", value: "Contacted" },
          { label: "Qualified", value: "Qualified" },
          { label: "Lost", value: "Lost" }
        ]}
      />
      <Select
        label="Source"
        value={source ?? ""}
        onChange={(event) =>
          onChange({
            source: event.target.value
              ? (event.target.value as LeadSource)
              : undefined
          })
        }
        options={[
          { label: "All", value: "" },
          { label: "Website", value: "Website" },
          { label: "Instagram", value: "Instagram" },
          { label: "Referral", value: "Referral" }
        ]}
      />
      <Select
        label="Sort"
        value={sort}
        onChange={(event) => onChange({ sort: event.target.value as LeadSort })}
        options={[
          { label: "Latest", value: "latest" },
          { label: "Oldest", value: "oldest" }
        ]}
      />
      <div className="flex items-end">
        <Button type="button" variant="ghost" onClick={onClear}>
          Clear filters
        </Button>
      </div>
    </div>
  );
};

export default LeadFilters;
