import Banner from "../components/Banner";
import Cover from "../components/Cover";
import Grid from "../components/Grid";
import Partneri from "../components/Partneri";
import Gallery from "../components/Gallery";
import { useEffect, useState } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";

function Homepage() {
  const [showScroll, setShowScroll] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1500) {
        console.log("scrolll");
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        onClick={scrollToTop}
        className={`${showScroll ? "opacity-1" : "opacity-0"} bg-red fixed right-[2%] top-[90%] z-50 cursor-pointer text-5xl transition-all duration-300`}
      >
        <IoIosArrowDropupCircle className="z-1000 fill-slate-800 transition-all hover:scale-125 hover:fill-slate-500" />
      </div>

      <Cover />
      <Banner type="tim" />
      <Grid />
      <Banner type="partneri" />
      <Partneri />
      <Banner type="galerija" />
      <Gallery />
    </>
  );
}

export default Homepage;
