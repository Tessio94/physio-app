import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/shadcn/Button";
import { cn } from "@/lib/utils";

type DeleteFormProps = {
  variant: string;
  dropdownData?: {
    therapists?: { id: number }[];
    services?: { id: number }[];
    therapistServices?: Record<number, number[]>;
  };
};

const endpointsMap = {
  ukloniTerapeuta:
    "http://localhost:3000/api/v1/admin/postavke/delete-therapist",
  ukloniUslugu: "http://localhost:3000/api/v1/admin/postavke/delete-service",
  ukloniUsluguZaTerapeuta:
    "http://localhost:3000/api/v1/admin/postavke/delete-service-for-therapist",
};

const invalidationMap = {
  ukloniTerapeuta: ["usersData"],
  ukloniUslugu: ["usersData"],
  ukloniUsluguZaTerapeuta: ["therapistServicesData"],
};

const DeleteForm = ({ variant, dropdownData = {} }: DeleteFormProps) => {
  const [formData, setFormData] = useState<any>({});
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) =>
      fetch(endpointsMap[variant], {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidationMap[variant] });
      setFormData({});
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderFields = () => {
    if (variant === "ukloniTerapeuta") {
      return (
        <div className="flex flex-col items-start gap-1 px-3">
          <label>Terapeut</label>
          <select
            name="therapist_id"
            className="cursor-pointer rounded-lg border px-3 py-2"
            value={formData.therapist_id || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>
              Odaberi terapeuta
            </option>
            {dropdownData.therapists?.map((therapist) => (
              <option
                key={therapist.id}
                value={therapist.id}
                className="bg-slate-200 text-slate-950"
              >
                {therapist.id}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (variant === "ukloniUslugu") {
      return (
        <div className="flex flex-col items-start gap-1 px-3">
          <label>Usluga</label>
          <select
            name="service_id"
            onChange={handleChange}
            className="cursor-pointer rounded-lg border px-3 py-2"
            value={formData.service_id || ""}
            required
          >
            <option value="" disabled hidden>
              Odaberi uslugu
            </option>
            {dropdownData.services?.map((service) => (
              <option
                key={service.id}
                value={service.id}
                className="bg-slate-200 text-slate-950"
              >
                {service.id}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (variant === "ukloniUsluguZaTerapeuta") {
      const selectedTherapist = formData.therapist_id;
      const servicesForTherapist =
        dropdownData.therapistServices?.[selectedTherapist] || [];

      return (
        <>
          <div className="flex flex-col items-start gap-1 px-3">
            <label>Terapeut</label>
            <select
              name="therapist_id"
              onChange={handleChange}
              className="cursor-pointer rounded-lg border px-3 py-2"
              value={formData.therapist_id || ""}
              required
            >
              <option value="" disabled hidden>
                Odaberi terapeuta
              </option>
              {dropdownData.therapists?.map((therapist) => (
                <option
                  key={therapist.id}
                  value={therapist.id}
                  className="bg-slate-200 text-slate-950"
                >
                  {therapist.id}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start gap-1 px-3">
            <label>Usluga</label>
            <select
              name="service_id"
              onChange={handleChange}
              className={cn(
                "rounded-lg border px-3 py-2",
                selectedTherapist && "cursor-pointer",
              )}
              value={formData.service_id || ""}
              required
              disabled={!selectedTherapist}
            >
              <option value="" disabled hidden>
                Odaberi uslugu
              </option>
              {servicesForTherapist.map((service) => (
                <option
                  key={service}
                  value={service}
                  className="bg-slate-200 text-slate-950"
                >
                  {service}
                </option>
              ))}
            </select>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap rounded-lg border bg-slate-100 px-2 py-2 text-sm font-medium text-slate-500"
    >
      {renderFields()}
      <Button className="h-[38px] self-end" type="submit">
        {mutation.isLoading ? "Brisanje..." : "Ukloni"}
      </Button>
    </form>
  );
};

export default DeleteForm;
