function BookNow() {
  return (
    <div>
      <h3 className="relative px-10 pt-16 text-4xl text-slate-800">
        Make your reservation
      </h3>
      <form action="" className="mx-10 flex items-center justify-between py-16">
        <div className="flex w-[45%] flex-col gap-10 rounded-xl border-2 p-4">
          <label htmlFor="service" className="">
            <span className="relative after:absolute after:left-0 after:top-[101%] after:h-[2px] after:w-full after:bg-slate-300">
              Choose service
            </span>
          </label>
          <select name="service" id="service" required>
            <option value="" disabled selected hidden>
              Choose a service
            </option>
            <option value="Electrotherapy">Electrotherapy</option>
            <option value="Ultrasound">Ultrasound therapy</option>
            <option value="Manual">Manual Therapy</option>
            <option value="Hydrotherapy">Hydrotherapy</option>
            <option value="Laser">Laser therapy</option>
            <option value="Kinesiotherapy">Kinesiotherapy</option>
          </select>
        </div>
        <div className="flex w-[45%] flex-col gap-10 rounded-xl border-2 p-4">
          <label htmlFor="service">
            <span className="relative after:absolute after:left-0 after:top-[107%] after:h-[2px] after:w-full after:bg-slate-300">
              Choose a therapist
            </span>
          </label>
          <select name="service" id="service" required>
            <option value="" disabled selected hidden>
              Choose a therapist
            </option>
            <option value="Nikola">Nikola</option>
            <option value="Marija">Marija</option>
            <option value="Ana">Ana</option>
            <option value="Luka">Luka</option>
            <option value="Ema">Ema</option>
            <option value="Dina">Dina</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default BookNow;
