import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/shadcn/Button";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const profileSchema = z
  .object({
    name: z.string().min(1, "Ime je obavezno"),
    lastname: z.string().min(1, "Prezime je obavezno"),
    email: z.string().email("Neispravan email"),
    phone: z.string().min(1, "Broj je obavezan"),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    { message: "Lozinke se ne podudaraju", path: ["confirmPassword"] },
  );

type ProfileForm = z.infer<typeof profileSchema>;

const updateProfile = async (data: ProfileForm) => {
  const res = await fetch("http://localhost:3000/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Neuspješno ažuriranje profila");
  return res.json();
};

export default function ProfileEdit({ user }: { user: any }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => alert("Profil je ažuriran"),
    onError: (err: Error) => alert(err.message),
  });

  const onSubmit = (data: ProfileForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold">Uredi profil</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="input" placeholder="Ime" {...register("name")} />
          <input
            className="input"
            placeholder="Prezime"
            {...register("lastname")}
          />
        </div>

        <input className="input" placeholder="Email" {...register("email")} />
        <input
          className="input"
          placeholder="Broj mobitela"
          {...register("phone")}
        />

        <hr className="my-4" />
        <h4 className="text-md font-medium">Promjena lozinke</h4>

        <input
          type="password"
          className="input"
          placeholder="Nova lozinka (opcionalno)"
          {...register("newPassword")}
        />
        <input
          type="password"
          className="input"
          placeholder="Potvrdi lozinku"
          {...register("confirmPassword")}
        />

        {Object.values(errors).map((err, i) => (
          <p className="text-sm text-red-600" key={i}>
            {err.message}
          </p>
        ))}

        <Button className="w-full rounded-xl bg-slate-700 py-2 text-white">
          Spremi promjene
        </Button>
      </form>
    </div>
  );
}
