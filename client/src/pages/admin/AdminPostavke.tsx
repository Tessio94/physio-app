import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/shadcn/payments/data-table";
import { columns } from "@/components/ui/shadcn/payments/columns";
// import { useLocation } from "react-router-dom";
import AdminDodaj from "@/components/AdminDodaj";
import { useEffect, useState } from "react";

const AdminPostavke = () => {
  const queryClient = useQueryClient();
  // const { pathname } = useLocation();
  const [formData, setFormData] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [therapistId, setTherapistId] = useState<number>(0);

  // initial fetch of therapists and users
  const { isLoading, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/admin/postavke").then((res) =>
        res.json(),
      ),
  });

  const { data: therapists, isLoading: isTherapistsLoading } = useQuery({
    queryKey: ["therapists"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/admin/postavke/get-therapists").then(
        (res) => res.json(),
      ),
  });

  const addUserMutation = useMutation({
    mutationFn: (newUser: any) =>
      fetch("http://localhost:3000/api/v1/admin/postavke/add-therapist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(["usersData"]); // Refetch users list
    },
  });

  const addServiceMutation = useMutation({
    mutationFn: (newService: any) =>
      fetch("http://localhost:3000/api/v1/admin/postavke/add-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(["usersData"]); // separate services later so we can invalidate only get services query
    },
  });

  const deleteTherapistMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(
        `http://localhost:3000/api/v1/admin/postavke/delete-therapist/${id}`,
        {
          method: "DELETE",
        },
      ).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(["usersData"]);
    },
  });

  const addServiceToTherapistMutation = useMutation({
    mutationFn: (serviceToTherapistData) =>
      fetch("http://localhost:3000/api/v1/admin/add-service-to-therapist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceToTherapistData),
      }).then((res) => res.json()),
  });

  // useEffect(() => {
  //   console.log(therapistId);
  // }, [therapistId]);

  if (isLoading || isTherapistsLoading) return <h1>is loading...</h1>;
  // console.log(data);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUserMutation.mutate(formData);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    addServiceMutation.mutate(serviceData);
  };

  const handleDeleteTherapist = (id: number) => {
    deleteTherapistMutation.mutate(id);
  };

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
                <AdminDodaj
                  variant="terapeut"
                  handler={handleAddUser}
                  stateValue={formData}
                  stateSetter={setFormData}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-green-700">
                Dodaj usluge za terapeuta:
              </div>
              <div className="pt-2">
                <AdminDodaj variant="terapeutUsluge" />
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-green-700">
                Dodaj nove usluge:
              </div>
              <div className="pt-2">
                <AdminDodaj variant="usluge" handler={handleAddService} />
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
                  handler={handleDeleteTherapist}
                  stateValue={therapistId}
                  stateSetter={setTherapistId}
                  therapists={therapists.ids}
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
                <AdminDodaj variant="ukloniUslugu" />
              </div>
            </div>
          </div>
          <div className="mt-5 flex">
            <div>
              <div className="relative w-fit font-semibold after:absolute after:left-0 after:top-[100%] after:h-0.5 after:w-[40%] after:content-normal after:bg-red-700">
                Ukloni uslugu za terapeuta:
              </div>
              <div className="pt-2">
                <AdminDodaj variant="ukloniUsluguZaTerapeuta" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPostavke;
