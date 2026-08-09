import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Fingerprint,
  Moon,
  Smartphone,
  Mail,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { AUTH_SESSION_KEY, AUTH_USER_KEY, getAuthenticatedUser } from "../data/defaultUsers";

const settingsSections = [
  {
    title: "Profil",
    items: [
      { icon: User, label: "Informations personnelles", desc: "Nom, email, téléphone" },
      { icon: Smartphone, label: "Appareils connectés", desc: "2 appareils actifs" },
    ],
  },
  {
    title: "Sécurité",
    items: [
      { icon: Lock, label: "Changer le mot de passe", desc: "Dernière modification il y a 30 jours" },
      { icon: Fingerprint, label: "Authentification biométrique", desc: "Face ID activé", hasToggle: true, active: true },
      { icon: AlertCircle, label: "Authentification à deux facteurs", desc: "SMS et application d'authentification", hasToggle: true, active: true },
    ],
  },
  {
    title: "Notifications",
    items: [
      { icon: Bell, label: "Notifications push", desc: "Transactions et alertes", hasToggle: true, active: true },
      { icon: Mail, label: "Communications par email", desc: "Newsletter et mises à jour", hasToggle: true, active: false },
    ],
  },
  {
    title: "Préférences",
    items: [
      { icon: Globe, label: "Langue", desc: "Français" },
      { icon: Palette, label: "Thème", desc: "Clair" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Centre d'aide", desc: "FAQ et support" },
      { icon: FileText, label: "Termes et conditions", desc: "Informations légales" },
    ],
  },
];

export default function Settings() {
  const currentUser = getAuthenticatedUser();
  const displayName = currentUser ? `${currentUser.prenom} ${currentUser.nom}` : "Utilisateur";
  const initials = currentUser ? `${currentUser.prenom[0] ?? ""}${currentUser.nom[0] ?? ""}` : "U";
  const [, setLocation] = useLocation();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Authentification biométrique": true,
    "Authentification à deux facteurs": true,
    "Notifications push": true,
    "Communications par email": false,
  });

  const handleToggle = (label: string) => {
    setToggles(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Paramètres" showGreeting={false} />

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-5 mt-6"
      >
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full ca-gradient flex items-center justify-center text-white text-xl font-bold font-[Poppins]">
            {initials}
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold text-gray-800">{displayName}</p>
            <p className="text-xs text-gray-400 mt-0.5">Identifiant : {currentUser?.identifiant ?? "-"}</p>
            <p className="text-xs text-gray-400">Statut : {currentUser?.status ?? "-"}</p>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </div>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, si) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 + si * 0.1 }}
          className="px-5 mt-6"
        >
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
            {section.title}
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            {section.items.map((item) => (
              <div
                key={item.label}
                className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                  <item.icon size={18} className="text-[#1BA098]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-400 truncate">{item.desc}</p>
                </div>
                {item.hasToggle ? (
                  <button
                    onClick={() => handleToggle(item.label)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      toggles[item.label] ? "bg-[#1BA098]" : "bg-gray-200"
                    }`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      toggles[item.label] ? "left-[22px]" : "left-0.5"
                    }`} />
                  </button>
                ) : (
                  <ChevronRight size={16} className="text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="px-5 mt-6 mb-4"
      >
        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-3.5 rounded-xl bg-red-50 text-red-500 font-medium text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
