import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import AppointmentDays from "./AppointmentDays";

// Fetch the available slots for the selected service
async function fetchAvailableSlots(serviceId) {
  const now = new Date();
  const today = new Date(now);
  const threeWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

  const minDate = formatDate(today);
  const maxDate = formatDate(threeWeeksLater);

  const response = await fetch(
    `http://localhost:3000/api/v1/book-now/appointments/all?serviceId=${serviceId}&minDate=${minDate}&maxDate=${maxDate}`,
  );
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error("Failed to fetch available slots");
  }

  return data;
}

const AvailableSlots = ({ serviceId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["availableSlots", serviceId],
    queryFn: () => fetchAvailableSlots(serviceId),
    enabled: !!serviceId, // Only run the query if serviceId is available
  });
  // console.log(JSON.stringify(data, null, 2));

  if (isLoading) {
    return <div>Loading available slots...</div>;
  }

  if (isError) {
    return <div>Failed to fetch available slots.</div>;
  }

  return (
    <div className="overflow-x-scroll">
      <h6 className="mb-3">Slobodni termini:</h6>
      <div className="flex gap-1">
        <AppointmentDays />
      </div>
    </div>
  );
};

export default AvailableSlots;
