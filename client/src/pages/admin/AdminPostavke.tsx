import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/shadcn/payments/data-table";
import { columns } from "@/components/ui/shadcn/payments/columns";
import AdminDodaj from "@/components/AdminDodaj";

const AdminPostavke = () => {
  // initial fetch of therapists
  const { isLoading, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/admin/postavke").then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <h1>is loading...</h1>;
  console.log(data);

  const therapistIds = data.formattedAdminList.map((admin) => {
    return { id: admin.id };
  });
  const serviceIds = data.servicesList.map((service) => {
    return { id: service.id };
  });

  const therapistsServicesMap = data.therapistsServices.reduce((acc, ts) => {
    if (!acc[ts.therapist_id]) acc[ts.therapist_id] = [];
    acc[ts.therapist_id].push(ts.service_id);
    return acc;
  }, {});

  const allServices = data.servicesList.map((service) => service.id);

  const therapistsServicesNotProvidedMap = Object.keys(
    therapistsServicesMap,
  ).reduce((acc, therapistId) => {
    const providedServices = therapistsServicesMap[therapistId];

    const notProvidedServices = allServices.filter(
      (serviceId) => !providedServices.includes(serviceId),
    );

    acc[therapistId] = notProvidedServices;
    return acc;
  }, {});

  // console.log(therapistsServicesNotProvidedMap);
  // console.log(therapistIds, serviceIds, therapistsServicesMap);

  return (
    <>
      <h4 className="ml-5 text-2xl text-slate-600">Vaše postavke</h4>
      <div className="mx-5 pb-10 pt-6">
        <h3 className="mb-3 font-semibold">
          Vaša uloga: <span className="text-slate-600">Admin</span>
        </h3>
        <div className="mb-5">
          <div className="pt-2">
            <div className="flex gap-14">
              <div>
                <div className="mb-2 font-semibold">Lista admina:</div>
                <DataTable
                  columns={columns(true, false)}
                  data={data.formattedAdminList ?? []}
                  searchShow={false}
                />
              </div>
              <div>
                <div className="mb-2 font-semibold">Lista usluga:</div>
                <DataTable
                  columns={columns(false, true)}
                  data={data.servicesList ?? []}
                  searchShow={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-x-14">
          <div className="flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-green-700">
                Dodaj novog admina:
              </div>
              <div className="pt-2">
                <AdminDodaj variant="terapeut" />
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-green-700">
                Dodaj usluge za terapeuta:
              </div>
              <div className="pt-2">
                <AdminDodaj
                  variant="terapeutUsluge"
                  dropdownData={{
                    therapists: therapistIds,
                    therapistServices: therapistsServicesNotProvidedMap,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-green-700">
                Dodaj nove usluge:
              </div>
              <div className="pt-2">
                <AdminDodaj variant="usluge" />
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-red-700">
                Makni nedostupne termine:
              </div>
              <div className="pt-2">
                <AdminDodaj variant="nedostupnost" />
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-red-700">
                Ukloni terapeuta:
              </div>
              <div className="pt-2">
                <AdminDodaj
                  variant="ukloniTerapeuta"
                  dropdownData={{ therapists: therapistIds }}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-red-700">
                Ukloni uslugu:
              </div>
              <div className="pt-2">
                <AdminDodaj
                  variant="ukloniUslugu"
                  dropdownData={{ services: serviceIds }}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-red-700">
                Ukloni uslugu za terapeuta:
              </div>
              <div className="pt-2">
                <AdminDodaj
                  variant="ukloniUsluguZaTerapeuta"
                  dropdownData={{
                    therapists: therapistIds,
                    therapistServices: therapistsServicesMap,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPostavke;
