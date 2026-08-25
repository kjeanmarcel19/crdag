import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Shield,
  ToggleLeft,
  ToggleRight,
  Unlock,
  UserRound,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { getAuthenticatedUser } from "../data/defaultUsers";

type ChipVariant = "gold" | "red";

type CardModel = {
  id: number;
  accountIndex: number;
  number: string;
  fullNumber: string;
  expiry: string;
  cvv: string;
  balance: number;
  color: string;
  glow: string;
  type: string;
  status: string;
  chip: ChipVariant;
  holder: string;
};

const userCards: CardModel[] = [
  {
    id: 1,
    accountIndex: 0,
    number: "4532 •••• •••• 4521",
    fullNumber: "4532 7891 2345 4521",
    expiry: "12/28",
    cvv: "342",
    balance: 1247.3,
    color: "from-[#087f79] via-[#16a39a] to-[#82d1c5]",
    glow: "bg-[#b6fff0]/20",
    type: "VISA",
    status: "active",
    chip: "gold",
    holder: "JEAN DUPONT",
  },
  {
    id: 2,
    accountIndex: 1,
    number: "5412 •••• •••• 8834",
    fullNumber: "5412 6632 9876 8834",
    expiry: "06/27",
    cvv: "518",
    balance: 520.8,
    color: "from-[#252d3d] via-[#101827] to-[#050914]",
    glow: "bg-[#ef6b60]/15",
    type: "mastercard",
    status: "active",
    chip: "red",
    holder: "JEAN DUPONT",
  },
];

const cardControls = [
  { icon: Lock, label: "Bloquer la carte", desc: "Empêche les transactions", active: false, color: "text-red-500" },
  { icon: Wifi, label: "Paiements sans contact", desc: "Activer/Désactiver NFC", active: true, color: "text-[#1BA098]" },
  { icon: Shield, label: "Paiements en ligne", desc: "Transactions e-commerce", active: true, color: "text-[#1BA098]" },
  { icon: AlertTriangle, label: "Retraits ATM", desc: "Retraits au distributeur", active: true, color: "text-[#1BA098]" },
];

function CardChip({ variant }: { variant: ChipVariant }) {
  const isRed = variant === "red";

  return (
    <div
      className={`relative h-10 w-[3.4rem] overflow-hidden rounded-[10px] border shadow-inner ${
        isRed
          ? "border-[#f7c1bb]/60 bg-gradient-to-br from-[#ffd0c9] via-[#d65c50] to-[#741d24]"
          : "border-[#fff1a4]/70 bg-gradient-to-br from-[#fff3a6] via-[#e0ad3d] to-[#a66c16]"
      }`}
      aria-label={isRed ? "Puce rouge" : "Puce dorée"}
    >
      <span className="absolute inset-y-0 left-1/2 w-px bg-black/20" />
      <span className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
      <span className="absolute -left-1 top-1/2 h-5 w-8 -translate-y-1/2 rounded-full border border-black/20" />
      <span className="absolute -right-1 top-1/2 h-5 w-8 -translate-y-1/2 rounded-full border border-black/20" />
      <span className="absolute left-1/2 top-1/2 h-3 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-black/20" />
    </div>
  );
}

function MastercardMark() {
  return (
    <div className="flex items-center" aria-label="Mastercard">
      <span className="h-7 w-7 rounded-full bg-[#eb554d] shadow-sm" />
      <span className="-ml-3 h-7 w-7 rounded-full bg-[#f2a43f]/95 shadow-sm" />
    </div>
  );
}

function CardBrand({ type }: { type: string }) {
  if (type === "mastercard") return <MastercardMark />;

  return <span className="text-[1.35rem] font-black italic tracking-[-0.08em] text-white">VISA</span>;
}

