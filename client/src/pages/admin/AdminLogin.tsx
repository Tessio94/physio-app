import { Button } from "@/components/ui/shadcn/Button";
import { useEffect, useRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function Login() {
  const [showVisibility, setShowVisibility] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = passwordInput.current;

    if (showVisibility) {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }, [showVisibility]);

  return (
    <>
      <h5 className="mb-12 mt-20 pt-7 text-center text-3xl">
        Prijava zaposlenika
      </h5>
      <div className="mb-10 flex shrink-0 items-center justify-center">
        <img alt="Company Icon" src="/logo.svg" className="h-8 w-auto" />
      </div>
      <div className="mx-auto mb-[100px] mt-[20px] w-[600px] max-w-[90%] border-t-4 border-t-slate-700 bg-slate-200 sm:mb-[150px] sm:mt-[20px]">
        <div className="px-3 py-[50px] sm:px-10">
          <form action="" className="flex flex-col gap-5">
            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full rounded-2xl bg-slate-100 px-5 py-2"
                required
              />
            </div>

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

            <Button className="rounded-2xl bg-slate-700 px-5 py-2 text-slate-100">
              Prijavi se
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
