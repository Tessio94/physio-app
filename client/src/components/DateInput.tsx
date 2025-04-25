import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const bookedTimes = [
  new Date("2025-04-26T10:00:00"),
  new Date("2025-04-26T11:30:00"),
  new Date("2025-04-26T15:00:00"),
];

const DateInput = () => {
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const minTime = new Date();
  minTime.setHours(8, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(19, 30, 0);

  return (
    <DatePicker
      className="h-[38px] cursor-pointer rounded-lg border-[1px] border-slate-200 px-3 py-2"
      showTimeSelect
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      timeClassName={handleColor}
      timeIntervals={30}
      minTime={minTime}
      maxTime={maxTime}
      minDate={new Date()}
      excludeTimes={bookedTimes}
      dateFormat={"dd/MM/yyyy HH:mm aa"}
    />
  );
};

export default DateInput;
