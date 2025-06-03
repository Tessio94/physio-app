import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
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
  PieLabelRenderProps,
} from "recharts";
import { Admin } from "types/admin";

type ServiceUsageItem = {
  service_name: string;
  usage_count: number | string;
};

type TherapistUsageItem = {
  therapist_name: string;
  session_count: number | string;
};

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
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
}: PieLabelRenderProps) => {
  const radius =
    Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > Number(cx) ? "start" : "end"}
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

const fetchAdminDashboardData = async (adminId: number) => {
  const res = await fetch(
    `http://localhost:3000/api/v1/admin/dashboard/data/${adminId}`,
  );
  return res.json();
};

const AdminDashboard = () => {
  const admin = useOutletContext<Admin>();
  // console.log(admin); - OVJDJE UBACITI ERROR AKO JE ADMIN UNDEFINED (DA GA VRAĆA NA LOG-IN, TO JEST VIDJETI DA LI TO MOZE ICI SA SERVERA BEZ DA DODJE DO OVE LINIJE I DA KORISITIMO SOONNER UMJESTO ALERTA.)
  const { adminId, name, lastname, superadmin } = admin;

  const { data, isLoading } = useQuery({
    queryKey: ["monthly-users"],
    queryFn: fetchDashboardData,
  });

  // console.log("data: ", data);

  const { data: adminData, isLoading: adminIsLoading } = useQuery({
    queryKey: ["admin-info", adminId],
    queryFn: () => fetchAdminDashboardData(adminId),
  });

  if (isLoading || adminIsLoading) return <div className="">isloading</div>;

  const transformedServiceUsage = data.serviceUsage.map(
    (item: ServiceUsageItem) => ({
      ...item,
      usage_count: Number(item.usage_count),
    }),
  );

  const transformedTherapistUsage = data.therapistUsage.map(
    (item: TherapistUsageItem) => ({
      ...item,
      session_count: Number(item.session_count),
    }),
  );

  // console.log("Admin data: ", adminData);

  return (
    <div className="mb-5">
      {" "}
      <div className="flex items-center gap-10">
        <h4 className="ml-5 flex items-end gap-3 text-2xl text-slate-600">
          Admin korisnik:
          <span className="text-lg underline">{`${name} ${lastname}`}</span>
        </h4>
        <h4 className="ml-5 flex items-end gap-3 text-2xl text-slate-600">
          Admin uloga:
          <span className="text-lg underline">
            {superadmin ? "superadmin" : "admin"}
          </span>
        </h4>
      </div>
      <div className="flex max-w-[90%] flex-wrap justify-between gap-28 gap-y-10">
        <div className="mx-5 pt-6">
          <h5 className="text-md mb-2 text-center text-xl font-semibold">
            Vaša statistika:
          </h5>
          <div className="ml-[80px] flex h-[350px] w-[600px] flex-col justify-between pb-3">
            <p className="flex w-[100%] justify-between border-[1px] border-slate-700 bg-slate-200 pl-3 text-lg">
              Broj ukupnih korisnika:{" "}
              <span className="w-[40%] border-l-[1px] border-slate-700 text-center">
                {adminData.userCount}
              </span>
            </p>
            <p className="flex w-[100%] justify-between border-[1px] border-slate-700 bg-slate-200 pl-3 text-lg">
              Broj zakazanih termina:{" "}
              <span className="w-[40%] border-l-[1px] border-slate-700 text-center">
                {adminData.bookingCount}
              </span>
            </p>
            <p className="flex w-[100%] justify-between border-[1px] border-slate-700 bg-slate-200 pl-3 text-lg">
              Najčešća usluga:{" "}
              <span className="w-[40%] border-l-[1px] border-slate-700 text-center">
                {adminData.serviceCount.name}
              </span>
            </p>
            <p className="flex w-[100%] justify-between border-[1px] border-slate-700 bg-slate-200 pl-3 text-lg">
              Najčešća usluga - broj rezervacija:{" "}
              <span className="w-[40%] border-l-[1px] border-slate-700 text-center">
                {adminData.serviceCount.total_bookings}
              </span>
            </p>
            <p className="flex w-[100%] justify-between border-[1px] border-slate-700 bg-slate-200 pl-3 text-lg">
              Najčešći klijent:{" "}
              <span className="w-[40%] border-l-[1px] border-slate-700 text-center">
                {adminData.clientCount.user_name}
              </span>
            </p>
            <p className="flex w-[100%] justify-between border-[1px] border-slate-700 bg-slate-200 pl-3 text-lg">
              Najčešći klijent - broj rezervacija:{" "}
              <span className="w-[40%] border-l-[1px] border-slate-700 text-center">
                {adminData.clientCount.total_bookings}
              </span>
            </p>
            <p className="flex w-[100%] justify-between border-[1px] border-slate-700 bg-slate-200 pl-3 text-lg">
              Najbolji mjesec:{" "}
              <span className="w-[40%] border-l-[1px] border-slate-700 text-center">
                {adminData.bestMonth.booking_month}
              </span>
            </p>
            <p className="flex w-[100%] justify-between border-[1px] border-slate-700 bg-slate-200 pl-3 text-lg">
              Najbolji mjesec - broj rezervacija:{" "}
              <span className="w-[40%] border-l-[1px] border-slate-700 text-center">
                {adminData.bestMonth.total_bookings}
              </span>
            </p>
          </div>
        </div>
        <div className="mx-5 pt-6">
          <h5 className="text-md mb-2 text-center text-xl font-semibold">
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
          <h5 className="text-md mb-2 text-center text-xl font-semibold">
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
              {transformedServiceUsage.map((_, index: number) => (
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
          <h5 className="text-md mb-2 text-center text-xl font-semibold">
            Najaktivniji terapeuti
          </h5>
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
              {transformedTherapistUsage.map((_, index: number) => (
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
