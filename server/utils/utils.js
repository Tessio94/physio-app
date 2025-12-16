const MINUTES_30 = 30 * 60 * 1000;

function generateAvailabilityMap(slots) {
  const result = {};

  const therapistSlotsByDate = {};

  slots.forEach(({ therapist_id, available }) => {
    // Fix closing bracket, parse the JSON
    const [rawStart, rawEnd] = JSON.parse(available.replace(")", "]"));
    let start = Date.parse(rawStart);
    const end = Date.parse(rawEnd);

    while (start < end) {
      const dateKey = formatDateFix(start);
      const timeKey = formatTimeFix(start);

      if (!therapistSlotsByDate[dateKey]) therapistSlotsByDate[dateKey] = {};
      if (!therapistSlotsByDate[dateKey][timeKey])
        therapistSlotsByDate[dateKey][timeKey] = [];

      if (!therapistSlotsByDate[dateKey][timeKey].includes(therapist_id)) {
        therapistSlotsByDate[dateKey][timeKey].push(therapist_id);
      }

      start += MINUTES_30;
    }
  });
  Object.entries(therapistSlotsByDate).forEach(([dateKey, timeslots]) => {
    result[dateKey] = {};
    let current = Date.parse(`${dateKey}T08:00:00`);

    for (let i = 0; i < 24; i++) {
      const timeKey = formatTimeFix(current);

      if (timeslots[timeKey]) {
        result[dateKey][timeKey] = timeslots[timeKey];
      }

      current += MINUTES_30;
    }
  });

  return result;
}

function generateDetails(slots) {
  const result = {
    services: [],
    therapists: [],
    users: [],
  };

  const seenTherapistIds = new Set();
  const seenServiceIds = new Set();
  const seenUsersIds = new Set();

  slots.forEach(
    ({
      therapist_id,
      therapist_name,
      therapist_lastname,
      therapist_icon,
      service_id,
      service_name,
      service_icon,
      user_id,
      user_name,
      user_lastname,
      user_phone,
      user_email,
      napomena,
      created_at,
    }) => {
      if (!seenTherapistIds.has(therapist_id)) {
        seenTherapistIds.add(therapist_id);
        result.therapists.push({
          therapistId: therapist_id,
          therapistName: therapist_name,
          therapistLastname: therapist_lastname,
          therapistIcon: therapist_icon,
        });
      }

      if (!seenServiceIds.has(service_id)) {
        seenServiceIds.add(service_id);
        result.services.push({
          serviceId: service_id,
          serviceName: service_name,
          serviceIcon: service_icon,
        });
      }

      if (!seenUsersIds.has(user_id)) {
        seenUsersIds.add(user_id);
        result.users.push({
          userId: user_id,
          userName: user_name,
          userLastName: user_lastname,
          userPhone: user_phone,
          userEmail: user_email,
          napomena,
          created_at,
        });
      }
    }
  );

  return result;
}

function generateBookingDetails(appointments) {
  const formatted = {};

  appointments.forEach((entry) => {
    const [rawStart, rawEnd] = JSON.parse(entry.time_range.replace(")", "]"));
    let startDate = Date.parse(rawStart);
    const endDate = Date.parse(rawEnd);

    while (startDate < endDate) {
      const dateKey = formatDateFix(startDate);
      const timeKey = formatTimeFix(startDate);

      if (!formatted[dateKey]) {
        formatted[dateKey] = {};
      }

      formatted[dateKey][timeKey] = entry.user_id;

      // Increment by 30 minutes
      startDate += MINUTES_30;
    }
  });

  return formatted;
}

function formatUserDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateTime(date) {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format, 0 becomes 12
  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

  return `${year}-${month}-${day} ${formattedTime}`;
}

const splitUnavailableSlots = (start, end) => {
  const slots = [];

  // First slot: from unavailable_start to end of the day (8 PM)
  if (start < new Date(start.toDateString() + " 20:00:00")) {
    slots.push([start, new Date(start.toDateString() + " 20:00:00")]);
  }

  // Loop through the days in between
  let currentDate = new Date(start.toDateString());
  while (currentDate.getDate() < end.getDate()) {
    let nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);

    if (nextDay.getDate() < end.getDate()) {
      const startSlot = new Date(nextDay);
      startSlot.setHours(8, 0, 0, 0);
      const endSlot = new Date(nextDay);
      endSlot.setHours(20, 0, 0, 0);

      slots.push([startSlot, endSlot]);
    } else {
      // Last day: only until the unavailable end time
      const startSlot = new Date(nextDay);
      startSlot.setHours(8, 0, 0, 0);
      slots.push([startSlot, end]);
    }

    currentDate = nextDay;
  }
  // console.log(slots);
  // Convert each pair of start and end to tsrange format
  return slots.map(
    ([slotStart, slotEnd]) =>
      `[${formatDate(slotStart)},${formatDate(slotEnd)})`
  );
};

const pad = (n) => n.toString().padStart(2, "0");

const formatDate = (date) => {
  // console.log("date :", date);
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  // console.log("date 2:", date);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function createState() {
  // random 20 bytes
  const randomValues = crypto.getRandomValues(new Uint8Array(20));
  return encodeBase64url(randomValues);
}

function encodeBase64url(data) {
  return encodeBase64(data).replaceAll("+", "-").replaceAll("/", "_");
}

function encodeBase64(data) {
  let result = btoa(String.fromCharCode(...new Uint8Array(data)));
  return result;
}

function formatDateCron(date) {
  return date.toISOString().replace("T", " ").slice(0, 19);
}

function formatDateFix(ts) {
  return new Date(ts).toISOString().slice(0, 10);
}

function formatTimeFix(ts) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

module.exports = {
  generateAvailabilityMap,
  generateDetails,
  formatUserDate,
  formatDateTime,
  generateBookingDetails,
  splitUnavailableSlots,
  formatDate,
  formatDateCron,
  createState,
};
