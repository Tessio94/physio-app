import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type TherapistFormData = {
  therapistName: string;
  lastname: string;
  email: string;
  phone: string;
  superadmin: boolean;
  password: string;
  therapistImageUrl: string;
};

type ServiceFormData = {
  serviceName: string;
  serviceImageUrl: string;
};

type TherapistServiceFormData = {
  therapist_id: number;
  service_id: number;
};

type FormDataType =
  | TherapistFormData
  | ServiceFormData
  | TherapistServiceFormData;

type VariantType = "terapeut" | "usluge" | "terapeutUsluge";

type AddFormProps = {
  variant: VariantType;
  dropdownData?: {
    therapists?: { id: number }[];
    services?: { id: number }[];
    therapistServices?: Record<number, number[]>;
  };
};

// const devUrl = import.meta.env.VITE_URL_DEVELOPMENT;
const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

const fieldsAddTherapist = [
  { label: "Ime", name: "therapistName", type: "text", required: true },
  { label: "Prezime", name: "lastname", type: "text", required: true },
  { label: "E-mail", name: "email", type: "text", required: true },
  { label: "Mobitel", name: "phone", type: "text", required: true },
  {
    label: "Superadmin",
    name: "superadmin",
    type: "checkbox",
    required: false,
  },
  { label: "Lozinka", name: "password", type: "password", required: true },
  {
    label: "Slika (url)",
    name: "therapistImageUrl",
    type: "text",
    required: true,
  },
];

const fieldsAddService = [
  { label: "Ime", name: "serviceName", type: "text", required: true },
  {
    label: "Slika (url)",
    name: "serviceImageUrl",
    type: "text",
    required: true,
  },
];

// const fieldsAddServiceForTherapist = [
//   {
//     label: "Terapeut ID",
//     name: "therapist_id",
//     type: "number",
//     required: true,
//   },
//   { label: "Service ID", name: "service_id", type: "number", required: true },
// ];

const variantFieldsMap: Record<
  VariantType,
  { label: string; name: string; type: string; required: boolean }[]
> = {
  terapeut: fieldsAddTherapist,
  usluge: fieldsAddService,
  terapeutUsluge: [],
};

const endpointsMap: Record<VariantType, string> = {
  terapeut: `${prodUrl}/api/v1/admin/postavke/add-therapist`,
  usluge: `${prodUrl}/api/v1/admin/postavke/add-service`,
  terapeutUsluge: `${prodUrl}/api/v1/admin/postavke/add-service-for-therapist`,
};

const invalidationMap: Record<VariantType, string[]> = {
  terapeut: ["usersData"],
  usluge: ["usersData"],
  terapeutUsluge: ["therapistServicesData"],
};

const AddForm = ({ variant, dropdownData = {} }: AddFormProps) => {
  const fields = variantFieldsMap[variant];
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean>
  >({});

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newData: Partial<FormDataType>) =>
      fetch(endpointsMap[variant], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidationMap[variant] });
      setFormData({}); // Clear form after success
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // add sonner later
    if (
      variant === "terapeut" &&
      typeof (formData as TherapistFormData).phone === "string"
    ) {
      const rawPhone = (formData as TherapistFormData).phone?.replace(
        /\D/g,
        "",
      );
      if (variant === "terapeut" && rawPhone?.length !== 10) {
        alert("Broj mobitela mora imati točno 10 znamenki.");
        return;
      }
    }

    mutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    let newValue: string | boolean | number = value;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      newValue = Number(value);
    }

    if (name === "phone") {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, "");

      // Limit to 10 digits
      if (digits.length > 10) return;

      // Format if 10 digits
      if (digits.length === 10) {
        newValue = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
      } else {
        newValue = digits;
      }
    } else {
      newValue = type === "checkbox" ? checked : value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const renderFields = () => {
    if (variant === "terapeutUsluge") {
      const selectedTherapist = (formData as TherapistServiceFormData)
        .therapist_id;
      const servicesForTherapist =
        dropdownData.therapistServices?.[selectedTherapist] || [];

      return (
        <>
          <div className="flex flex-col items-start gap-1 px-3">
            <label>Terapeut</label>
            <select
              name="therapist_id"
              className="cursor-pointer rounded-lg border px-3 py-2"
              value={(formData as TherapistServiceFormData).therapist_id || ""}
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
          <div className="flex flex-col items-start gap-1 px-3">
            <label>Usluga</label>
            <select
              name="service_id"
              onChange={handleChange}
              className={cn(
                "rounded-lg border px-3 py-2",
                selectedTherapist && "cursor-pointer",
              )}
              value={(formData as TherapistServiceFormData).service_id || ""}
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
    } else if (variant === "terapeut" || variant === "usluge") {
      return fields.map((field) => (
        <div key={field.name} className="flex flex-col items-start gap-1 px-3">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={
              field.type !== "checkbox"
                ? typeof formData[field.name] === "boolean"
                  ? ""
                  : ((formData[field.name] as string | number | undefined) ??
                    "")
                : undefined
            }
            checked={
              field.type === "checkbox"
                ? Boolean(formData[field.name])
                : undefined
            }
            onChange={handleChange}
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
            required={field.required}
          />
        </div>
      ));
    }

    return null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap rounded-lg border-[1px] border-slate-200 bg-slate-100 px-2 py-2 text-sm font-medium text-slate-500"
    >
      {renderFields()}
      <Button className="h-[38px] self-end" type="submit">
        {mutation.isPending ? "Dodavanje..." : "Dodaj"}
      </Button>
    </form>
  );
};

export default AddForm;
