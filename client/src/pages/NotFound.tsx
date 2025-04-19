import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-slate-100">
      <div className="flex max-w-[90%] flex-col items-center gap-5">
        <p className="text-4xl font-bold text-red-600">404</p>
        <p className="text-center text-4xl text-slate-700 max-md:text-2xl">
          Stranica koju ste zatražili nije pronađena
        </p>
        <Link
          to="/"
          className="flex cursor-pointer items-center justify-center rounded-xl bg-slate-500 px-5 py-3 text-white transition hover:bg-slate-700"
        >
          Povratak na početnu stranicu
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
