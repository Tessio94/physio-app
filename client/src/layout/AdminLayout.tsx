import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="mb-5 h-8 pt-2" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
