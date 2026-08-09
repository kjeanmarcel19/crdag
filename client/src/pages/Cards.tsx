import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { CreditCard, Lock, Unlock, Wifi, Shield, Copy, Eye, EyeOff, AlertTriangle, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

const userCards = [
  {
    id: 1,
    name: "Visa Classic",
    number: "4532 •••• •••• 4521",
    expiry: "12/28",
    cvv: "•••",
    balance: 1247.30,
    color: "from-[#1BA098] to-[#2D7A5E]",
    type: "debit",
    status: "active",
  },
  {
    id: 2,
    name: "Mastercard Gold",
    number: "5412 •••• •••• 8834",
    expiry: "06/27",
    cvv: "•••",
    balance: 520.80,
    color: "from-gray-800 to-gray-950",
    type: "credit",
    status: "active",
  },
];

const cardControls = [
  { icon: Lock, label: "Bloquer la carte", desc: "Empêche les transactions", active: false, color: "text-red-500" },
  { icon: Wifi, label: "Paiements sans contact", desc: "Activer/Désactiver NFC", active: true, color: "text-[#1BA098]" },
  { icon: Shield, label: "Paiements en ligne", desc: "Transactions e-commerce", active: true, color: "text-[#1BA098]" },
  { icon: AlertTriangle, label: "Retraits ATM", desc: "Retraits au distributeur", active: true, color: "text-[#1BA098]" },
];

export default function Cards() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [controls, setControls] = useState(cardControls);
  const [showDetails, setShowDetails] = useState(false);

  const toggleControl = (index: number) => {
    setControls(prev => prev.map((c, i) =>
      i === index ? { ...c, active: !c.active } : c
    ));
  };

  const currentCard = userCards[selectedCard];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Vos cartes" showGreeting={false} />

      {/* Card Carousel */}
      <div className="px-5 mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {userCards.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              onClick={() => setSelectedCard(i)}
              className={`min-w-[280px] rounded-2xl p-5 bg-gradient-to-r ${card.color} shadow-lg transition-all ${
                selectedCard === i ? "scale-[1.02] ring-2 ring-[#1BA098]" : "opacity-80"
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <p className="text-white/80 text-xs font-medium">{card.name}</p>
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                  {card.type === "debit" ? "Débit" : "Crédit"}
                </span>
              </div>
              <p className="text-white text-lg tracking-[0.2em] font-mono mb-1">{card.number}</p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-white/60 text-[10px]">Expiration</p>
                  <p className="text-white text-sm font-medium">{card.expiry}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-[10px]">Solde disponible</p>
                  <p className="text-white text-lg font-bold font-[Poppins]">€ {card.balance.toFixed(2)}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Card Controls */}
      <div className="px-5 mt-6">
        <h3 className="text-sm font-semibold text-gray-800 font-[Poppins] mb-3">Contrôles de la carte</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          {controls.map((control, i) => (
            <motion.button
              key={control.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => toggleControl(i)}
              className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
            >
              <control.icon size={20} className={control.color} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{control.label}</p>
                <p className="text-xs text-gray-400">{control.desc}</p>
              </div>
              {control.active ? (
                <ToggleRight size={24} className="text-[#1BA098]" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Card Details */}
      <div className="px-5 mt-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <CreditCard size={20} className="text-[#1BA098]" />
          <span className="text-sm font-medium text-gray-800 flex-1 text-left">Détails de la carte</span>
          {showDetails ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}
        </button>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white rounded-xl mt-2 p-4 shadow-sm border border-gray-100 space-y-3"
          >
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-400">Numéro de carte</p>
                <p className="text-sm font-mono text-gray-800">4532 7891 2345 4521</p>
              </div>
              <button className="text-[#1BA098]">
                <Copy size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-400">CVV</p>
                <p className="text-sm font-mono text-gray-800">342</p>
              </div>
              <button className="text-[#1BA098]">
                <Copy size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Spending Limit */}
      <div className="px-5 mt-6">
        <h3 className="text-sm font-semibold text-gray-800 font-[Poppins] mb-3">Limite de dépenses mensuelle</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Utilisé</p>
            <p className="text-sm font-semibold text-gray-800">€ 890 / € 2.000</p>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "44.5%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-[#1BA098] to-[#2D7A5E] rounded-full"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">44.5% de la limite utilisée</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
