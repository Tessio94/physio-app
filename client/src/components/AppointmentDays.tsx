import person from "@/assets/grid/person.svg";
import { formatSlotDate } from "@/lib/utils";

const data = [
  {
    availableTimes: {
      "2025-04-14": ["08:00", "08:30", "09:00", "09:30", "10:00", "12:30"],
      "2025-04-15": ["08:00", "08:30", "09:00", "09:30", "12:30"],
      "2025-04-16": ["08:00", "10:30", "11:30", "12:30"],
      "2025-04-17": [
        "08:00",
        "12:30",
        "13:00",
        "14:00",
        "14:30",
        "15:00",
        "16:00",
      ],
      "2025-04-18": ["08:00", "12:30"],
      "2025-04-19": [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "12:30",
        "14:30",
        "16:30",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
      ],
      "2025-04-21": ["08:00", "12:30", "14:30", "16:30"],
      "2025-04-22": ["08:00", "12:30", "14:30", "16:30"],
      "2025-04-23": ["08:00", "12:30", "14:30", "16:30"],
      "2025-04-24": ["08:00", "12:30", "14:30", "16:30"],
    },
  },
];

const slots = Object.entries(data[0].availableTimes);

const dates = slots.map((slot) => {
  return formatSlotDate(new Date(slot[0]));
});

const AppointmentDays = () => {
  return (
    <>
      {slots.map((slot, i) => {
        return (
          <div className="flex min-w-fit flex-col gap-1" key={i}>
            <div className="flex flex-col items-center rounded-lg bg-slate-500 p-2 text-slate-100">
              <p className="text-base italic">{dates[i].dayName}</p>
              <p className="text-sm italic">{dates[i].dateString}</p>
            </div>
            {slot[1].map((slotTimes, i) => {
              return (
                <div
                  className="group flex cursor-pointer items-center gap-8 rounded-lg border-2 border-slate-200 p-2 transition-all duration-500 hover:bg-slate-500"
                  key={i}
                >
                  <span className="text-slate-900 transition-all duration-500 group-hover:text-slate-100">
                    {slotTimes}
                  </span>
                  <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all duration-500 group-hover:border-slate-100">
                    <img
                      src={person}
                      width={30}
                      height={30}
                      className="transition-all duration-500 group-hover:bg-slate-100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default AppointmentDays;
