import { formatSlotDate } from "@/lib/utils";
import { useState } from "react";
import Popup from "./Popup";
import Reservation from "./Reservation";
import { PopupData, ReservationData, ServiceDetails } from "types/types";

type Appointments = {
  [date: string]: {
    [time: string]: number[];
  };
};

type Props = {
  appointments: Appointments;
  details: ServiceDetails;
  serviceId: number;
};

const AppointmentDays = ({ appointments, details, serviceId }: Props) => {
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationData | null>(null);

  const slots = Object.entries(appointments);

  const dates = slots.map((slot) => {
    return formatSlotDate(new Date(slot[0]));
  });

  const handleTherapistSelect = (
    e: React.MouseEvent<HTMLDivElement>,
    therapists: number[],
    time: string,
    date: string,
  ) => {
    e.stopPropagation();

    if (therapists.length > 1) {
      setPopupData({ therapists, time, date });
    } else {
      console.log("Selected therapist ID:", therapists[0]);
      setSelectedReservation({ therapistId: therapists[0], time, date });
      // Trigger appointment logic here...
    }
  };

  return (
    <>
      {slots.map((slot, i) => {
        return (
          <div className="flex min-w-44 flex-col gap-1" key={i}>
            <div className="flex flex-col items-center rounded-lg bg-slate-500 p-2 text-slate-100">
              <p className="text-base italic">{dates[i].dayName}</p>
              <p className="text-sm italic">{dates[i].dateString}</p>
            </div>
            {Object.entries(slot[1]).map(([time, therapistIds], i) => {
              return (
                <div
                  className="group flex cursor-pointer items-center justify-between gap-8 rounded-lg border-2 border-slate-200 p-2 transition-all duration-500 hover:bg-slate-500"
                  key={i}
                  onClick={(e) =>
                    handleTherapistSelect(e, therapistIds, time, slot[0])
                  }
                >
                  <span className="text-slate-900 transition-all duration-500 group-hover:text-slate-100">
                    {time}
                  </span>
                  <div className="flex space-x-[-10px]">
                    {therapistIds.map((iconId, i) => {
                      return (
                        <div
                          className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all duration-500 group-hover:border-slate-100"
                          key={i}
                        >
                          <img
                            src={`${
                              details.therapists.find(
                                (therapist) => therapist.therapistId === iconId,
                              )?.therapistIcon ?? ""
                            }`}
                            width={30}
                            height={30}
                            className="transition-all duration-500 group-hover:bg-slate-100"
                            alt={`Terapeut ${iconId} insignia`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Popup for selecting therapist */}
      <Popup
        popupData={popupData}
        setPopupData={setPopupData}
        detailsTherapists={details.therapists}
        setSelectedReservation={setSelectedReservation}
      />

      {/* Final reservation overlay */}
      <Reservation
        selectedReservation={selectedReservation}
        setSelectedReservation={setSelectedReservation}
        details={details}
        serviceId={serviceId}
      />
    </>
  );
};

export default AppointmentDays;
