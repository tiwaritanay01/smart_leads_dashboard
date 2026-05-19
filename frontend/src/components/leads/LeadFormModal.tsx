import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Lead } from "@/types/lead";
import type { LeadPayload } from "@/api/leads";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]),
  source: z.enum(["Website", "Instagram", "Referral"])
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormModalProps {
  isOpen: boolean;
  lead?: Lead | null;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (payload: LeadPayload) => Promise<void>;
}

const LeadFormModal = ({
  isOpen,
  lead,
  isLoading,
  onClose,
  onSubmit
}: LeadFormModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "New",
      source: "Website"
    }
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source
      });
    } else {
      reset({
        name: "",
        email: "",
        status: "New",
        source: "Website"
      });
    }
  }, [lead, reset]);

  const submitForm = handleSubmit(async (values) => {
    await onSubmit(values);
    reset({ name: "", email: "", status: "New", source: "Website" });
    onClose();
  });

  return (
    <Modal
      isOpen={isOpen}
      title={lead ? "Edit Lead" : "New Lead"}
      onClose={onClose}
    >
      <form className="space-y-4" onSubmit={submitForm}>
        <Input label="Name" placeholder="Lead name" {...register("name")} error={errors.name?.message} />
        <Input label="Email" type="email" placeholder="Lead email" {...register("email")} error={errors.email?.message} />
        <Select
          label="Status"
          {...register("status")}
          error={errors.status?.message}
          options={[
            { label: "New", value: "New" },
            { label: "Contacted", value: "Contacted" },
            { label: "Qualified", value: "Qualified" },
            { label: "Lost", value: "Lost" }
          ]}
        />
        <Select
          label="Source"
          {...register("source")}
          error={errors.source?.message}
          options={[
            { label: "Website", value: "Website" },
            { label: "Instagram", value: "Instagram" },
            { label: "Referral", value: "Referral" }
          ]}
        />
        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            {lead ? "Save changes" : "Create lead"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LeadFormModal;
