import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import AppointmentDays from "./AppointmentDays";

// Fetch the available slots for the selected service
async function fetchAvailableSlots(serviceId) {
  const response = await fetch(
    `http://localhost:3000/api/v1/book-now/appointments/all?serviceId=${serviceId}`,
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

  if (isLoading) {
    return <div>Loading available slots...</div>;
  }

  if (isError) {
    return <div>Failed to fetch available slots.</div>;
  }
  let appointmentsServices;
  if (data) {
    appointmentsServices = data["appointmentsServices"];
  }
  return (
    <div className="overflow-x-scroll">
      <h6 className="mb-3">Slobodni termini:</h6>
      <div className="flex gap-1">
        <AppointmentDays appointmentsServices={appointmentsServices} />
      </div>
    </div>
  );
};

export default AvailableSlots;
