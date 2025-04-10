import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import gallery1 from "@/assets/gallery/gallery1.jpg";
import gallery2 from "@/assets/gallery/gallery2.jpg";
import gallery3 from "@/assets/gallery/gallery3.jpg";
import gallery4 from "@/assets/gallery/gallery4.jpg";
import gallery5 from "@/assets/gallery/gallery5.jpg";
import gallery6 from "@/assets/gallery/gallery6.jpg";

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
  const [slideOrder, setSlideOrder] = useState(slides);

  function handleNext() {
    setSlideOrder((prev) => {
      const newOrder = [...prev];
      const firstSlide = newOrder.shift();
      newOrder.push(firstSlide);
      return newOrder;
    });
  }

  function handlePrev() {
    setSlideOrder((prev) => {
      const newOrder = [...prev];
      const lastSlide = newOrder.pop();
      newOrder.unshift(lastSlide);
      return newOrder;
    });
  }

  return (
    <section className="relative h-[100vh] w-[100vw] overflow-hidden">
      <div
        id="container"
        className="absolute left-[50%] top-[50%] h-[600px] w-[1000px] translate-x-[-50%] translate-y-[-50%] bg-slate-500 shadow-xl"
      >
        <div className="slide">
          {slideOrder.map((slide, i) => {
            return (
              <div
                className="item absolute top-[50%] inline-block h-[300px] w-[200px] translate-x-0 translate-y-[-50%] rounded-xl bg-cover bg-center shadow-xl shadow-black transition-all duration-300"
                key={i}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="content absolute left-[100px] top-[50%] hidden w-[350px] translate-x-0 translate-y-[-50%] rounded-xl px-10 py-5 text-left font-serif text-white shadow-lg backdrop-blur-sm">
                  <div
                    id="name"
                    className="animate-name text-3xl font-bold uppercase opacity-0"
                  >
                    {slide.name}
                  </div>
                  <div id="des" className="mb-4 mt-2 animate-des opacity-0">
                    {slide.description}
                  </div>
                  <button className="animate-but cursor-pointer px-2 py-4 font-bold opacity-0">
                    Registriraj se
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="button absolute bottom-[20px] left-[50%] flex translate-x-[-50%] translate-y-[-50%] items-center justify-center gap-10 text-center">
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
