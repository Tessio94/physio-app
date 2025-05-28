import { Button } from "@/components/ui/shadcn/Button";
import Help from "@/components/Help";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Neispravan mail" }),
  password: z
    .string()
    .min(6, { message: "Lozinka mora imati najmanje 6 znakova" }),
});

const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, { message: "Ime je obvezno" }),
    lastname: z.string().min(1, { message: "Prezime je obavezno" }),
    phone: z
      .string()
      .min(1, { message: "Broj je obavezan" })
      .transform((val) => val.replace(/\D/g, ""))
      .refine((val) => val.length === 10, {
        message: "Broj mora imati 10 znamenki",
      }),

    repeatPassword: z
      .string()
      .min(6, { message: "Ponovljena lozinka je obavezna" }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Morate prihvatiti uvjete" }),
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Lozinke se ne podudaraju",
    path: ["repeatPassword"],
  });

const loginMutationFn = async (data: z.infer<typeof loginSchema>) => {
  console.log(data);
  const { email, password } = data;
  const res = await fetch(
    "https://physio-app-backend-wng0.onrender.com/auth/login",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Login failed");
  }

  return res.json();
};

export const registerMutationFn = async (
  data: z.infer<typeof registerSchema>,
) => {
  const { name, lastname, email, phone, password } = data;
  const res = await fetch(
    "https://physio-app-backend-wng0.onrender.com/auth/register",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, lastname, email, phone, password }),
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Registration failed");
  }

  return res.json();
};

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();

  const schema = register ? registerSchema : loginSchema;

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["fetchCurrentUser"] });
      navigate("/");
    },
    onError: (err: Error) => alert(err.message),
  });

  const registerMutation = useMutation({
    mutationFn: registerMutationFn,
    onSuccess: () => navigate("/"),
    onError: (err: Error) => alert(err.message),
  });

  const toggleForm = () => {
    setRegister(!register);
    navigate(register ? "/prijava" : "/registracija");
  };

  const onSubmit = (data: any) => {
    register ? registerMutation.mutate(data) : loginMutation.mutate(data);
  };

  useEffect(() => {
    setRegister(location.pathname === "/registracija");
  }, [location.pathname]);

  const handleLoginGoogle = () => {
    window.location.href =
      "https://physio-app-backend-wng0.onrender.com/auth/login/google";
  };

  const handleLoginFacebook = () => {
    window.location.href =
      "https://physio-app-backend-wng0.onrender.com/auth/login/facebook";
  };

  return (
    <>
      <div className="mx-auto mb-[100px] mt-[80px] w-[600px] max-w-[90%] border-t-4 border-t-slate-700 bg-slate-200 sm:mb-[150px] sm:mt-[100px]">
        <h5 className="mb-16 pt-7 text-center text-3xl">
          {register ? "Dobrodošao" : "Dobrodošao nazad"}
        </h5>

        <div className="flex justify-between px-3 sm:px-10">
          <button onClick={toggleForm}>
            {register ? "Prijavi se" : "Registriraj se"}
          </button>
          <button onClick={() => setShowHelp((prev) => !prev)}>
            Trebaš pomoć?
          </button>
        </div>

        <div className="mt-5 px-3 pb-[80px] sm:px-10">
          <form
            className="mb-6 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {register && (
              <div className="flex gap-3 sm:gap-7">
                <input
                  placeholder="Ime"
                  className="input"
                  {...formRegister("name")}
                />
                <input
                  placeholder="Prezime"
                  className="input"
                  {...formRegister("lastname")}
                />
              </div>
            )}

            <input
              placeholder="Email"
              className="input"
              {...formRegister("email")}
            />
            {register && (
              <input
                placeholder="Broj mobitela"
                className="input"
                {...formRegister("phone")}
              />
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Lozinka"
                className="input"
                {...formRegister("password")}
              />
              {showPassword ? (
                <MdVisibilityOff
                  className="icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <MdVisibility
                  className="icon"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {register && (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ponovi lozinku"
                  className="input"
                  {...formRegister("repeatPassword")}
                />
                {showPassword ? (
                  <MdVisibilityOff
                    className="icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <MdVisibility
                    className="icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            )}

            {register && (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...formRegister("terms")}
                  className="cursor-pointer"
                  id="terms"
                />
                <label className="cursor-pointer" htmlFor="terms">
                  Slažem se s uvjetima i odredbama
                </label>
              </div>
            )}

            {/* Display errors */}
            {Object.values(errors).map((err, i) => (
              <p className="text-sm text-red-600" key={i}>
                {err.message?.toString()}
              </p>
            ))}

            <Button className="rounded-2xl bg-slate-700 px-5 py-2 text-slate-100">
              {register ? "Registriraj se" : "Prijavi se"}
            </Button>
          </form>

          <div className="flex flex-row gap-4 max-[480px]:flex-col sm:gap-20">
            <Button className="btn-social" onClick={handleLoginFacebook}>
              <FaFacebook className="text-2xl" />
              Facebook prijava
            </Button>
            <Button className="btn-social" onClick={handleLoginGoogle}>
              <FcGoogle className="text-2xl" />
              Google prijava
            </Button>
          </div>
        </div>
      </div>
      <Help handleHelp={() => setShowHelp(false)} showHelp={showHelp} />
    </>
  );
}

export default Login;
