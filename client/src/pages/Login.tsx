import { Button } from "@/components/ui/shadcn/Button";
import Help from "@/components/Help";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function Login() {
  const [register, setRegister] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showVisibility, setShowVisibility] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const passwordInput = useRef<HTMLInputElement>(null);
  const repeatPasswordInput = useRef<HTMLInputElement>(null);

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

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/login/google";
  };

  useEffect(() => {
    const input = passwordInput.current;
    const input2 = repeatPasswordInput?.current;

    if (input) {
      input.type = showVisibility ? "text" : "password";
    }

    if (register && input2) {
      input2.type = showVisibility ? "text" : "password";
    }
  }, [showVisibility, register]);

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
          <form action="" className="mb-6 flex flex-col gap-5">
            {register && (
              <div className="flex gap-3 sm:gap-7">
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
            <div className="relative">
              <input
                type="password"
                placeholder="Lozinka"
                className="w-full rounded-2xl bg-slate-100 px-5 py-2"
                ref={passwordInput}
                required
              />
              {showVisibility ? (
                <MdVisibilityOff
                  className="absolute right-5 top-[50%] h-8 w-8 translate-y-[-50%] cursor-pointer rounded-full p-1 transition-all hover:bg-slate-400/40"
                  onClick={() => setShowVisibility((visibility) => !visibility)}
                />
              ) : (
                <MdVisibility
                  className="absolute right-5 top-[50%] h-8 w-8 translate-y-[-50%] cursor-pointer rounded-full p-1 transition-all hover:bg-slate-400/40"
                  onClick={() => setShowVisibility((visibility) => !visibility)}
                />
              )}
            </div>
            {register && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ponovi lozinku"
                  className="w-full rounded-2xl bg-slate-100 px-5 py-2"
                  ref={repeatPasswordInput}
                  required
                />
                {showVisibility ? (
                  <MdVisibilityOff
                    className="absolute right-5 top-[50%] h-8 w-8 translate-y-[-50%] cursor-pointer rounded-full p-1 transition-all hover:bg-slate-400/40"
                    onClick={() =>
                      setShowVisibility((visibility) => !visibility)
                    }
                  />
                ) : (
                  <MdVisibility
                    className="absolute right-5 top-[50%] h-8 w-8 translate-y-[-50%] cursor-pointer rounded-full p-1 transition-all hover:bg-slate-400/40"
                    onClick={() =>
                      setShowVisibility((visibility) => !visibility)
                    }
                  />
                )}
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
          </form>
          <div className="flex flex-row gap-4 max-[480px]:flex-col sm:gap-20">
            <Button className="flex w-full items-center justify-center gap-5 rounded-2xl bg-slate-100 px-5 py-2 text-slate-700 hover:text-slate-100">
              <FaFacebook className="text-2xl" />
              Facebook prijava
            </Button>
            <Button
              className="flex w-full items-center justify-center gap-5 rounded-2xl bg-slate-100 px-5 py-2 text-slate-700 hover:text-slate-100 max-[480px]:pr-[40px]"
              onClick={handleLogin}
            >
              <FcGoogle className="text-2xl" />
              Google prijava
            </Button>
          </div>
        </div>
      </div>
      <Help handleHelp={handleHelp} showHelp={showHelp} />
    </>
  );
}

export default Login;
