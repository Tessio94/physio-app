import Footer from "@/components/ui/Footer";
import NavMenu from "@/components/ui/NavMenu";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <NavMenu />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
