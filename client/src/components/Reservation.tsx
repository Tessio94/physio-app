import { formatSlotDate, formatTime12Hour } from "@/lib/utils";
import { IoMdTime } from "react-icons/io";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbMassage } from "react-icons/tb";

const Reservation = ({
  selectedReservation,
  setSelectedReservation,
  icons,
}) => {
  const closeReservation = () => setSelectedReservation(null);
  console.log(selectedReservation);
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
                <div className="flex min-w-[70%] items-center gap-2">
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
                <div className="flex min-w-[70%] items-center gap-2">
                  <img
                    src={icons[selectedReservation.therapistId]}
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt="Selected therapist"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-600">
                      Terapeut:
                    </span>{" "}
                    Nikola Lukić
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TbMassage className="text-2xl" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-600">
                      Usluga:
                    </span>{" "}
                    Masaža
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xl">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-600">Napomena:</p>
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    rows="5"
                    className="w-full rounded-lg border-2 border-slate-300 p-3 text-sm"
                    placeholder="Vaša poruka..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="rounded-b-xl bg-slate-100 px-6 pb-6">
              <button
                className="mt-10 w-full rounded-lg bg-slate-600 py-2 text-lg text-white transition hover:bg-slate-800"
                onClick={() => {
                  console.log("Making reservation:", selectedReservation);
                  // Trigger actual reservation logic here
                  closeReservation();
                }}
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
