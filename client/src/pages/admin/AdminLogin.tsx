import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/Button";
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

const loginMutationFn = async (data: z.infer<typeof loginSchema>) => {
  console.log(data);
  const { email, password } = data;
  const res = await fetch(
    "https://physio-app-backend-wng0.onrender.com/auth/admin/login",
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

function Login() {
  const navigate = useNavigate();
  const [showVisibility, setShowVisibility] = useState(false);

  const queryClient = useQueryClient();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-info"] });
      navigate("/admin/dashboard");
    },
    onError: (err: Error) => alert(err.message),
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };

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
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                type="text"
                placeholder="Email"
                className="input"
                {...formRegister("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showVisibility ? "text" : "password"}
                placeholder="Lozinka"
                className="input"
                {...formRegister("password")}
              />
              {showVisibility ? (
                <MdVisibilityOff
                  className="icon"
                  onClick={() => setShowVisibility((visibility) => !visibility)}
                />
              ) : (
                <MdVisibility
                  className="icon"
                  onClick={() => setShowVisibility((visibility) => !visibility)}
                />
              )}
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
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
