import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formatSlotDate, formatTime12Hour, formatTimeRange } from "@/lib/utils";
import { toast } from "sonner";
import ToastComponent from "./ui/ToastComponent";
import type { ReservationData, ServiceDetails } from "types/types";
import { IoMdTime } from "react-icons/io";
import { IoCalendarNumberOutline } from "react-icons/io5";

type ReservationPayload = {
  user_id: number;
  service_id: number;
  therapist_id: number;
  time_range: string;
  napomena?: string;
};

interface ReservationProps {
  selectedReservation: ReservationData | null;
  setSelectedReservation: React.Dispatch<
    React.SetStateAction<ReservationData | null>
  >;
  details: ServiceDetails;
  serviceId: number;
}

const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

async function makeReservation(data: ReservationPayload) {
  const response = await fetch(`${prodUrl}/api/v1/book-now/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    console.log("response", response);
    throw new Error("Failed to make reservation");
  }

  return response.json();
}

const Reservation = ({
  selectedReservation,
  setSelectedReservation,
  details,
  serviceId,
}: ReservationProps) => {
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const closeReservation = () => setSelectedReservation(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: makeReservation,
    onSuccess: () => {
      toast.custom((id) => (
        <ToastComponent
          id={id.toString()}
          type="yes"
          title="Rezervacija uspješna!"
          description="Hvala vam na povjerenju - Insignia poliklinika"
        />
      ));

      queryClient.invalidateQueries({
        queryKey: ["availableSlots", serviceId],
      });
      closeReservation();
    },
    onError: () => {
      toast.custom((id) => (
        <ToastComponent
          id={id.toString()}
          type="not"
          title="Rezervacija neuspješna!"
          description="Prijavite se kako bi napravili rezervaciju"
          button={{
            label: "Prijava",
            onClick: () => navigate(`/prijava`),
          }}
        />
      ));
    },
  });

  const handleReservation = () => {
    if (!selectedReservation) return;
    const { date, time, therapistId } = selectedReservation;

    const startTime = new Date(`${date}T${time}`);
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // +30min

    const startTimeTransformed = formatTimeRange(startTime);
    const endTimeTransformed = formatTimeRange(endTime);

    const timeRange = `[${startTimeTransformed}, ${endTimeTransformed})`;
    const napomena = noteRef.current?.value;

    const payload = {
      user_id: 2,
      service_id: serviceId,
      therapist_id: therapistId,
      time_range: timeRange,
      napomena,
    };

    mutation.mutate(payload);
  };

  return (
    <>
      {selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[90%] max-w-md rounded-xl bg-white shadow-xl shadow-slate-900">
            <h2 className="mb-6 rounded-t-xl bg-slate-200 p-6 text-2xl font-bold">
              Rezerviraj
            </h2>
            <div className="flex flex-col gap-5 px-6">
              <div className="flex text-xl">
                <div className="flex min-w-[55%] items-center gap-2">
                  <IoCalendarNumberOutline className="text-2xl" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-600">Datum:</span>{" "}
                    {
                      formatSlotDate(new Date(selectedReservation.date))
                        .dateString
                    }
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IoMdTime className="text-2xl" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-600">
                      Vrijeme:
                    </span>{" "}
                    {formatTime12Hour(selectedReservation.time)}
                  </div>
                </div>
              </div>
              <div className="flex text-xl">
                <div className="flex min-w-[55%] items-center gap-2">
                  <img
                    src={`${
                      details.therapists.find(
                        (therapist) =>
                          therapist.therapistId ===
                          selectedReservation.therapistId,
                      )?.therapistIcon
                    }`}
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt="Selected therapist"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-600">
                      Terapeut:
                    </span>{" "}
                    {`${
                      details.therapists.find(
                        (therapist) =>
                          therapist.therapistId ===
                          selectedReservation.therapistId,
                      )?.therapistName
                    } ${
                      details.therapists.find(
                        (therapist) =>
                          therapist.therapistId ===
                          selectedReservation.therapistId,
                      )?.therapistLastname
                    }`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={`${details.services[0].serviceIcon}`}
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt="Selected therapist"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-600">
                      Usluga:
                    </span>{" "}
                    {details.services[0].serviceName}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xl">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-600">Napomena:</p>
                </div>
                <div>
                  <textarea
                    ref={noteRef}
                    name=""
                    id=""
                    rows={5}
                    className="w-full rounded-lg border-2 border-slate-300 p-3 text-sm"
                    placeholder="Vaša poruka..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="rounded-b-xl bg-slate-100 px-6 pb-6">
              <button
                className="mt-10 w-full rounded-lg bg-slate-600 py-2 text-lg text-white transition hover:bg-slate-800"
                onClick={handleReservation}
              >
                Rezerviraj
              </button>
              <button
                className="mt-2 w-full rounded-lg py-2 text-lg text-slate-700 transition-all hover:bg-slate-400 hover:text-white"
                onClick={closeReservation}
              >
                Odustani
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reservation;
