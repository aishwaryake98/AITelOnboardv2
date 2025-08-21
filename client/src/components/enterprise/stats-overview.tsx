import { MessageSquareMore, Clock, TrendingUp, Database } from "lucide-react";

export default function StatsOverview() {
  const stats = [
    {
      title: "Active SIMs",
      value: "247",
      icon: MessageSquareMore,
      color: "text-primary",
      change: "+12 this month",
      changeColor: "text-success"
    },
    {
      title: "Pending Activations",
      value: "8",
      icon: Clock,
      color: "text-warning",
      change: "Requires approval",
      changeColor: "text-warning"
    },
    {
      title: "Monthly Spend",
      value: "₹1,23,450",
      icon: TrendingUp,
      color: "text-success",
      change: "Budget: ₹2,00,000",
      changeColor: "text-gray-500"
    },
    {
      title: "Data Usage",
      value: "2.4TB",
      icon: Database,
      color: "text-secondary",
      change: "This month",
      changeColor: "text-gray-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div className={`mt-2 text-sm ${stat.changeColor}`}>
            {stat.change.startsWith('+') && <span>↗ </span>}
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
}
