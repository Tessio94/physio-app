import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

const fetchCurrentUser = async () => {
  const res = await fetch(`${prodUrl}/auth/current-user`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    // Instead of throwing, return null to indicate no user
    return null;
  }

  if (!res.ok) {
    throw new Error("Unexpected error while fetching user");
  }

  const data = await res.json();
  return data;
};

function AppLayout() {
  const { isError, error, data } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const user = isError && error.message === "Not authenticated" ? null : data;

  return (
    <>
      <NavMenu user={user} />
      <section className="relative flex-1">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default AppLayout;
