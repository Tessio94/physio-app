import { useQuery } from "@tanstack/react-query";
import {
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
  "#94A3B8",
  "#64748B",
  "#475569",
  "#334155",
  "#1E293B",
  "#0F172A",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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

  const transformedServiceUsage = data.serviceUsage.map((item) => ({
    ...item,
    usage_count: Number(item.usage_count),
  }));

  const transformedTherapistUsage = data.therapistUsage.map((item) => ({
    ...item,
    session_count: Number(item.session_count),
  }));

  return (
    <div>
      {" "}
      <h4 className="ml-5 flex items-end gap-3 text-2xl text-slate-600">
        Admin korisnik:
        <span className="text-lg underline">Nikola Horvat</span>
      </h4>
      <div className="flex max-w-[90%] flex-wrap justify-between gap-28 gap-y-10">
        <div className="mx-5 pt-6">
          <h5 className="text-md mb-2 text-center">Vaša statistika:</h5>
          <div className="height-[350px] flex w-[600px] flex-col gap-5">
            <p>Broj ukupnih korisnika:</p>
            <p>Broj zakazanih termina:</p>
            <p>Najčešća usluga:</p>
            <p>Najčešći klijent:</p>
            <p>Najbolji mjesec:</p>
          </div>
        </div>
        <div className="mx-5 pt-6">
          <h5 className="text-md mb-2 text-center">
            Mjesečne registracije korisnika
          </h5>
          <BarChart width={600} height={350} data={data.monthlyUsers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="user_count" fill="#64748B" />
          </BarChart>
        </div>

        <div className="mx-5 pt-6">
          <h5 className="text-md mb-2 text-center">
            Najčešće korištene usluge
          </h5>
          <PieChart width={600} height={400}>
            <Pie
              data={transformedServiceUsage}
              dataKey="usage_count"
              nameKey="service_name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {transformedServiceUsage.map((entry, index) => (
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
        <div className="mx-5 pt-6">
          <h5 className="text-md mb-2 text-center">Najaktivniji terapeuti</h5>
          <PieChart width={600} height={400}>
            <Pie
              data={transformedTherapistUsage}
              dataKey="session_count"
              nameKey="therapist_name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#82ca9d"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {transformedTherapistUsage.map((entry, index) => (
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
    </div>
  );
};

export default AdminDashboard;
