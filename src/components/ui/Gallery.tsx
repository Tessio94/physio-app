import { useState, useRef } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import gallery1 from "../../assets/gallery/gallery1.jpg";
import gallery2 from "../../assets/gallery/gallery2.jpg";
import gallery3 from "../../assets/gallery/gallery3.jpg";
import gallery4 from "../../assets/gallery/gallery4.jpg";
import gallery5 from "../../assets/gallery/gallery5.jpg";
import gallery6 from "../../assets/gallery/gallery6.jpg";
import { MenuItems } from "@headlessui/react";

const slides = [
  {
    name: "Kinezioterapija",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, dolorem?",
    image: gallery1,
  },
  {
    name: "Elektroterapija",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, dolorem?",
    image: gallery2,
  },
  {
    name: "Ultrazvučna terapija",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, dolorem?",
    image: gallery3,
  },
  {
    name: "Manualna terapija",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, dolorem?",
    image: gallery4,
  },
  {
    name: "Hidroterapija",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, dolorem?",
    image: gallery5,
  },
  {
    name: "Laser-terapija ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, dolorem?",
    image: gallery6,
  },
];

function Gallery() {
  const slideContainerRef = useRef();

  const handleNext = () => {
    const container = slideContainerRef.current;
    const firstChild = container.firstChild;
    container.appendChild(firstChild); // Move first child to the end
  };

  const handlePrev = () => {
    const container = slideContainerRef.current;
    const lastChild = container.lastChild;
    container.insertBefore(lastChild, container.firstChild); // Move last child to the start
  };

  return (
    <section
      id="gallery"
      className="relative h-[800px] max-w-full overflow-hidden xl:h-[100vh] xl:w-[100vw]"
    >
      <div
        id="container"
        className="absolute left-[50%] top-[50%] h-full w-full translate-x-[-50%] translate-y-[-50%] bg-slate-500 shadow-xl"
      >
        <div className="slide" ref={slideContainerRef}>
          {slides.map((slide, i) => {
            return (
              <div
                className="item absolute top-[70%] inline-block h-[150px] w-[100px] translate-x-0 translate-y-[-50%] rounded-xl bg-cover bg-center shadow-xl shadow-black transition-all duration-500 md:top-[50%] lg:h-[225px] lg:w-[150px] xl:h-[300px] xl:w-[200px]"
                key={i}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="content absolute left-[50%] top-[20%] hidden w-[300px] translate-x-[-50%] rounded-xl px-5 py-5 text-left font-serif text-white shadow-lg backdrop-blur-sm md:left-[40px] md:top-[50%] md:translate-x-0 md:translate-y-[-50%] lg:left-[100px] lg:w-[350px] lg:px-10">
                  <div
                    id="name"
                    className="animate-name text-xl font-bold uppercase opacity-0 lg:text-3xl"
                  >
                    {slide.name}
                  </div>
                  <div
                    id="des"
                    className="mb-4 mt-2 animate-des text-lg opacity-0"
                  >
                    {slide.description}
                  </div>
                  <button className="animate-but cursor-pointer rounded-xl bg-slate-50 bg-opacity-90 px-2 py-2 font-bold text-slate-600 opacity-0 shadow-md transition-all hover:bg-slate-600 hover:text-slate-50">
                    Register
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="button absolute bottom-[5%] left-[50%] flex translate-x-[-50%] translate-y-[-50%] items-center justify-center gap-10 text-center md:bottom-[15%]">
          <button
            className="prev flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-gray-300 transition-all duration-300 hover:border-white hover:bg-slate-400 hover:text-slate-100"
            onClick={handlePrev}
          >
            <GrLinkPrevious />
          </button>
          <button
            className="next flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-gray-300 transition-all duration-300 hover:border-white hover:bg-slate-400 hover:text-slate-100"
            onClick={handleNext}
          >
            <GrLinkNext />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
