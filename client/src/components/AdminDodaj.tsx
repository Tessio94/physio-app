import { Button } from "./ui/shadcn/Button";
import DateInput from "./DateInput";
import AddForm from "./adminForms/AddForm";

// type AdminDodajProps = {
//   variant: string;
//   handler?: (e: React.FormEvent<HTMLFormElement>) => void;
//   stateValue?: T;
//   stateSetter?: (value: T) => void;
//   therapists?: { id: string }[]; // or adjust if therapists have more fields
// };

const AdminDodaj = ({
  variant,
  handler,
  stateValue,
  stateSetter,
  therapists,
}) => {
  if (
    variant === "terapeut" ||
    variant === "usluge" ||
    variant === "terapeutUsluge"
  ) {
    return (
      <AddForm
        variant={variant}
        handler={handler}
        stateValue={stateValue}
        stateSetter={stateSetter}
      />
    );
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
  } else if (variant === "ukloniTerapeuta") {
    return (
      <form
        onSubmit={handler}
        className="flex rounded-lg border-[1px] border-slate-200 px-2 py-2 text-sm font-medium text-slate-500"
      >
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Terapeut ID</label>
          <select
            id="therapistId"
            className="cursor-pointer rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
            value={stateValue}
            onChange={(e) => stateSetter(e.target.value)}
          >
            {therapists?.map((therapist, i) => (
              <option key={i} value={therapist.id} className="bg-slate-100">
                {therapist.id} {/* You can adjust the display here */}
              </option>
            ))}
          </select>
        </div>
        <Button className="h-[38px] self-end" type="submit">
          Ukloni
        </Button>
      </form>
    );
  } else if (variant === "ukloniUslugu") {
    return (
      <form
        action=""
        className="flex rounded-lg border-[1px] border-slate-200 px-2 py-2 text-sm font-medium text-slate-500"
      >
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Usluga ID</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <Button className="h-[38px] self-end" type="submit">
          Ukloni
        </Button>
      </form>
    );
  } else if (variant === "ukloniUsluguZaTerapeuta") {
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
          <label htmlFor="">Service ID</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <Button className="h-[38px] self-end" type="submit">
          Ukloni
        </Button>
      </form>
    );
  }
};

export default AdminDodaj;
