//icons
import usluge from "@/assets/services/usluge.svg";
import electroIcon from "@/assets/services/electrotherapy.svg";
import ultraIcon from "@/assets/services/ultrasound.svg";
import manualIcon from "@/assets/services/manual.svg";
import waterIcon from "@/assets/services/water.svg";
import laserIcon from "@/assets/services/laser.svg";
import kinesioIcon from "@/assets/services/kinesio.svg";
import { FaAngleDown } from "react-icons/fa";
//images
import person from "@/assets/grid/person.svg";
import Ana from "@/assets/grid/Ana.jpg";
import Dina from "@/assets/grid/Dina.jpg";
import Ema from "@/assets/grid/Ema.jpg";
import Luka from "@/assets/grid/Luka.jpg";
import Marija from "@/assets/grid/Marija.jpg";
import Nikola from "@/assets/grid/Nikola.jpg";

import { useState } from "react";

function BookNow() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showTherapist, setShowTherapist] = useState(false);

  const toggleService = () => {
    setIsBlurred(!isBlurred);
    setShowService(!showService);
  };

  const toggleTherapist = () => {
    setIsBlurred(!isBlurred);
    setShowTherapist(!showTherapist);
  };

  const toggleBlur = () => {
    setIsBlurred(false);
    setShowService(false);
    setShowTherapist(false);
  };

  return (
    <div className="relative">
      {isBlurred && (
        <div
          className="fixed inset-0 z-10 backdrop-blur-sm"
          onClick={toggleBlur}
        ></div>
      )}
      <h3 className="relative px-36 pt-16 text-4xl text-slate-800">
        Napravi rezervaciju
      </h3>
      <form className="flex items-center justify-between px-36 py-16">
        <div className="relative flex w-[45%] flex-col gap-10 rounded-xl border-2 p-4">
          <p className="">
            <span className="relative after:absolute after:left-0 after:top-[101%] after:h-[2px] after:w-full after:bg-slate-300">
              Odaberi terapiju
            </span>
          </p>
          <div
            className="flex cursor-pointer items-center justify-between gap-5 rounded-xl border-[1px] px-4 py-2 transition-all hover:border-slate-400 hover:bg-slate-200"
            onClick={toggleService}
          >
            <div className="flex items-center gap-4">
              <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                <img src={usluge} width={30} height={30} />
              </div>
              Usluga
            </div>
            <FaAngleDown />
          </div>
          {isBlurred && showService && (
            <ul className="absolute left-[16px] top-[calc(100%-16px)] z-20 w-[calc(100%-32px)] rounded-xl bg-white p-4 shadow-lg">
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all group-hover:border-slate-200 group-hover:bg-slate-200">
                  <img src={electroIcon} width={30} height={30} />
                </div>
                Elektroterapija
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all group-hover:border-slate-200 group-hover:bg-slate-200">
                  <img src={ultraIcon} width={30} height={30} />
                </div>
                Ultrazvučna terapija
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all group-hover:border-slate-200 group-hover:bg-slate-200">
                  <img src={manualIcon} width={30} height={30} />
                </div>
                Manualna terapija
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all group-hover:border-slate-200 group-hover:bg-slate-200">
                  <img src={waterIcon} width={30} height={30} />
                </div>
                Hidroterapija
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all group-hover:border-slate-200 group-hover:bg-slate-200">
                  <img src={laserIcon} width={30} height={30} />
                </div>
                Terapija laserom
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="flex h-fit w-fit items-center justify-center overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all group-hover:border-slate-200 group-hover:bg-slate-200">
                  <img src={kinesioIcon} width={30} height={30} />
                </div>
                Kinezioterapija
              </li>
            </ul>
          )}
        </div>
        <div className="relative flex w-[45%] flex-col gap-10 rounded-xl border-2 p-4">
          <p>
            <span className="relative after:absolute after:left-0 after:top-[107%] after:h-[2px] after:w-full after:bg-slate-300">
              Odaberi terapeuta
            </span>
          </p>
          <div
            className="group flex cursor-pointer items-center justify-between gap-5 rounded-xl border-[1px] px-4 py-2 transition-all hover:border-slate-400 hover:bg-slate-200"
            onClick={toggleTherapist}
          >
            <div className="flex items-center gap-4">
              <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                <img src={person} width={30} height={30} />
              </div>
              Prvi dostupan
            </div>
            <FaAngleDown />
          </div>
          {isBlurred && showTherapist && (
            <ul className="absolute left-[16px] top-[calc(100%-16px)] z-20 w-[calc(100%-32px)] rounded-xl bg-white p-4 shadow-lg">
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                  <img src={Nikola} width={30} height={30} />
                </div>
                Nikola
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                  <img src={Marija} width={30} height={30} />
                </div>
                Marija
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                  <img src={Ana} width={30} height={30} />
                </div>
                Ana
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                  <img src={Luka} width={30} height={30} />
                </div>
                Luka
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                  <img src={Ema} width={30} height={30} />
                </div>
                Ema
              </li>
              <li className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200">
                <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                  <img src={Dina} width={30} height={30} />
                </div>
                Dina
              </li>
            </ul>
          )}
        </div>
      </form>
      <div className="mx-36 mb-36 rounded-xl border-[1px] border-slate-500 px-4 py-4">
        <h6 className="mb-4">Izaberi datum i vrijeme</h6>
        <div className=""></div>
      </div>
    </div>
  );
}

export default BookNow;
