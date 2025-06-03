// ForgotPassword.tsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/shadcn/button";
import { useMutation } from "@tanstack/react-query";

// const devUrl = import.meta.env.VITE_URL_DEVELOPMENT;
const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

const forgotSchema = z.object({
  email: z.string().email("Unesite ispravnu email adresu"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

const sendResetEmail = async ({ email }: ForgotForm) => {
  const res = await fetch(`${prodUrl}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Neuspješno slanje emaila");
  return res.json();
};

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const mutation = useMutation({
    mutationFn: sendResetEmail,
    onSuccess: () => alert("Email za reset lozinke je poslan"),
    onError: (e: Error) => alert(e.message),
  });

  const onSubmit = (data: ForgotForm) => mutation.mutate(data);

  return (
    <div className="mx-auto mt-32 max-w-md rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-xl font-semibold">
        Zaboravljena lozinka
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          className="input"
          placeholder="Unesite svoj email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}

        <Button
          type="submit"
          className="w-full rounded-xl bg-slate-700 py-2 text-white"
        >
          Pošalji link za reset
        </Button>
      </form>
    </div>
  );
}
