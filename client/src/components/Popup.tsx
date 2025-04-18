import { formatSlotDate, formatTime12Hour } from "@/lib/utils";

const Popup = ({
  popupData,
  setPopupData,
  detailsTherapists,
  setSelectedReservation,
}) => {
  const closePopup = () => {
    setPopupData(null);
  };

  return (
    <>
      {popupData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col content-center items-center gap-3 rounded-xl bg-white p-6 shadow-xl shadow-slate-900">
            <h2 className="text-lg font-semibold">
              Odaberi terapeuta u {formatTime12Hour(popupData.time)} na datum{" "}
              {formatSlotDate(new Date(popupData.date)).dateString}
            </h2>
            <div className="flex gap-4">
              {popupData.therapists.map((id) => (
                <div
                  key={id}
                  className="group relative cursor-pointer rounded-full border border-gray-300 p-1 hover:ring-2 hover:ring-slate-600"
                  onClick={() => {
                    console.log("Therapist selected:", id);
                    // You can call a booking function here
                    closePopup();
                    setSelectedReservation({
                      therapistId: id,
                      time: popupData.time,
                      date: popupData.date,
                    });
                  }}
                >
                  <img
                    src={`src${
                      detailsTherapists.find(
                        (therapist) => therapist.therapistId === id,
                      ).therapistIcon
                    }`}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt={`Terapeut ${id}`}
                  />
                  {(() => {
                    const therapist = detailsTherapists.find(
                      (therapist) => therapist.therapistId === id,
                    );
                    return (
                      <p className="absolute bottom-[110%] left-[50%] translate-x-[-50%] text-nowrap rounded-xl bg-slate-200 px-3 py-2 opacity-0 transition group-hover:opacity-100">
                        {`${therapist.therapistName} ${therapist.therapistLastname}`}
                      </p>
                    );
                  })()}
                </div>
              ))}
            </div>
            <button
              className="text-md mt-2 w-full rounded-lg bg-slate-600 p-2 text-white transition-all hover:bg-slate-800"
              onClick={closePopup}
            >
              Povratak
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
