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
    },
  },
];

const slots = Object.entries(data[0].availableTimes);
console.log(slots);
const slotDate = slots[0][0];
console.log(slotDate);
const d = formatSlotDate(new Date(slotDate));
console.log(d);

const AppointmentDays = () => {
  let dayFunc = new Date().getDay() + 1;
  let dayOfWeek;

  switch (dayFunc) {
    case 1:
      dayOfWeek = "Ned";
      break;
    case 2:
      dayOfWeek = "Pon";
      break;
    case 3:
      dayOfWeek = "Uto";
      break;
    case 4:
      dayOfWeek = "Sri";
      break;
    case 5:
      dayOfWeek = "Čet";
      break;
    case 6:
      dayOfWeek = "Pet";
      break;
    case 7:
      dayOfWeek = "Sub";
  }

  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const day = String(new Date().getDate()).padStart(2, "0");

  return (
    <>
      {slots.map((slot, i) => {
        return (
          <div className="flex flex-col gap-1" key={i}>
            <div className="flex flex-col items-center rounded-lg bg-slate-500 p-2 text-slate-100">
              <p className="text-base italic">{dayOfWeek + i}</p>
              <p className="text-sm italic">{`${day}.${month}`}</p>
            </div>
            <div className="group flex cursor-pointer items-center gap-8 rounded-lg border-2 border-slate-200 p-2 transition-all duration-500 hover:bg-slate-500">
              <span className="text-slate-900 transition-all duration-500 group-hover:text-slate-100">
                08:30
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
          </div>
        );
      })}
    </>
  );
};

export default AppointmentDays;
