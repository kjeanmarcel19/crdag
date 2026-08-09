import { Bell, Search, User } from "lucide-react";
import { getAuthenticatedUser } from "../data/defaultUsers";

interface HeaderProps {
  title?: string;
  showGreeting?: boolean;
}

export default function Header({ title, showGreeting = true }: HeaderProps) {
  const user = getAuthenticatedUser();
  const displayName = user ? `${user.prenom} ${user.nom}` : "Utilisateur";

  return (
    <header className="ca-gradient px-5 pt-12 pb-6 rounded-b-3xl">
      {showGreeting ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium">Bonjour,</p>
            <h1 className="text-white text-xl font-bold font-[Poppins]">{displayName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Search size={18} />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors relative">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E74C3C] rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                3
              </span>
            </button>
            <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <User size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <a href="/" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </a>
          <h1 className="text-white text-lg font-semibold font-[Poppins]">{title}</h1>
        </div>
      )}
    </header>
  );
}
