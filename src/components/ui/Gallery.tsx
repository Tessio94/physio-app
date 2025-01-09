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
    <section className="relative h-[100vh] w-[100vw] overflow-hidden">
      <div
        id="container"
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[1000px] h-[600px] bg-slate-500 shadow-xl"
      >
        <div className="slide" ref={slideContainerRef}>
          {slides.map((slide, i) => {
            return (
              <div
                className="item w-[200px] h-[300px] absolute top-[50%] translate-x-0 translate-y-[-50%] rounded-xl shadow-xl shadow-black bg-cover bg-center inline-block transition-all duration-500"
                key={i}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="content backdrop-blur-sm py-5 px-10  absolute top-[50%] left-[100px] w-[350px] rounded-xl shadow-lg text-left text-white translate-x-0 translate-y-[-50%] font-serif hidden">
                  <div
                    id="name"
                    className="text-3xl uppercase font-bold opacity-0 animate-name"
                  >
                    {slide.name}
                  </div>
                  <div id="des" className="mt-2 mb-4 opacity-0 animate-des">
                    {slide.description}
                  </div>
                  <button className="px-2 py-4  cursor-pointer opacity-0 animate-but font-bold">
                    Registriraj se
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="button flex items-center justify-center gap-10 text-center absolute bottom-[20px] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <button
            className="prev flex items-center justify-center  w-10 h-10 rounded-full border-2 border-black cursor-pointer  transition-all duration-300 bg-gray-300 hover:bg-slate-400 hover:text-slate-100 hover:border-white"
            onClick={handlePrev}
          >
            <GrLinkPrevious />
          </button>
          <button
            className="next flex items-center justify-center  w-10 h-10 rounded-full border-2 border-black  cursor-pointer transition-all duration-300 bg-gray-300 hover:bg-slate-400 hover:text-slate-100 hover:border-white"
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
