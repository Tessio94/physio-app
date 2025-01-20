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
    <div id="team" className="bg-gridBack pb-[80px] pt-[100px]">
      <div className="mx-[auto] grid w-fit max-w-[1200px] grid-cols-1 gap-3 px-10 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {fizioterapeuti.map((fizio, i) => {
          return (
            <div className="card h-80 w-64" key={i}>
              <div className="card_inner relative h-full w-full rounded-xl shadow-2xl shadow-slate-500">
                <div className="card_front absolute flex h-full w-full flex-col items-center justify-center gap-10 rounded-xl bg-white py-10">
                  <img
                    src={fizio.image}
                    className="rounded-xl"
                    loading="lazy"
                  />
                  <p className="text-2xl font-bold">{fizio.ime}</p>
                  <p className="italic">{fizio.titula}</p>
                </div>
                <div className="card_back absolute flex h-full w-full flex-col items-center justify-start gap-10 rounded-xl bg-slate-300 py-10 pl-5">
                  <img src={cv} height={40} width={40} />
                  <div className="flex flex-col items-start justify-start gap-5">
                    <p className="text-lg font-semibold italic">
                      - {fizio.cv.obrazovanje}
                    </p>
                    <p className="text-lg font-semibold italic">
                      - {fizio.cv.posao}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
