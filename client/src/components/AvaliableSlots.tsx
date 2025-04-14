import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

// Fetch the available slots for the selected service
async function fetchAvailableSlots(serviceId) {
  const now = new Date();
  const today = new Date(now);
  const threeWeeksLater = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000);

  const minDate = formatDate(today);
  const maxDate = formatDate(threeWeeksLater);

  const response = await fetch(
    `http://localhost:3000/api/v1/book-now/appointments?serviceId=${serviceId}&minDate=${minDate}&maxDate=${maxDate}`,
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
  console.log(JSON.stringify(data, null, 2));

  if (isLoading) {
    return <div>Loading available slots...</div>;
  }

  if (isError) {
    return <div>Failed to fetch available slots.</div>;
  }

  return (
    <div>
      <h6>Available Slots:</h6>
      <ul>
        {data?.map((slot, i) => (
          <li key={i} className="flex items-start gap-5">
            <p>{slot.serviceId}</p>
            <p>{slot.minDate}</p>
            <p>{slot.maxDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableSlots;
