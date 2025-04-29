import { Button } from "./ui/shadcn/Button";
import DateInput from "./DateInput";
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
    variant === "ukloniUsluguZaTerapeuta"
  ) {
    return <DeleteForm variant={variant} dropdownData={dropdownData} />;
  } else if (variant === "nedostupnost") {
    return (
      <form
        action=""
        className="flex rounded-lg border-[1px] border-slate-200 px-2 py-2 text-sm font-medium text-slate-500"
      >
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Terapeut ID</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Nedostupan od</label>
          <DateInput />
        </div>
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Nedostupan do</label>
          <DateInput />
        </div>
        <Button className="h-[38px] self-end" type="submit">
          Ukloni
        </Button>
      </form>
    );
  }
};

export default AdminDodaj;
