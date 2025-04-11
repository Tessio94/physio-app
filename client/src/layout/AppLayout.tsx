import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <NavMenu />
      <section className="relative flex-1">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default AppLayout;
