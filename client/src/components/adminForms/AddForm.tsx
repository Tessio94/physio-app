import { Button } from "@/components/ui/shadcn/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fieldsAddTherapist = [
  { label: "Ime", name: "therapistName", type: "text", required: true },
  { label: "Prezime", name: "lastname", type: "text", required: true },
  { label: "E-mail", name: "email", type: "text", required: true },
  { label: "Mobitel", name: "phone", type: "text", required: true },
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

const fieldsAddServiceForTherapist = [
  { label: "Terapeut ID", name: "therapist_id", type: "text", required: true },
  { label: "Service ID", name: "service_id", type: "text", required: true },
];

const variantFieldsMap = {
  terapeut: fieldsAddTherapist,
  usluge: fieldsAddService,
  terapeutUsluge: fieldsAddServiceForTherapist,
};

const endpointsMap = {
  terapeut: "http://localhost:3000/api/v1/admin/postavke/add-therapist",
  usluge: "http://localhost:3000/api/v1/admin/postavke/add-service",
  terapeutUsluge:
    "http://localhost:3000/api/v1/admin/postavke/add-service-for-therapist",
};

const invalidationMap = {
  terapeut: ["usersData"],
  usluge: ["servicesData"],
  terapeutUsluge: ["therapistServicesData"],
};

type AddFormProps = {
  variant: string;
  handler: (e: React.FormEvent) => void;
  stateValue: any;
  stateSetter: (value: any) => void;
};

const AddForm = ({
  variant,
  handler,
  stateValue,
  stateSetter,
}: AddFormProps) => {
  const fields = variantFieldsMap[variant];
  const [formData, setFormData] = useState({});

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newData: any) =>
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
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.taget.value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap rounded-lg border-[1px] border-slate-200 px-2 py-2 text-sm font-medium text-slate-500"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col items-start gap-1 px-3">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
            required={field.required}
          />
        </div>
      ))}
      <Button className="h-[38px] self-end" type="submit">
        {mutation.isLoading ? "Dodavanje..." : "Dodaj"}
      </Button>
    </form>
  );
};

export default AddForm;
