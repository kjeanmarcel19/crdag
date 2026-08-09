import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock, User, ArrowRight, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";
import { AUTH_SESSION_KEY, AUTH_USER_KEY, findDefaultUser } from "../data/defaultUsers";

export default function Login() {
  const [identifiant, setIdentifiant] = useState("");
  const [codePersonnel, setCodePersonnel] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifiant || !codePersonnel) return;

    const user = findDefaultUser(identifiant.trim(), codePersonnel.trim());
    if (!user) {
      setError("Identifiant ou code personnel incorrect.");
      return;
    }

    setError("");
    setIsLoading(true);
    setTimeout(() => {
      sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      setIsLoading(false);
      setLocation("/");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Logo */}
      <header className="p-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3" aria-label="Groupe Crédit Agricole">
            <svg viewBox="0 0 96 72" className="w-16 h-12 shrink-0" role="img" aria-label="Logo Crédit Agricole">
              <path d="M10 38c12-24 36-34 58-23 9 5 16 13 18 23-9-11-19-16-30-16-14 0-27 7-38 20-4 5-7 8-8 8z" fill="#009A9A" />
              <path d="M48 12h18l-9 37H43z" fill="#006B4F" />
              <path d="M59 12h13l-8 10H54z" fill="#E30613" />
              <path d="M14 51h70v7H14z" fill="#006B4F" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-semibold tracking-[0.18em] text-[#006B4F]">GROUPE</span>
              <span className="font-bold text-[#006B4F] text-lg tracking-tight">CRÉDIT</span>
              <span className="font-bold text-[#006B4F] text-lg tracking-tight">AGRICOLE</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400">
          <HelpCircle size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-12 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2 font-[Poppins]">
            Accédez à votre espace personnel
          </h1>
          <p className="text-gray-500 mb-8">
            Saisissez vos identifiants pour accéder à votre espace bancaire en ligne.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Identifiant
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  placeholder="Saisissez votre identifiant"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1BA098] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Code personnel
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showCode ? "text" : "password"}
                  value={codePersonnel}
                  onChange={(e) => setCodePersonnel(e.target.value)}
                  placeholder="Saisissez votre code personnel"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[#1BA098] focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button type="button" className="text-sm font-medium text-[#1BA098] hover:underline">
                Vous avez oublié vos identifiants ?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !identifiant || !codePersonnel}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                isLoading || !identifiant || !codePersonnel
                  ? "bg-gray-300 cursor-not-allowed"
                  : "ca-gradient hover:opacity-90 active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {error && (
            <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-100">
              {error}
            </p>
          )}

          <div className="mt-12 p-4 bg-blue-50 rounded-2xl flex gap-3 border border-blue-100">
            <div className="text-blue-600 mt-0.5">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900">Votre sécurité est notre priorité</p>
              <p className="text-xs text-blue-700 mt-0.5">
                Le Groupe Crédit Agricole applique les meilleurs standards de sécurité pour protéger vos données et vos opérations.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-xs text-gray-400">
          © 2026 Groupe Crédit Agricole - Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
