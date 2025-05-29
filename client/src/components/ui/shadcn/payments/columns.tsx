"use client";

import { ColumnDef, Column } from "@tanstack/react-table";
import { Button } from "../Button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id?: number;
//   name: string;
//   lastname: string;
//   email: string;
//   phone: string;
//   registration_date: string;
//   is_superadmin?: boolean;
// };

export const columns = <TData extends object>(
  showSuperadmin: boolean,
  showServices: boolean,
): ColumnDef<TData>[] => {
  const baseColumns: ColumnDef<TData>[] = [
    ...(showSuperadmin || showServices
      ? [
          {
            accessorKey: "id",
            header: ({ column }: { column: Column<TData, unknown> }) => {
              return (
                <Button
                  className="p-0"
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              );
            },
          },
        ]
      : []),
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
    ...(!showServices
      ? [
          {
            accessorKey: "lastname",
            header: ({ column }: { column: Column<TData, unknown> }) => {
              return (
                <Button
                  className="p-0"
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Prezime
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              );
            },
          },
        ]
      : []),
    ...(!showServices
      ? [
          {
            accessorKey: "email",
            header: "E-mail",
          },
        ]
      : []),
    ...(!showServices
      ? [
          {
            accessorKey: "phone",
            header: "Mobitel",
          },
        ]
      : []),
    ...(showSuperadmin
      ? [
          {
            accessorKey: "is_superadmin",
            header: "Superadmin",
          },
        ]
      : []),
    ...(!showServices
      ? [
          {
            accessorKey: "date",
            header: ({ column }: { column: Column<TData, unknown> }) => {
              return (
                <Button
                  className="p-0"
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Datum registracije
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              );
            },
          },
        ]
      : []),
  ];

  return baseColumns;
};
