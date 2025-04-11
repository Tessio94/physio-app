//icons
import usluge from "@/assets/services/usluge.svg";
import { FaAngleDown } from "react-icons/fa";
//images
import person from "@/assets/grid/person.svg";

import { Audio } from "react-loader-spinner";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DropdownOption from "@/components/DropdownOption";
import AvailableSlots from "@/components/AvaliableSlots";

// const fetchServicesAndTherapists = async ({ queryKey }) => {
//   const [, { serviceId, minDate, maxDate }] = queryKey;
//   const response = await fetch(`/api/v1/book-now`);
//   const data = await response.json();
//   return data.payload;
// };

function BookNow() {
  const [selectedService, setSelectedService] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showTherapist, setShowTherapist] = useState(false);
  const [minLoaderTimePassed, setMinLoaderTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoaderTimePassed(true);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  const { isPending, error, data } = useQuery({
    queryKey: ["serviceData"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/book-now").then((res) => res.json()),
  });

  const services = data?.services ?? [];
  const therapists = data?.therapists ?? [];

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

  const loading = isPending || !minLoaderTimePassed;

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
  };

  return (
    <>
      {loading ? (
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="bg-slate-500"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
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
                  {isPending ? (
                    <li className="py-2 text-center text-slate-500">
                      Učitavanje...
                    </li>
                  ) : (
                    services?.map((service) => {
                      const { id, name, icon } = service;

                      return (
                        <DropdownOption
                          key={id}
                          id={id}
                          name={name}
                          icon={icon}
                          fetchService={handleServiceSelect}
                        />
                      );
                    })
                  )}
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
                  {isPending ? (
                    <li className="py-2 text-center text-slate-500">
                      Učitavanje...
                    </li>
                  ) : (
                    therapists?.map((therapist) => {
                      const { id, name, icon } = therapist;

                      return (
                        <DropdownOption key={id} name={name} icon={icon} />
                      );
                    })
                  )}
                </ul>
              )}
            </div>
          </form>
          <div className="mx-36 mb-36 rounded-xl border-[1px] border-slate-500 px-4 py-4">
            <h6 className="mb-4">Izaberi datum i vrijeme</h6>
            {selectedService ? (
              <AvailableSlots serviceId={selectedService} />
            ) : (
              <div className="mx-auto w-fit text-slate-500">
                Rezultati će biti prikazani nakon odabira usluge i terapeuta
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BookNow;
