import AdminPopup from "@/components/AdminPopup";
import { cn, formatSlotDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchAdminSchedule(therapistId) {
  const response = await fetch(
    `http://localhost:3000/api/v1/admin/schedule/${therapistId}`,
  );
  const data = await response.json();
  // console.log(data);
  if (!response.ok) {
    throw new Error("Failed to fetch available slots");
  }

  return data;
}

async function fetchAppointmentDetails(selectedAppointment) {
  // console.log("selectedAppointment :", selectedAppointment);
  const { userId, time, date } = selectedAppointment;
  const timestamp = `${date} ${time}:00`;
  const response = await fetch(
    `http://localhost:3000/api/v1/admin/schedule/appointment-details/${userId}?timestamp=${encodeURIComponent(timestamp)}`,
  );
  const data = await response.json();
  // console.log(data);
  if (!response.ok) {
    throw new Error("Failed to fetch available slots");
  }

  return data;
}

const AdminKalendar = () => {
  const [therapistId, setTherapistId] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["schedule", therapistId],
    queryFn: () => fetchAdminSchedule(therapistId),
    enabled: !!therapistId,
  });

  let appointments;
  let details;
  let bookedSlots;

  console.log(data);
  if (data) {
    appointments = Object.entries(data["availability"]);
    details = data["appointmentDetails"];
    bookedSlots = data["bookedSlots"];
  }
  // console.log(appointments);

  const dates = appointments?.map((slot) => {
    return formatSlotDate(new Date(slot[0]));
  });

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  const handleSlotSelect = (e, userId, time, date) => {
    if (showPopup === false) {
      e.stopPropagation();
      console.log(userId, time, date);
      // setAppointmentDetails({ time, date });
      setSelectedSlot({ userId, time, date });
      setShowPopup(true);
    } else {
      return;
    }
  };

  const {
    data: bookingDetails,
    isLoading: isBookingLoading,
    isError: isBookingError,
  } = useQuery({
    queryKey: ["bookingDetails", selectedSlot],
    queryFn: () => fetchAppointmentDetails(selectedSlot),
    enabled: !!selectedSlot,
  });
  console.log(bookingDetails);
  return (
    <>
      <h4 className="ml-5 text-2xl text-slate-600">
        Raspored zakazanih termina
      </h4>
      <div className="mx-5 pb-10 pt-6">
        <div className="flex gap-1">
          {data
            ? appointments.map((slot, i) => {
                return (
                  <div className="flex min-w-24 flex-col gap-1" key={i}>
                    <div className="flex flex-col items-center rounded-lg bg-slate-500 p-2 text-slate-100">
                      <p className="text-base italic">{dates[i].dayName}</p>
                      <p className="text-sm italic">{dates[i].dateString}</p>
                    </div>

                    {timeSlots.map((timeSlot, i) => {
                      const date = slot[0]; // e.g. "2025-04-22" - today
                      const isBooked =
                        bookedSlots &&
                        bookedSlots[date] &&
                        bookedSlots[date][timeSlot] !== undefined;

                      const userId = isBooked
                        ? bookedSlots[date][timeSlot]
                        : null;

                      return isBooked ? (
                        <div
                          className="group flex cursor-pointer items-center justify-center gap-8 rounded-lg border-2 border-slate-200 bg-red-300 p-2 font-bold transition-all duration-500 hover:bg-red-500"
                          key={i}
                          onMouseEnter={(e) =>
                            handleSlotSelect(e, userId, timeSlot, date)
                          }
                          onMouseLeave={() => setShowPopup(false)}
                        >
                          <span className="text-slate-900 transition-all duration-500 group-hover:text-slate-100">
                            {timeSlot}
                          </span>
                        </div>
                      ) : (
                        <div
                          className="group flex items-center justify-center gap-8 rounded-lg border-2 border-slate-200 p-2"
                          key={i}
                        >
                          <span className="text-slate-900">{timeSlot}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            : "Loadanje podataka"}
        </div>
      </div>
      {bookingDetails && showPopup && (
        <AdminPopup
          bookingDetails={bookingDetails}
          setShowPopup={setShowPopup}
        />
      )}
    </>
  );
};

export default AdminKalendar;
