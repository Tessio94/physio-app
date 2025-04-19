import { Payment, columns } from "@/components/ui/shadcn/payments/columns";
import { DataTable } from "@/components/ui/shadcn/payments/data-table";
import { formatUserDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function AdminKorisnici() {
  // const [data, setData] = useState([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/admin/korisnici").then((res) =>
        res.json(),
      ),
  });

  console.log("data :", data);

  let field;
  if (data) {
    field = data;
  }
  console.log(field);

  return (
    <>
      <h4 className="ml-5 text-2xl text-slate-600">
        Lista registriranih korisnika
      </h4>
      <div className="mx-5 pt-2">
        <DataTable columns={columns} data={field ?? []} />
      </div>
    </>
  );
}
