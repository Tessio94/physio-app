import { formatSlotDate } from "@/lib/utils";

const Popup = ({ popupData, setPopupData, icons, setSelectedReservation }) => {
  const closePopup = () => {
    setPopupData(null);
  };

  return (
    <>
      {popupData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-6 shadow-xl shadow-slate-900">
            <h2 className="mb-4 text-lg font-semibold">
              Odaberi terapeuta u {popupData.time} na datum{" "}
              {formatSlotDate(new Date(popupData.date)).dateString}
            </h2>
            <div className="flex gap-4">
              {popupData.therapists.map((id) => (
                <div
                  key={id}
                  className="cursor-pointer rounded-full border border-gray-300 p-1 hover:ring-2 hover:ring-slate-600"
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
                    src={icons[id]}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt={`Terapeut ${id}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="mt-4 text-sm text-black hover:underline"
              onClick={closePopup}
            >
              Povratak
            </button>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default Popup;
