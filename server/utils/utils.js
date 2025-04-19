function generateAvailabilityMap(slots) {
  const result = {};

  // First, group slots by date for easier pre-building
  const therapistSlotsByDate = {};

  slots.forEach(({ therapist_id, available }) => {
    // Fix closing bracket, parse the JSON
    const [rawStart, rawEnd] = JSON.parse(available.replace(")", "]"));
    const start = new Date(rawStart);
    const end = new Date(rawEnd);

    const current = new Date(start);

    while (current < end) {
      const dateKey = current.toISOString().split("T")[0]; // e.g. "2025-04-17"
      const timeKey = current.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }); // e.g. "08:30"

      // Ensure date exists
      if (!therapistSlotsByDate[dateKey]) therapistSlotsByDate[dateKey] = {};

      // Ensure time exists
      if (!therapistSlotsByDate[dateKey][timeKey])
        therapistSlotsByDate[dateKey][timeKey] = [];

      // Add therapist if not already in the array
      if (!therapistSlotsByDate[dateKey][timeKey].includes(therapist_id)) {
        therapistSlotsByDate[dateKey][timeKey].push(therapist_id);
      }

      current.setMinutes(current.getMinutes() + 30);
    }
  });

  Object.entries(therapistSlotsByDate).forEach(([dateKey, timeslots]) => {
    result[dateKey] = {};
    let current = new Date(`${dateKey}T08:00:00`);

    for (let i = 0; i < 24; i++) {
      // 08:00 to 19:30 = 24 slots
      const timeKey = current.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (timeslots[timeKey]) {
        result[dateKey][timeKey] = timeslots[timeKey];
      }

      current.setMinutes(current.getMinutes() + 30);
    }
  });

  return result;
}

function generateDetails(slots) {
  const result = {
    services: [],
    therapists: [],
  };

  const seenTherapistIds = new Set();
  const seenServiceIds = new Set();

  slots.forEach(
    ({
      therapist_id,
      therapist_name,
      therapist_lastname,
      therapist_icon,
      service_id,
      service_name,
      service_icon,
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
    }
  );

  return result;
}
module.exports = {
  generateAvailabilityMap,
  generateDetails,
};
