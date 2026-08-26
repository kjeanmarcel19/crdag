import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Globe2, HelpCircle, Lock, Shield, User } from "lucide-react";
import { useLocation } from "wouter";
import { AUTH_SESSION_KEY, AUTH_USER_KEY, findDefaultUser, loadRemoteUser } from "../data/defaultUsers";

function MarocLogo({ inverse = false }: { inverse?: boolean }) {
  const textColor = inverse ? "text-white" : "text-[#006b4f]";
  const mutedColor = inverse ? "text-white/65" : "text-[#5f746d]";

  return (
    <div className="flex items-center gap-3" aria-label="Crédit Agricole du Maroc">
      <svg viewBox="0 0 92 92" className="h-[4.25rem] w-[4.25rem] shrink-0" role="img" aria-label="Logo Crédit Agricole du Maroc">
        <path d="M46 10c-7 12-8 22-2 31 3 5 8 9 14 12-1-11-3-20-8-28-2-5-3-10-4-15Z" fill="#079447" />
        <path d="M37 47c-12-9-22-10-32-4 7 11 17 17 30 15 6-1 11-4 15-8-5 1-9 0-13-3Z" fill="#079447" />
        <path d="M54 47c8-11 18-16 30-16-4 13-11 22-23 27-7 2-13 1-18-2 4-2 8-5 11-9Z" fill="#079447" />
        <path d="M41 42c4-8 8-14 14-20 0 9-2 17-7 24-3 4-7 7-11 9 0-5 1-9 4-13Z" fill="#079447" />
        <rect x="20" y="67" width="52" height="9" rx="1.5" fill="#e30613" />
        <path d="M17 81h58" stroke="#006b4f" strokeWidth="3.5" />
      </svg>
      <div className={`leading-none ${textColor}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Groupe</p>
        <p className="mt-1 text-lg font-extrabold tracking-[-0.04em]">CRÉDIT AGRICOLE</p>
        <p className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${mutedColor}`}>du Maroc</p>
      </div>
    </div>
  );
}

