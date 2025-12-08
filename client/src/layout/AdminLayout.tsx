import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import ToastComponent from "../components/ui/ToastComponent";
import Spinner from "@/components/skeleton/Spinner";

const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

const fetchAdminInfo = async () => {
  const res = await fetch(`${prodUrl}/auth/admin/current`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location", location);

  const {
    data: admin,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["admin-auth", location.pathname],
    queryFn: fetchAdminInfo,
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${prodUrl}/auth/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Logout failed");
      return res.json();
    },
    onSuccess: async () => {
      toast.custom((id) => (
        <ToastComponent
          id={id.toString()}
          type="yes"
          title="Uspješna odjava!"
          description="Hvala na korištenju naših usluga, vratite nam se ponovno."
        />
      ));

      navigate("/admin/log-in");
    },
  });

  const shownRef = useRef(false);

  useEffect(() => {
    if (!shownRef.current && isError) {
      shownRef.current = true;

      toast.custom((id) => (
        <ToastComponent
          id={id.toString()}
          type="not"
          title="Prijava potrebna!"
          description="Prijavite se kako bi pristupili svom admin panelu."
        />
      ));

      navigate("/admin/log-in", { replace: true });
    }
  }, [isError, navigate, admin]);

  // if (isPending) return null;

  // if (isError || !admin)  return null;
  if (isError) return null;

  return (
    <SidebarProvider defaultOpen={true} className="max-w-[100vw]">
      <AppSidebar onLogout={() => logoutMutation.mutate()} />
      <main className="w-full max-w-[calc(100vw-255px)]">
        <SidebarTrigger className="mb-5 h-8 pt-2" />
        {isPending ? <Spinner /> : <Outlet context={admin} />}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
