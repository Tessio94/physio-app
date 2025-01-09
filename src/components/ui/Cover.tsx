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

function Cover() {
	return (
		<section
			id="cover"
			className="flex flex-col justify-center items-center pt-12 text-center gap-14 mb-[470px]"
		>
			<div>
				<h2 className="text-slate-800 font-bold text-4xl mb-3">
					Insignia Physiotherapy
				</h2>
				<p className="mb-10 text-xl text-slate-700 font-semibold">
					Get the help you need.
				</p>
				<button className="bg-slate-800 font-semibold text-white px-4 py-2 rounded-lg hover:bg-slate-400 hover:text-slate-800 transition-all">
					Book your appointment at desired specialist
				</button>
			</div>
			<div className="relative w-[1240px] max-w-[85%]">
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
				<div className="absolute w-[500px] h-[500px] bg-white border-2 z-100 top-[80%] left-[50%] translate-x-[-50%] rounded-xl flex flex-col justify-start items-center py-10 px-10 gap-5">
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
