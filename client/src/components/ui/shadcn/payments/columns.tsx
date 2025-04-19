"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  registration_date: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Ime",
  },
  {
    accessorKey: "lastname",
    header: "Prezime",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "phone",
    header: "Mobitel",
  },
  {
    accessorKey: "date",
    header: "Datum registracije",
  },
];
