import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const Help = ({
  handleHelp,
  showHelp,
}: {
  handleHelp: () => void;
  showHelp: boolean;
}): JSX.Element => {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-slate-800/40 backdrop-blur-[2px] transition-all duration-500",
        !showHelp && "pointer-events-none bg-transparent backdrop-blur-none",
      )}
      onClick={handleHelp}
    >
      <div
        className={cn(
          "absolute bottom-0 flex w-full flex-col gap-10 rounded-t-xl bg-slate-50 px-5 py-10 transition-all duration-500 after:absolute after:left-[50%] after:top-2 after:h-1 after:w-10 after:translate-x-[-50%] after:rounded-xl after:bg-slate-400/40 min-[500px]:px-20",
          !showHelp && "bottom-[-250px]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="flex justify-between text-xl">
          Trebaš pomoć?
          <span className="cursor-pointer text-2xl">
            <IoMdCloseCircle
              className="transition-all hover:text-slate-600"
              onClick={handleHelp}
            />
          </span>
        </h4>
        <div className="flex flex-col gap-3">
          <Link
            to="/aktivacija-racuna"
            className="flex items-center justify-center rounded-full border-2 py-2 transition-all hover:border-slate-600 hover:bg-slate-600 hover:text-slate-50"
          >
            Zaboravili ste lozinku
          </Link>
          <Link
            to="/aktivacija-racuna"
            className="flex items-center justify-center rounded-full border-2 py-2 transition-all hover:border-slate-600 hover:bg-slate-600 hover:text-slate-50"
          >
            Aktivacija računa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;
