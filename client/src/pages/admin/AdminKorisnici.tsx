import SkelAdminKorisnici from "@/components/skeleton/SkelAdminKorisnici";
import { columns } from "@/components/ui/shadcn/payments/columns";
import { DataTable } from "@/components/ui/shadcn/payments/data-table";
import { useQuery } from "@tanstack/react-query";

// const devUrl = import.meta.env.VITE_URL_DEVELOPMENT;
const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

export default function AdminKorisnici() {
  // const [data, setData] = useState([]);

  const { data, isPending } = useQuery({
    queryKey: ["usersData"],
    queryFn: () =>
      fetch(`${prodUrl}/api/v1/admin/korisnici`).then((res) => res.json()),
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
        {isPending ? (
          <SkelAdminKorisnici withSearch={true} />
        ) : (
          <DataTable
            columns={columns(false, false)}
            data={field ?? []}
            searchShow={true}
          />
        )}
      </div>
    </>
  );
}
