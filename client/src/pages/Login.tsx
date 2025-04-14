import Help from "@/components/Help";
import { Button } from "@/components/ui/shadcn/Button";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [register, setRegister] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/registracija") {
      setRegister(true);
    } else {
      setRegister(false);
    }
  }, [location.pathname]);

  const toggleForm = () => {
    setRegister(!register);
    navigate(register ? "/prijava" : "/registracija");
  };

  const handleHelp = () => {
    setShowHelp((showHelp) => !showHelp);
  };

  return (
    <>
      <div className="mx-auto mb-[100px] mt-[80px] w-[600px] max-w-[90%] border-t-4 border-t-slate-700 bg-slate-200 sm:mb-[150px] sm:mt-[100px]">
        <h5 className="mb-16 pt-7 text-center text-3xl">
          {register ? "Dobrodošao" : "Dobrodošao nazad"}
        </h5>
        <div className="flex justify-between px-3 sm:px-10">
          <div className="flex gap-6">
            <button onClick={toggleForm}>
              {register ? "Prijavi se" : "Registriraj se"}
            </button>
          </div>
          <button onClick={handleHelp}>Trebaš pomoć?</button>
        </div>
        <div className="mt-5 px-3 pb-[80px] sm:px-10">
          <form action="" className="flex flex-col gap-5">
            {register && (
              <div className="flex gap-7">
                <input
                  type="text"
                  placeholder="Ime"
                  className="w-full rounded-2xl bg-slate-100 px-5 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Prezime"
                  className="w-full rounded-2xl bg-slate-100 px-5 py-2"
                  required
                />
              </div>
            )}
            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full rounded-2xl bg-slate-100 px-5 py-2"
                required
              />
            </div>
            {register && (
              <div className="">
                <input
                  type="text"
                  placeholder="Broj mobitela ..."
                  className="w-full rounded-2xl bg-slate-100 px-5 py-2"
                  required
                />
              </div>
            )}
            <div>
              <input
                type="text"
                placeholder="Lozinka"
                className="w-full rounded-2xl bg-slate-100 px-5 py-2"
                required
              />
            </div>
            {register && (
              <div>
                <input
                  type="text"
                  placeholder="Ponovi lozinku"
                  className="w-full rounded-2xl bg-slate-100 px-5 py-2"
                  required
                />
              </div>
            )}
            {register && (
              <div className="flex items-center gap-10">
                <input
                  type="checkbox"
                  placeholder="Repeat password"
                  className="h-4 w-4 rounded-2xl"
                  required
                />
                <label>Slažem se s uvjetima i odredbama.</label>
              </div>
            )}
            <Button className="rounded-2xl bg-slate-700 px-5 py-2 text-slate-100">
              {register ? "Registriraj se" : "Prijavi se"}
            </Button>
            <div className="flex flex-row gap-4 max-[480px]:flex-col sm:gap-20">
              <Button className="flex w-full items-center justify-center gap-5 rounded-2xl bg-slate-100 px-5 py-2 text-slate-700 hover:text-slate-100">
                <FaFacebook className="text-2xl" />
                Facebook prijava
              </Button>
              <Button className="flex w-full items-center justify-center gap-5 rounded-2xl bg-slate-100 px-5 py-2 text-slate-700 hover:text-slate-100 max-[480px]:pr-[40px]">
                <FcGoogle className="text-2xl" />
                Google prijava
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Help />
    </>
  );
}

export default Login;
