import logo1 from "../../assets/partneri/logo1.svg";
import logo2 from "../../assets/partneri/logo2.svg";
import logo3 from "../../assets/partneri/logo3.svg";
import logo4 from "../../assets/partneri/logo4.svg";
import logo5 from "../../assets/partneri/logo5.svg";
import logo6 from "../../assets/partneri/logo6.svg";
import logo7 from "../../assets/partneri/logo7.svg";
import logo8 from "../../assets/partneri/logo8.svg";
import logo9 from "../../assets/partneri/logo9.svg";

function Partneri() {
  const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo5,
    logo6,
    logo3,
  ];

  return (
    <div id="partners" className="">
      <div
        id="animation_container1"
        className="max-[100vw] before:content-[' '] after:content-[' '] relative overflow-hidden whitespace-nowrap from-transparent to-white before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[250px] before:bg-gradient-to-l after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[250px] after:bg-gradient-to-r"
      >
        <div className="scroller inline-block w-max px-5">
          <div className="mb-[40px] flex items-center gap-10 overflow-hidden">
            {logos.map((logo, i) => {
              return (
                <img
                  src={logo}
                  alt={`logo ${i + 1}`}
                  className="grayscale transition-all hover:grayscale-0"
                  key={i}
                />
              );
            })}
          </div>
        </div>
        <div className="scroller inline-block w-max px-5">
          <div className="mb-[40px] flex items-center gap-10 overflow-hidden">
            {logos.map((logo, i) => {
              return (
                <img
                  src={logo}
                  alt={`logo ${i + 1}`}
                  className="grayscale transition-all hover:grayscale-0"
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div
        id="animation_container2"
        className="max-[100vw] before:content-[' '] after:content-[' '] relative overflow-hidden whitespace-nowrap from-transparent to-white before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[250px] before:bg-gradient-to-l after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[250px] after:bg-gradient-to-r"
      >
        <div className="scroller2 inline-block w-max px-5">
          <div className="mb-[40px] flex items-center gap-10 overflow-hidden">
            {logos.map((logo, i) => {
              return (
                <img
                  src={logo}
                  alt={`logo ${i + 1}`}
                  className="grayscale transition-all hover:grayscale-0"
                  key={i}
                />
              );
            })}
          </div>
        </div>
        <div className="scroller2 inline-block w-max px-5">
          <div className="mb-[40px] flex items-center gap-10 overflow-hidden">
            {logos.map((logo, i) => {
              return (
                <img
                  src={logo}
                  alt={`logo ${i + 1}`}
                  className="grayscale transition-all hover:grayscale-0"
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partneri;
