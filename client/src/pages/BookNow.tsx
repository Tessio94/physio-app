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
import { cn } from "@/lib/utils";

// const fetchServicesAndTherapists = async ({ queryKey }) => {
//   const [, { serviceId, minDate, maxDate }] = queryKey;
//   const response = await fetch(`/api/v1/book-now`);
//   const data = await response.json();
//   return data.payload;
// };

function BookNow() {
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showTherapist, setShowTherapist] = useState(false);
  const [minLoaderTimePassed, setMinLoaderTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoaderTimePassed(true);
    }, 700); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showService || showTherapist) {
      setIsExiting(true);
    } else {
      setIsExiting(false);
    }
  }, [showService, showTherapist]);

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
    setSelectedServiceId(serviceId);
  };

  const handleTherapistSelect = (therapistId) => {
    setSelectedTherapistId(therapistId);
  };

  const selectedService = services.find(
    (service) => service.id === selectedServiceId,
  );
  const selectedTherapist = therapists.find(
    (therapist) => therapist.id === selectedTherapistId,
  );

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
          <div
            className={cn(
              "fixed inset-0 z-10 transition-all duration-500 ease-in-out",
              isBlurred
                ? "backdrop-blur-sm"
                : "pointer-events-none backdrop-blur-none",
            )}
            onClick={toggleBlur}
          ></div>

          <h3 className="relative px-2 pt-16 text-4xl text-slate-800 sm:px-12 md:px-24 xl:px-56">
            Napravi rezervaciju
          </h3>

          <div className="flex flex-col items-center justify-between px-2 py-16 max-sm:gap-8 sm:flex-row sm:px-12 md:px-24 xl:px-56">
            <div
              className={cn(
                "relative flex w-full flex-col gap-10 rounded-xl border-2 p-4 transition-all sm:w-[48%] xl:w-[45%]",
                isBlurred && showService ? "z-20" : "z-0",
                isExiting ? "delay-500" : "delay-0",
              )}
            >
              <p className="">
                <span className="relative after:absolute after:left-0 after:top-[101%] after:h-[2px] after:w-full after:bg-slate-300">
                  Odaberi terapiju
                </span>
              </p>
              <div
                className="flex cursor-pointer items-center justify-between gap-5 rounded-xl border-[1px] px-4 py-2 transition-all hover:border-slate-400 hover:bg-slate-200"
                onClick={toggleService}
              >
                {selectedServiceId ? (
                  <div className="flex items-center gap-4">
                    <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                      <img
                        src={`src${selectedService.icon}`}
                        width={30}
                        height={30}
                      />
                    </div>
                    {selectedService.name}
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                      <img src={usluge} width={30} height={30} />
                    </div>
                    Usluga
                  </div>
                )}
                <FaAngleDown />
              </div>

              <ul
                className={cn(
                  "absolute left-[16px] top-[calc(100%-16px)] w-[calc(100%-32px)] overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500",
                  isBlurred && showService
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                {services?.map((service) => {
                  const { id, name, icon } = service;

                  return (
                    <DropdownOption
                      key={id}
                      id={id}
                      name={name}
                      icon={icon}
                      selectService={handleServiceSelect}
                      toggleBlur={toggleBlur}
                      type="service"
                    />
                  );
                })}
              </ul>
            </div>
            <div
              className={cn(
                "relative flex w-full flex-col gap-10 rounded-xl border-2 p-4 transition-all sm:w-[48%] xl:w-[45%]",
                isBlurred && showTherapist ? "z-20" : "z-0",
                isExiting ? "delay-500" : "delay-0",
              )}
            >
              <p>
                <span className="relative after:absolute after:left-0 after:top-[107%] after:h-[2px] after:w-full after:bg-slate-300">
                  Odaberi terapeuta
                </span>
              </p>
              <div
                className="group flex cursor-pointer items-center justify-between gap-5 rounded-xl border-[1px] px-4 py-2 transition-all hover:border-slate-400 hover:bg-slate-200"
                onClick={toggleTherapist}
              >
                {selectedTherapistId ? (
                  <div className="flex items-center gap-4">
                    <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                      <img
                        src={`src${selectedTherapist.icon}`}
                        width={30}
                        height={30}
                      />
                    </div>
                    {selectedTherapist.name}
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45">
                      <img src={person} width={30} height={30} />
                    </div>
                    Prvi dostupan
                  </div>
                )}
                <FaAngleDown />
              </div>
              <ul
                className={cn(
                  "absolute left-[16px] top-[calc(100%-16px)] w-[calc(100%-32px)] overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500",
                  isBlurred && showTherapist
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                {therapists?.map((therapist) => {
                  const { id, name, icon } = therapist;

                  return (
                    <DropdownOption
                      key={id}
                      id={id}
                      name={name}
                      icon={icon}
                      selectTherapist={handleTherapistSelect}
                      toggleBlur={toggleBlur}
                      type="therapist"
                    />
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="relative mx-2 mb-36 rounded-xl border-[1px] border-slate-500 px-4 py-4 sm:mx-12 md:mx-24 xl:mx-56">
            <h6 className="mb-4 text-xl">Izaberi datum i vrijeme</h6>
            {selectedServiceId ? (
              <div>
                <AvailableSlots
                  serviceId={selectedServiceId}
                  therapistId={selectedTherapistId}
                />
              </div>
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
