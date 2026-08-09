import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight, PieChart as PieIcon, BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const portfolioData = [
  { month: "Jan", value: 5200 },
  { month: "Fév", value: 5400 },
  { month: "Mar", value: 5100 },
  { month: "Avr", value: 5600 },
  { month: "Mai", value: 5800 },
  { month: "Juin", value: 5700 },
  { month: "Juil", value: 6100 },
  { month: "Août", value: 6350 },
];

const allocationData = [
  { name: "Actions", value: 45, color: "#1BA098" },
  { name: "Obligations", value: 30, color: "#2D7A5E" },
  { name: "ETF", value: 15, color: "#E74C3C" },
  { name: "Liquidités", value: 10, color: "#F39C12" },
];

const holdings = [
  { name: "Fonds Éthique CA", type: "Fonds commun", value: 2847.50, change: 3.2, up: true },
  { name: "MSCI World ETF", type: "ETF", value: 1502.80, change: 1.8, up: true },
  { name: "OAT France 2028", type: "Obligation", value: 1000.00, change: -0.5, up: false },
  { name: "Fonds Trésorerie", type: "Fonds monétaire", value: 1000.00, change: 0.1, up: true },
];

export default function Investments() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Investissements" showGreeting={false} />

      {/* Portfolio Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-5 mt-6"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-400 font-medium">Valeur du portefeuille</p>
            <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp size={12} />
              +5.2%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 font-[Poppins]">€ 6.350,30</p>
          <p className="text-xs text-gray-400 mt-1">+€ 315,30 ce mois-ci</p>

          {/* Chart */}
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1BA098" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1BA098" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                <YAxis hide domain={['dataMin - 200', 'dataMax + 200']} />
                <Area type="monotone" dataKey="value" stroke="#1BA098" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Allocation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="px-5 mt-6"
      >
        <h3 className="text-sm font-semibold text-gray-800 font-[Poppins] mb-3">Allocation</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-28 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Holdings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="px-5 mt-6"
      >
        <h3 className="text-sm font-semibold text-gray-800 font-[Poppins] mb-3">Vos investissements</h3>
        <div className="space-y-2">
          {holdings.map((holding, i) => (
            <motion.div
              key={holding.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{holding.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{holding.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">€ {holding.value.toFixed(2)}</p>
                  <div className={`flex items-center justify-end gap-1 mt-0.5 ${holding.up ? "text-green-600" : "text-red-500"}`}>
                    {holding.up ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />}
                    <span className="text-xs font-medium">{holding.up ? "+" : ""}{holding.change}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
