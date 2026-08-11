import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { CreditCard, Eye, EyeOff, Plus, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { getAuthenticatedUser } from "../data/defaultUsers";

const accounts = [
  { id: 1, name: "Compte Courant", iban: "FR76 3000 6000 0101 0000 0123 456", balance: 8247.50, type: "primary", currency: "EUR" },
  { id: 2, name: "Compte Épargne", iban: "FR76 3000 6000 0101 0000 0789 012", balance: 3500.00, type: "savings", currency: "EUR" },
  { id: 3, name: "Dépôt à terme", iban: "FR76 3000 6000 0101 0000 0345 678", balance: 1100.00, type: "term", currency: "EUR" },
];

const cards = [
  { id: 1, name: "Visa Classic", number: "•••• •••• •••• 4521", balance: 1247.30, color: "from-[#1BA098] to-[#2D7A5E]" },
  { id: 2, name: "Mastercard Gold", number: "•••• •••• •••• 8834", balance: 520.80, color: "from-gray-800 to-gray-900" },
];

export default function Accounts() {
  const currentUser = getAuthenticatedUser();
  const displayedAccounts = currentUser
    ? currentUser.accounts.map((account, index) => ({
        id: account.id,
        name: account.type,
        iban: account.number,
        balance: account.balance,
        type:
          account.id === "cc"
            ? "primary"
            : account.id === "livret" || account.id === "livret-jeune"
              ? "savings"
              : "term",
        currency: "EUR",
      }))
    : accounts;
  const [showBalances, setShowBalances] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Vos comptes" showGreeting={false} />

      {/* Accounts List */}
      <div className="px-5 mt-6 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-gray-800 font-[Poppins]">Comptes bancaires</h2>
          <button
            onClick={() => setShowBalances(!showBalances)}
            className="text-[#1BA098] text-xs font-medium flex items-center gap-1"
          >
            {showBalances ? <Eye size={14} /> : <EyeOff size={14} />}
            {showBalances ? "Masquer" : "Afficher"}
          </button>
        </div>

        {displayedAccounts.map((account, i) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#1BA098]/10 flex items-center justify-center">
                  <CreditCard size={20} className="text-[#1BA098]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{account.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{account.iban.slice(0, 20)}...</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-400">Solde disponible</p>
                <p className="text-lg font-bold text-gray-900 font-[Poppins]">
                  {showBalances ? `€ ${account.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}` : "€ ••••••"}
                </p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                account.type === "primary" ? "bg-[#1BA098]/10 text-[#1BA098]" :
                account.type === "savings" ? "bg-green-50 text-green-600" :
                "bg-blue-50 text-blue-600"
              }`}>
                {account.type === "primary" ? "Principal" : account.type === "savings" ? "Épargne" : "Terme"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cards Section */}
      <div className="px-5 mt-8">
        <h2 className="text-sm font-semibold text-gray-800 font-[Poppins] mb-3">Vos cartes</h2>
        <div className="space-y-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              className={`rounded-xl p-5 bg-gradient-to-r ${card.color} shadow-md`}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-white/80 text-xs font-medium">{card.name}</p>
                <div className="flex gap-1">
                  <div className="w-6 h-4 bg-white/20 rounded-sm" />
                  <div className="w-6 h-4 bg-white/20 rounded-sm" />
                </div>
              </div>
              <p className="text-white text-sm tracking-widest font-mono mb-4">{card.number}</p>
              <div className="flex items-end justify-between">
                <p className="text-white/80 text-xs">Solde</p>
                <p className="text-white text-xl font-bold font-[Poppins]">
                  {showBalances ? `€ ${card.balance.toFixed(2)}` : "€ ••••"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Account Button */}
      <div className="px-5 mt-6">
        <button className="w-full py-3.5 rounded-xl border-2 border-dashed border-[#1BA098]/30 text-[#1BA098] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#1BA098]/5 transition-colors">
          <Plus size={18} />
          Ajouter un compte ou une carte
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
