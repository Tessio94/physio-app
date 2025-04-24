"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../Button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  registration_date: string;
  is_superadmin?: boolean;
};

export const columns = (showSuperadmin: boolean): ColumnDef<Payment>[] => {
  const baseColumns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ime
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "lastname",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prezime
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "phone",
      header: "Mobitel",
    },
    ...(showSuperadmin
      ? [
          {
            accessorKey: "is_superadmin",
            header: "Superadmin",
          },
        ]
      : []),
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Datum registracije
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  return baseColumns;
};
