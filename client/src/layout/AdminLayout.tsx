import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import ToastComponent from "../components/ui/ToastComponent";

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
  console.log("admin", admin);
  console.log("error", isError);

  useEffect(() => {
    if (isError || !admin) {
      toast.custom((id) => (
        <ToastComponent
          id={id.toString()}
          type="not"
          title="Prijava potrebna!"
          description="Prijavite se kako bi pristupili svom admin panelu."
        />
      ));
      navigate("/admin/log-in");
    }
  }, [isError, navigate, admin]);

  if (isPending) return null;

  return (
    <>
      {location.pathname === "/admin/log-in" ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <Toaster position="top-center" />
          <SidebarProvider defaultOpen={true} className="max-w-[100vw]">
            <AppSidebar />
            <main className="w-full max-w-[calc(100vw-255px)]">
              <SidebarTrigger className="mb-5 h-8 pt-2" />
              <Outlet context={admin} />
            </main>
          </SidebarProvider>
        </>
      )}
    </>
  );
};

export default AdminLayout;
