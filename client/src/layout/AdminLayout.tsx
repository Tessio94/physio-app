import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useEffect } from "react";

const fetchAdminInfo = async () => {
  const res = await fetch("http://localhost:3000/auth/admin/current", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: admin,
    error,
    isPending,
  } = useQuery({
    queryKey: ["admin-auth", location.pathname],
    queryFn: fetchAdminInfo,
    retry: false,
  });

  // This ensures redirect happens only after render, when error becomes truthy.
  useEffect(() => {
    if (error) {
      navigate("/admin/log-in");
    }
  }, [error, navigate]);

  // possible slight flicker
  //   if (error) {
  //   return <Navigate to="/admin-login" replace />;
  // }

  if (isPending) return null;

  return (
    <SidebarProvider defaultOpen={true} className="max-w-[100vw]">
      <AppSidebar />
      <main className="w-full max-w-[calc(100vw-255px)]">
        <SidebarTrigger className="mb-5 h-8 pt-2" />
        <Outlet context={admin} />
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
