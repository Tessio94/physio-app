import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
];

const fetchDashboardData = async () => {
  const res = await fetch("http://localhost:3000/api/v1/admin/dashboard/data");
  return res.json();
};

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["monthly-users"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div className="">isloading</div>;
  console.log(data);
  return (
    <div>
      {" "}
      <h4 className="ml-5 flex items-end gap-3 text-2xl text-slate-600">
        Admin korisnik:
        <span className="text-lg underline">Nikola Horvat</span>
      </h4>
      <div className="mx-5 pt-6">
        <h5 className="text-md mb-2 flex gap-1">
          Mjesečne registracije korisnika
        </h5>
        <BarChart width={500} height={300} data={data.monthlyUsers}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="user_count" fill="#64748B" />
        </BarChart>
      </div>
      <div className="mx-5 pt-6">
        <h5 className="text-md mb-2">Najčešće korištene usluge</h5>
        <PieChart width={400} height={300}>
          <Pie
            data={data.serviceUsage}
            dataKey="usage_count"
            nameKey="service_name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="mx-5 pt-6">
        <h5 className="text-md mb-2">Najaktivniji terapeuti</h5>
        <PieChart width={400} height={300}>
          <Pie
            data={data.therapistUsage}
            dataKey="session_count"
            nameKey="therapist_name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#82ca9d"
            label
          >
            {data.therapistUsage.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminDashboard;
