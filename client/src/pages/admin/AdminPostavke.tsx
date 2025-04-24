import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/shadcn/payments/data-table";
import { columns } from "@/components/ui/shadcn/payments/columns";
import { useLocation } from "react-router-dom";

const showSuperadminInTable = true;

const AdminPostavke = () => {
  const { pathname } = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/admin/postavke").then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <h1>is loading...</h1>;
  console.log(data);
  // const isAdminSettings = pathname === "/admin/postavke";
  // const columns =
  //   isAdminSettings &&
  //   baseColumns.push({ accessorKey: "isSuperadmin", header: "Superadmin" });

  return (
    <>
      <h4 className="ml-5 text-2xl text-slate-600">Vaše postavke</h4>
      <div className="mx-5 pt-6">
        <h3>Vaša uloga: Admin</h3>
        <div className="">
          <div>Lista admina:</div>
          <div className="mx-5 pt-2">
            <DataTable
              columns={columns(showSuperadminInTable)}
              data={data ?? []}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPostavke;
