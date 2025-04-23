// import { FaRegWindowClose } from "react-icons/fa";

const AdminPopup = ({ bookingDetails, setShowPopup }) => {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex w-96 flex-col content-center gap-3 rounded-xl bg-white shadow-xl shadow-slate-900">
          <h5 className="relative w-full rounded-t-xl bg-slate-600 p-6 text-center text-xl font-bold text-white">
            Informacije o rezervaciji
            {/* <FaRegWindowClose
              className="absolute right-5 top-[50%] translate-y-[-50%] cursor-pointer text-white transition-all hover:text-slate-400"
              onClick={() => setShowPopup(false)}
            /> */}
          </h5>
          <div className="flex w-full flex-col items-start px-6">
            <h6 className="relative text-lg font-semibold after:absolute after:bottom-[2px] after:left-0 after:h-[2px] after:w-[50%] after:content-normal after:bg-slate-400">
              Korisnik
            </h6>
            <div className="flex w-full justify-between">
              <p className="font-semibold text-slate-700">Ime i prezime:</p>
              <p>{bookingDetails.user_full_name}</p>
            </div>
            <div className="flex w-full justify-between">
              <p className="font-semibold text-slate-700">E-mail:</p>
              <p>{bookingDetails.email}</p>
            </div>
            <div className="flex w-full justify-between">
              <p className="font-semibold text-slate-700">Broj telefona:</p>
              <p>{bookingDetails.phone}</p>
            </div>
            <div className="flex w-full justify-between">
              <p className="font-semibold text-slate-700">
                Datum registracije:
              </p>
              <p>{bookingDetails.dateOfRegistration}</p>
            </div>
          </div>
          <div className="flex w-full flex-col items-start px-6 pb-6">
            <h5 className="relative text-lg font-semibold after:absolute after:bottom-[2px] after:left-0 after:h-[2px] after:w-[50%] after:content-normal after:bg-slate-400">
              Rezervacija:
            </h5>
            <div className="flex w-full flex-col justify-between">
              <p className="font-semibold text-slate-700">
                Datum kreiranja rezervacije:
              </p>
              <p>{bookingDetails.dateOfBooking}</p>
            </div>
            <div className="flex w-full flex-col justify-between">
              <p className="font-semibold text-slate-700">Napomena:</p>
              <p>{bookingDetails.napomena}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPopup;
