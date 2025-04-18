import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatSlotDate = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = date.getDay() + 1;

  let dayName: string;

  switch (dayOfWeek) {
    case 1:
      dayName = "Ned";
      break;
    case 2:
      dayName = "Pon";
      break;
    case 3:
      dayName = "Uto";
      break;
    case 4:
      dayName = "Sri";
      break;
    case 5:
      dayName = "Čet";
      break;
    case 6:
      dayName = "Pet";
      break;
    case 7:
      dayName = "Sub";
  }

  return {
    dateString: `${day}.${month}`,
    dayName,
  };
};

export const formatTime12Hour = (time24) => {
  const [hour, minute] = time24.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  // const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
};

export const formatTimeRange = (date) => {
  const [month, day, year] = date.toLocaleDateString().split("/");

  const dateString = [
    year.padStart(4, "0"),
    month.padStart(2, "0"),
    day.padStart(2, "0"),
  ].join("-");

  const timeString = date.toLocaleTimeString().slice(0, -3);

  return `${dateString} ${timeString}`;
};
