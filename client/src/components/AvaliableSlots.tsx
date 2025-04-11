import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

// Fetch the available slots for the selected service
async function fetchAvailableSlots(serviceId) {
  const today = new Date();
  const threeWeeksLater = new Date(today.setDate(today.getDate() + 21));

  const minDate = formatDate(today);
  const maxDate = formatDate(threeWeeksLater);

  const response = await fetch(
    `http://localhost:3000/api/v1/book-now/appointments?serviceId=${serviceId}&minDate=${minDate}&maxDate=${maxDate}`,
  );
  console.log("response: ", response);
  if (!response.ok) {
    throw new Error("Failed to fetch available slots");
  }
  console.log(response);
  return response.json();
}

const AvailableSlots = ({ serviceId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["availableSlots", serviceId],
    queryFn: () => fetchAvailableSlots(serviceId),
    enabled: !!serviceId, // Only run the query if serviceId is available
  });
  console.log(serviceId);
  console.log("data: ", data);
  if (isLoading) {
    return <div>Loading available slots...</div>;
  }

  if (isError) {
    return <div>Failed to fetch available slots.</div>;
  }

  return (
    <div>
      <h6>Available Slots:</h6>
      <ul>{data?.slots?.map((slot) => <li key={slot.id}>{slot.date}</li>)}</ul>
    </div>
  );
};

export default AvailableSlots;
