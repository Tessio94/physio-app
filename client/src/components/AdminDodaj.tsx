import { Button } from "./ui/shadcn/Button";
import DateInput from "./DateInput";

const AdminDodaj = ({ variant, handler, value, setter, therapists }) => {
  if (variant === "terapeut") {
    return (
      <form
        onSubmit={handler}
        className="flex rounded-lg border-[1px] border-slate-200 px-2 py-2 text-sm font-medium text-slate-500"
      >
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Ime</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Prezime</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">E-mail</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Mobitel</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Lozinka</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Slika (url)</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <Button className="h-[38px] self-end" type="submit">
          Dodaj
        </Button>
      </form>
    );
  } else if (variant === "terapeutUsluge") {
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
          <label htmlFor="">Usluga ID</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <Button className="h-[38px] self-end" type="submit">
          Dodaj
        </Button>
      </form>
    );
  } else if (variant === "usluge") {
    return (
      <form
        onSubmit={handler}
        className="flex rounded-lg border-[1px] border-slate-200 px-2 py-2 text-sm font-medium text-slate-500"
      >
        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Naziv usluge</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col items-start gap-1 px-3">
          <label htmlFor="">Slika (url)</label>
          <input
            type="text"
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
          />
        </div>
        <Button className="h-[38px] self-end" type="submit">
          Dodaj
        </Button>
      </form>
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
            className="rounded-lg border-[1px] border-slate-200 px-3 py-2 outline-none"
            value={value}
            onChange={(e) => setter(e.target.value)}
          >
            {therapists?.map((therapist, i) => (
              <option key={i} value={therapist.id} className="">
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
