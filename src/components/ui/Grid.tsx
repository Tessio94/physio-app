import Nikola from "../../assets/grid/Nikola.jpg";
import Marija from "../../assets/grid/Marija.jpg";
import Ana from "../../assets/grid/Ana.jpg";
import Luka from "../../assets/grid/Luka.jpg";
import Ema from "../../assets/grid/Ema.jpg";
import Dina from "../../assets/grid/Dina.jpg";
import cv from "../../assets/grid/cv.png";

const fizioterapeuti = [
	{
		ime: "Nikola",
		titula: "M.Sc. Physioth.",
		tekst:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, molestiae. Sequi odio eius inventore eum ut optio, in officia ab.",
		image: Nikola,
		cv: {
			obrazovanje: "ZVU Zagreb 2015.-2020.",
			posao: "Insignia 2020.-2025",
		},
	},
	{
		ime: "Marija",
		titula: "M.Sc. Physioth.",
		tekst:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, molestiae. Sequi odio eius inventore eum ut optio, in officia ab.",
		image: Marija,
		cv: {
			obrazovanje: "ZVU Zagreb 2015.-2020.",
			posao: "Insignia 2020.-2025",
		},
	},
	{
		ime: "Ana",
		titula: "bacc. Physioth.",
		tekst:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, molestiae. Sequi odio eius inventore eum ut optio, in officia ab.",
		image: Ana,
		cv: {
			obrazovanje: "ZVU Zagreb 2015.-2020.",
			posao: "Insignia 2020.-2025",
		},
	},
	{
		ime: "Luka",
		titula: "bacc. Physioth.",
		tekst:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, molestiae. Sequi odio eius inventore eum ut optio, in officia ab.",
		image: Luka,
		cv: {
			obrazovanje: "ZVU Zagreb 2015.-2020.",
			posao: "Insignia 2020.-2025",
		},
	},
	{
		ime: "Ema",
		titula: "bacc. Physioth.",
		tekst:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, molestiae. Sequi odio eius inventore eum ut optio, in officia ab.",
		image: Ema,
		cv: {
			obrazovanje: "ZVU Zagreb 2015.-2020.",
			posao: "Insignia 2020.-2025",
		},
	},
	{
		ime: "Dina",
		titula: "bacc. Physioth.",
		tekst:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, molestiae. Sequi odio eius inventore eum ut optio, in officia ab.",
		image: Dina,
		cv: {
			obrazovanje: "ZVU Zagreb 2015.-2020.",
			posao: "Insignia 2020.-2025",
		},
	},
];

function Grid() {
	return (
		<div className="grid grid-cols-1 w-fit sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 px-10 max-w-[1200px] mx-[auto] mb-[80px]">
			{fizioterapeuti.map((fizio) => {
				return (
					<div className="card w-64 h-80">
						<div className="card_inner w-full h-full relative shadow-lg rounded-xl">
							<div className="card_front absolute w-full h-full flex flex-col justify-center items-center gap-10 py-10 rounded-xl  bg-white">
								<img src={fizio.image} className="rounded-xl" loading="lazy" />
								<p className="font-bold text-2xl">{fizio.ime}</p>
								<p className="italic">{fizio.titula}</p>
							</div>
							<div className="card_back absolute w-full h-full flex flex-col justify-start items-center gap-10 py-10 pl-5 rounded-xl  bg-slate-300">
								<img src={cv} height={40} width={40} />
								<div className="flex flex-col justify-start items-start gap-5">
									<p className="font-semibold text-lg italic">
										- {fizio.cv.obrazovanje}
									</p>
									<p className="font-semibold text-lg italic">
										- {fizio.cv.posao}
									</p>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Grid;
