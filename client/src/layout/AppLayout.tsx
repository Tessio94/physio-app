import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchCurrentUser = async () => {
  const res = await fetch("http://localhost:3000/auth/current-user", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  const data = await res.json();
  return data;
};

function AppLayout() {
  const { isLoading, data } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: fetchCurrentUser,
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>; // ubaciti spinner
  }

  return (
    <>
      <NavMenu user={data} />
      <section className="relative flex-1">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default AppLayout;