export default function Cards() {
  const currentUser = getAuthenticatedUser();
  const displayedAccounts = currentUser?.accounts ?? [];
  const displayedCards = userCards.map((card) => ({
    ...card,
    // Le nom et le solde visibles viennent directement du compte associé.
    name: displayedAccounts[card.accountIndex]?.type ?? "Compte non rattaché",
    balance: displayedAccounts[card.accountIndex]?.balance ?? 0,
    holder: currentUser ? `${currentUser.prenom} ${currentUser.nom}`.toUpperCase() : card.holder,
  }));
  const [selectedCard, setSelectedCard] = useState(0);
  const [controls, setControls] = useState(cardControls);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const toggleControl = (index: number) => {
    setControls((prev) => prev.map((c, i) => (i === index ? { ...c, active: !c.active } : c)));
  };

  const copyValue = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  };

  const currentCard = displayedCards[selectedCard];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Vos cartes" showGreeting={false} />

      <main className="mx-auto max-w-2xl px-5 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1BA098]">Portefeuille</p>
              <h2 className="mt-1 text-xl font-semibold text-gray-800">Vos cartes bancaires</h2>
            </div>
            <span className="rounded-full bg-[#e9f7f5] px-3 py-1 text-xs font-semibold text-[#1b7e76]">{displayedCards.length} cartes</span>
          </div>

          <div className="flex gap-4 overflow-x-auto px-2 pb-4 pt-2 scroll-px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {displayedCards.map((card, i) => (
              <motion.button
                key={card.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                onClick={() => setSelectedCard(i)}
                aria-pressed={selectedCard === i}
                className={`group relative w-[min(320px,calc(100vw-4rem))] shrink-0 text-left transition-all duration-200 ${
                  selectedCard === i ? "scale-[1.015]" : "opacity-75 hover:opacity-100"
                }`}
              >
                <div className={`relative aspect-[1.586/1] overflow-hidden rounded-[20px] bg-gradient-to-br ${card.color} p-5 shadow-[0_18px_36px_-18px_rgba(10,74,70,0.7)] ${selectedCard === i ? "ring-2 ring-[#1BA098] ring-offset-2 ring-offset-gray-50" : ""}`}>
                  <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-2xl ${card.glow}`} />
                  <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.11)_42%,transparent_58%)] opacity-70" />
                  <div className="absolute inset-x-5 top-1/2 h-px bg-white/10" />
                  <div className="absolute -bottom-16 -left-10 h-36 w-56 rotate-[-18deg] rounded-full border border-white/10" />

                  <div className="relative flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">{card.name}</p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/45">Carte {card.type === "VISA" ? "de débit" : "de crédit"}</p>
                    </div>
                    <CardBrand type={card.type} />
                  </div>

                  <div className="relative mt-5 flex items-center justify-between">
                    <CardChip variant={card.chip} />
                    <Wifi size={25} strokeWidth={1.5} className="-rotate-90 text-white/80" aria-label="Paiement sans contact" />
                  </div>

                  <p className="relative mt-4 whitespace-nowrap font-mono text-[17px] font-medium tracking-[0.18em] text-white drop-shadow-sm sm:text-[18px]">{card.number}</p>

                  <div className="relative mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.14em] text-white/55">Titulaire</p>
                      <p className="mt-1 text-[11px] font-semibold tracking-[0.1em] text-white">{card.holder}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.14em] text-white/55">Valable jusqu'au</p>
                      <p className="mt-1 text-[11px] font-semibold tracking-[0.1em] text-white">{card.expiry}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${card.status === "active" ? "bg-emerald-400" : "bg-red-400"}`} /> Carte active</span>
                  <span className="font-medium">{selectedCard === i ? "Sélectionnée" : "Voir la carte"}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-between rounded-2xl border border-[#d6efec] bg-[#f1fbfa] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#1BA098] shadow-sm"><CreditCard size={17} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-400">Solde disponible</p>
                <p className="mt-0.5 text-base font-bold text-[#1b7e76]">{currentCard.balance.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-400">{currentCard.name}</span>
          </div>
        </motion.div>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.2 }} className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1BA098]">Sécurité</p>
              <h3 className="mt-1 text-sm font-semibold text-gray-800">Contrôles de la carte</h3>
            </div>
            <span className="text-xs text-gray-400">{currentCard.name}</span>
          </div>
          <div className="divide-y divide-gray-50 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {controls.map((control, i) => (
              <motion.button
                key={control.label}
                type="button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => toggleControl(i)}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50">
                  <control.icon size={18} className={control.color} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800">{control.label}</p>
                  <p className="text-xs text-gray-400">{control.desc}</p>
                </div>
                {control.active ? <ToggleRight size={25} className="text-[#1BA098]" /> : <ToggleLeft size={25} className="text-gray-300" />}
              </motion.button>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.28 }} className="mt-6">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef8f7] text-[#1BA098]"><Eye size={18} /></div>
            <span className="flex-1 text-sm font-medium text-gray-800">Détails de la carte</span>
            {showDetails ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}
          </button>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 space-y-2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <div>
                  <p className="text-xs text-gray-400">Numéro de carte</p>
                  <p className="mt-1 text-sm font-mono text-gray-800">{currentCard.fullNumber}</p>
                </div>
                <button type="button" onClick={() => copyValue("number", currentCard.fullNumber)} aria-label="Copier le numéro de carte" className="rounded-lg p-2 text-[#1BA098] hover:bg-white">
                  {copied === "number" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <div>
                  <p className="text-xs text-gray-400">CVV</p>
                  <p className="mt-1 text-sm font-mono text-gray-800">{currentCard.cvv}</p>
                </div>
                <button type="button" onClick={() => copyValue("cvv", currentCard.cvv)} aria-label="Copier le CVV" className="rounded-lg p-2 text-[#1BA098] hover:bg-white">
                  {copied === "cvv" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </motion.div>
          )}
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.34 }} className="mt-6">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1BA098]">Plafond</p>
              <h3 className="mt-1 text-sm font-semibold text-gray-800">Limite de dépenses mensuelle</h3>
            </div>
            <UserRound size={18} className="text-gray-300" />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-gray-400">Utilisé</p>
              <p className="text-sm font-semibold text-gray-800">€ 890 / € 2.000</p>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "44.5%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-[#1BA098] to-[#2D7A5E]"
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">44,5 % de la limite utilisée</p>
          </div>
        </motion.section>
      </main>

      <BottomNav />
    </div>
  );
}
