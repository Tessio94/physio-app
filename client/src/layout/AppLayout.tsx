import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
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