export default function Login() {
  const [identifiant, setIdentifiant] = useState("");
  const [codePersonnel, setCodePersonnel] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifiant || !codePersonnel) return;

    const baseUser = findDefaultUser(identifiant.trim(), codePersonnel.trim());
    if (!baseUser) {
      setError("Identifiant ou code personnel incorrect.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const user = await loadRemoteUser(baseUser);
      sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      setLocation("/");
    } catch (remoteError) {
      console.error("Erreur Supabase lors de la connexion :", remoteError);
      setError("Impossible de charger vos données. Vérifiez la configuration Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6f1] text-[#17352e] lg:grid lg:grid-cols-[minmax(360px,0.92fr)_minmax(520px,1.08fr)]">
      {/* Morocco brand panel */}
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#006b4f] px-10 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full border-[70px] border-white/[0.05]" />
        <div className="absolute -bottom-48 -left-36 h-[30rem] w-[30rem] rounded-full border-[52px] border-white/[0.06]" />
        <div className="absolute bottom-24 right-14 h-36 w-36 rounded-full bg-[#e30613]/15 blur-3xl" />

        <div className="relative">
          <MarocLogo inverse />
          <div className="mt-16 max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f2c84b]">Banque en ligne</p>
            <h1 className="mt-5 font-[Poppins] text-4xl font-semibold leading-[1.12] tracking-[-0.04em] xl:text-5xl">
              Votre banque,<br />
              <span className="text-[#b8e2c1]">à vos côtés.</span>
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
              Accédez simplement à vos comptes, vos cartes et vos opérations depuis votre espace sécurisé Crédit Agricole du Maroc.
            </p>
          </div>
        </div>

        <div className="relative space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3.5 backdrop-blur-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <Shield size={18} className="text-[#f2c84b]" />
            </div>
            <div>
              <p className="text-sm font-semibold">Connexion protégée</p>
              <p className="mt-0.5 text-xs text-white/55">Vos données sont traitées de manière confidentielle.</p>
            </div>
          </div>
          <p className="text-xs text-white/40">© 2026 Crédit Agricole du Maroc · Tous droits réservés</p>
        </div>
      </aside>

      {/* Login panel */}
      <main className="flex min-h-screen flex-col bg-white">
        <header className="flex items-center justify-between border-b border-[#e8eeea] px-5 py-5 sm:px-10 lg:px-14">
          <div className="lg:hidden">
            <MarocLogo />
          </div>
          <div className="hidden items-center gap-2 text-xs font-medium text-[#5f746d] sm:flex">
            <Globe2 size={15} className="text-[#1b8d72]" />
            Maroc
          </div>
          <button type="button" aria-label="Aide" className="ml-auto rounded-full p-2 text-[#5f746d] transition-colors hover:bg-[#eff7f2] hover:text-[#006b4f]">
            <HelpCircle size={21} />
          </button>
        </header>

        <div className="flex flex-1 items-start justify-center px-5 py-10 sm:px-10 sm:py-14 lg:items-center lg:px-14 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="w-full max-w-[31rem]">
            <div className="mb-9">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf7f1] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#087d61]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e30613]" /> Espace client
              </div>
              <h2 className="font-[Poppins] text-3xl font-semibold tracking-[-0.04em] text-[#17352e] sm:text-[2.15rem]">Bienvenue dans votre espace</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#6f8079]">Connectez-vous pour consulter vos comptes et piloter vos opérations en toute sécurité.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="identifiant" className="ml-1 text-sm font-semibold text-[#35544b]">Identifiant client</label>
                <div className="group relative">
                  <User size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8ca19a] transition-colors group-focus-within:text-[#078261]" />
                  <input
                    id="identifiant"
                    type="text"
                    value={identifiant}
                    onChange={(e) => setIdentifiant(e.target.value)}
                    placeholder="Saisissez votre identifiant"
                    className="w-full rounded-xl border border-[#dce7e1] bg-[#fbfdfb] py-4 pl-12 pr-4 text-sm text-[#17352e] outline-none transition-all placeholder:text-[#9aaba4] focus:border-[#159b79] focus:bg-white focus:ring-4 focus:ring-[#159b79]/10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="code-personnel" className="ml-1 text-sm font-semibold text-[#35544b]">Code personnel</label>
                <div className="group relative">
                  <Lock size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8ca19a] transition-colors group-focus-within:text-[#078261]" />
                  <input
                    id="code-personnel"
                    type={showCode ? "text" : "password"}
                    value={codePersonnel}
                    onChange={(e) => setCodePersonnel(e.target.value)}
                    placeholder="Saisissez votre code personnel"
                    className="w-full rounded-xl border border-[#dce7e1] bg-[#fbfdfb] py-4 pl-12 pr-12 text-sm text-[#17352e] outline-none transition-all placeholder:text-[#9aaba4] focus:border-[#159b79] focus:bg-white focus:ring-4 focus:ring-[#159b79]/10"
                    required
                  />
                  <button type="button" onClick={() => setShowCode(!showCode)} aria-label={showCode ? "Masquer le code personnel" : "Afficher le code personnel"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#8ca19a] transition-colors hover:bg-[#edf7f1] hover:text-[#078261]">
                    {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-[#6f8079]">
                  <input type="checkbox" className="h-4 w-4 rounded border-[#cbdad3] accent-[#078261]" />
                  Se souvenir de moi
                </label>
                <button type="button" className="text-xs font-semibold text-[#078261] transition-colors hover:text-[#005d47] hover:underline">Identifiants oubliés ?</button>
              </div>

              <button
                type="submit"
                disabled={isLoading || !identifiant || !codePersonnel}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white shadow-[0_12px_24px_-12px_rgba(0,107,79,0.8)] transition-all active:scale-[0.99] ${
                  isLoading || !identifiant || !codePersonnel ? "cursor-not-allowed bg-[#b9cbc3]" : "bg-[#006b4f] hover:bg-[#005d47]"
                }`}
              >
                {isLoading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <>Se connecter <ArrowRight size={18} /></>}
              </button>
            </form>

            {error && (
              <p role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" /> {error}
              </p>
            )}

            <div className="mt-9 flex items-start gap-3 rounded-2xl border border-[#dbece0] bg-[#f3faf5] p-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dcefe2] text-[#087d61]"><CheckCircle2 size={17} /></div>
              <div>
                <p className="text-sm font-semibold text-[#245c4c]">Votre sécurité est notre priorité</p>
                <p className="mt-1 text-xs leading-5 text-[#5f8072]">Ne communiquez jamais votre code personnel. Crédit Agricole du Maroc ne vous le demandera jamais par email ou par téléphone.</p>
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-[#a0afa9]">Besoin d’aide ? Contactez votre agence Crédit Agricole du Maroc.</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
