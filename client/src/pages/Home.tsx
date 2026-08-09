import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  QrCode,
  Receipt,
  Shield,
  PiggyBank,
  CreditCard,
  TrendingUp,
  MoreHorizontal,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { getAuthenticatedUser } from "../data/defaultUsers";

const chartData = [
  { month: "Lun", value: 120 },
  { month: "Mar", value: 80 },
  { month: "Mer", value: 150 },
  { month: "Jeu", value: 60 },
  { month: "Ven", value: 200 },
  { month: "Sam", value: 90 },
  { month: "Dim", value: 40 },
];

const fallbackTransactions = [
  { id: 1, name: "Supermarché Carrefour", date: "Aujourd'hui, 14:32", amount: -42.50, type: "expense", icon: "🛒" },
  { id: 2, name: "Salaire", date: "Aujourd'hui, 09:00", amount: 2450.00, type: "income", icon: "💼" },
  { id: 3, name: "Netflix", date: "Hier, 18:15", amount: -12.99, type: "expense", icon: "🎬" },
  { id: 4, name: "Virement de Sara", date: "Hier, 12:00", amount: 85.00, type: "income", icon: "👤" },
  { id: 5, name: "Pharmacie Centrale", date: "28 Juil", amount: -18.70, type: "expense", icon: "💊" },
];

const quickActions = [
  { icon: Send, label: "Envoyer", color: "bg-[#1BA098]" },
  { icon: QrCode, label: "QR", color: "bg-[#2D7A5E]" },
  { icon: Receipt, label: "Factures", color: "bg-[#E74C3C]" },
  { icon: PiggyBank, label: "Épargne", color: "bg-[#1BA098]" },
];

export default function Home() {
  const [showBalance, setShowBalance] = useState(true);
  const currentUser = getAuthenticatedUser();
  const currentAccount = currentUser?.accounts.find((account) => account.id === "cc");
  const transactions = currentUser?.transactions?.map((transaction) => ({
    id: transaction.id,
    name: transaction.type,
    date: transaction.date,
    amount: transaction.amount,
    type: transaction.amount >= 0 ? "income" : "expense",
    icon: transaction.amount >= 0 ? "↙️" : "↗️",
  })) ?? fallbackTransactions;
  const formattedBalance = (currentAccount?.balance ?? 0).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-5 -mt-2"
      >
        <div className="ca-gradient-dark rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/80 text-sm font-medium">Solde Total</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white text-3xl font-bold font-[Poppins]">
                {showBalance ? formattedBalance : "€ ••••••"}
              </p>
              <p className="text-white/60 text-xs mt-1">
                Compte courant • {currentAccount?.number ?? "Compte indisponible"}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-white/15 rounded-full px-3 py-1">
              <TrendingUp size={14} className="text-green-300" />
              <span className="text-green-300 text-xs font-medium">+2,4%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="px-5 mt-6"
      >
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                <action.icon size={22} className="text-white" />
              </div>
              <span className="text-xs font-medium text-gray-600">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Weekly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="px-5 mt-6"
      >
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800 font-[Poppins]">Dépenses de la semaine</h3>
            <button className="text-[#1BA098] text-xs font-medium">Voir tout</button>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={chartData} barSize={20}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis hide />
              <Bar dataKey="value" fill="#1BA098" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="px-5 mt-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800 font-[Poppins]">Transactions récentes</h3>
          <a href="/accounts" className="text-[#1BA098] text-xs font-medium">Toutes</a>
        </div>
        <div className="space-y-2">
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              className="bg-white rounded-xl p-3.5 flex items-center gap-3 shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-lg">
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{tx.name}</p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>
              <div className="flex items-center gap-1.5">
                {tx.type === "income" ? (
                  <ArrowDownLeft size={14} className="text-green-500" />
                ) : (
                  <ArrowUpRight size={14} className="text-gray-400" />
                )}
                <span className={`text-sm font-semibold ${tx.type === "income" ? "text-green-600" : "text-gray-800"}`}>
                  {tx.type === "income" ? "+" : ""}€{Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="px-5 mt-6"
      >
        <h3 className="text-sm font-semibold text-gray-800 font-[Poppins] mb-3">Vos services</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Shield, label: "Assurances", color: "bg-blue-50 text-blue-600" },
            { icon: CreditCard, label: "Cartes", color: "bg-purple-50 text-purple-600" },
            { icon: TrendingUp, label: "Investissements", color: "bg-green-50 text-green-600" },
          ].map((service) => (
            <button
              key={service.label}
              className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl ${service.color} flex items-center justify-center`}>
                <service.icon size={18} />
              </div>
              <span className="text-xs font-medium text-gray-600 text-center">{service.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
