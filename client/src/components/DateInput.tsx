import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type DateInputProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  type: "form" | "to";
  minDate?: Date;
  minTime?: Date;
};

// const bookedTimes = [
//   new Date("2025-04-26T10:00:00"),
//   new Date("2025-04-26T11:30:00"),
//   new Date("2025-04-26T15:00:00"),
// ];

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

const DateInput = ({
  value,
  onChange,
  type,
  minDate,
  minTime,
}: DateInputProps) => {
  const [therapistId, setTherapistId] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["excludeTimes", therapistId],
    queryFn: () => fetchAdminSchedule(therapistId),
    enabled: !!therapistId,
  });

  console.log(data);

  const bookedTimesForSelectedDate = React.useMemo(() => {
    if (!data || !data.bookedSlots || !value) return [];

    const selectedDateStr = value.toISOString().split("T")[0]; // e.g., "2025-04-25"
    const daySlots = data.bookedSlots[selectedDateStr];
    if (!daySlots) return [];

    return Object.keys(daySlots).map((timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const date = new Date(value);
      date.setHours(hours, minutes, 0, 0);
      return date;
    });
  }, [data, value]);

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const now = new Date();

  const isToday = value && now.toDateString() === value.toDateString();

  let getRoundedCurrentTime;

  if (type === "from") {
    getRoundedCurrentTime = () => {
      const rounded = new Date(now);
      const minutes = rounded.getMinutes();
      const remainder = 30 - (minutes % 30);
      rounded.setMinutes(minutes + remainder);
      rounded.setSeconds(0);
      rounded.setMilliseconds(0);
      return rounded;
    };
  } else {
    getRoundedCurrentTime = () => {
      const rounded = new Date(now);
      const minutes = rounded.getMinutes();
      const remainder = 30 - (minutes % 30);
      rounded.setMinutes(minutes + remainder + 30);
      rounded.setSeconds(0);
      rounded.setMilliseconds(0);
      return rounded;
    };
  }

  const defaultMinTime = isToday
    ? getRoundedCurrentTime()
    : new Date(new Date().setHours(8, 0, 0));

  const maxTime = new Date();
  maxTime.setHours(19, 30, 0);

  return (
    <DatePicker
      className="h-[38px] cursor-pointer rounded-lg border-[1px] border-slate-200 px-3 py-2"
      showTimeSelect
      selected={value}
      onChange={onChange}
      timeClassName={handleColor}
      timeIntervals={30}
      minTime={minTime ?? defaultMinTime}
      maxTime={maxTime}
      minDate={minDate ?? new Date()}
      excludeTimes={bookedTimesForSelectedDate}
      dateFormat={"dd/MM/yyyy HH:mm aa"}
    />
  );
};

export default DateInput;
