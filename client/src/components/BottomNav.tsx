import { useLocation } from "wouter";
import { Home, CreditCard, ArrowLeftRight, TrendingUp, Settings } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Accueil" },
  { path: "/accounts", icon: CreditCard, label: "Comptes" },
  { path: "/payments", icon: ArrowLeftRight, label: "Paiements" },
  { path: "/investments", icon: TrendingUp, label: "Investissements" },
  { path: "/settings", icon: Settings, label: "Paramètres" },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 ca-gradient px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location === item.path ||
            (item.path === "/accounts" && (location === "/accounts" || location === "/cards")) ||
            (item.path === "/payments" && location.startsWith("/payments")) ||
            (item.path === "/investments" && location.startsWith("/investments")) ||
            (item.path === "/settings" && location.startsWith("/settings"));
          const Icon = item.icon;
          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-white bg-white/20 scale-105"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
