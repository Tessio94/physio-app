import AddForm from "./adminForms/AddForm";
import DeleteForm from "./adminForms/DeleteForm";

type AdminDodajProps = {
  variant: string;
  dropdownData?: {
    therapists?: { id: number }[];
    services?: { id: number }[];
    therapistServices?: Record<number, number[]>;
  };
};

const AdminDodaj = ({ variant, dropdownData }: AdminDodajProps) => {
  if (
    variant === "terapeut" ||
    variant === "usluge" ||
    variant === "terapeutUsluge"
  ) {
    return <AddForm variant={variant} dropdownData={dropdownData} />;
  } else if (
    variant === "ukloniTerapeuta" ||
    variant === "ukloniUslugu" ||
    variant === "ukloniUsluguZaTerapeuta" ||
    variant === "nedostupnost"
  ) {
    return <DeleteForm variant={variant} dropdownData={dropdownData} />;
  }
};

export default AdminDodaj;
