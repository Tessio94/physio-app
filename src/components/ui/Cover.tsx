import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel";
import cover1 from "@/assets/carousel/cover1.jpg";
import cover2 from "@/assets/carousel/cover2.jpg";
import cover3 from "@/assets/carousel/cover3.jpg";
import cover4 from "@/assets/carousel/cover4.jpg";
import { Link } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";

function Cover() {
  return (
    <section
      id="cover"
      className="mb-[10%] flex flex-col items-center justify-center gap-14 pt-12 text-center md:mb-[470px]"
    >
      <div className="max-w-[80%]">
        <h2 className="mb-3 text-4xl font-bold text-slate-800">
          Insignia Physiotherapy
        </h2>
        <p className="mb-10 text-xl font-semibold text-slate-700">
          Get the help you need.
        </p>
        <Link
          to="/book-now"
          className="group flex items-center gap-5 rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white transition-all hover:bg-slate-400 hover:text-slate-800"
        >
          Book your appointment at desired specialist{" "}
          <span className="text-xl transition-all group-hover:translate-x-2">
            <FaHandPointRight />
          </span>
        </Link>
      </div>
      <div className="relative w-[1240px] max-w-[80%] xl:max-w-[85%]">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <img src={cover1} alt="carousel image 1" className="rounded-xl" />
            </CarouselItem>
            <CarouselItem>
              <img src={cover2} alt="carousel image 2" className="rounded-xl" />
            </CarouselItem>
            <CarouselItem>
              <img src={cover3} alt="carousel image 3" className="rounded-xl" />
            </CarouselItem>
            <CarouselItem>
              <img src={cover4} alt="carousel image 4" className="rounded-xl" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="z-100 mt-[10%] flex flex-col items-center justify-start gap-5 rounded-xl border-2 bg-white px-10 py-10 md:absolute md:left-[50%] md:top-[80%] md:mt-[0px] md:h-[500px] md:w-[500px] md:translate-x-[-50%]">
          <img alt="Company Icon" src="/logo.svg" className="h-8 w-auto" />
          <h3>Klinika koju ste tražili</h3>
          <p className="mt-10">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum,
            sapiente quod. Illo alias rem rerum magni debitis amet. Rerum,
            reprehenderit aut. Dicta ut officiis pariatur iste veritatis,
            tempora autem id.
          </p>
          <p className="mt-10">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum,
            sapiente quod. Illo alias rem rerum magni debitis amet. Rerum,
            reprehenderit aut. Dicta ut officiis pariatur iste veritatis,
            tempora autem id.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Cover;
