import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Building,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Check,
  Activity,
  PhoneCall,
  Laptop
} from "lucide-react";
import { Slide } from "../data/slidesData";

interface SlideTemplatesProps {
  currentSlide: Slide;
  currentSlideIndex: number;
  handleJumpToSlide: (index: number) => void;
  setViewMode: (mode: "slides" | "dashboard" | "calculator") => void;
  setCalcBudget: (b: number) => void;
}

export default function SlideTemplates({
  currentSlide,
  currentSlideIndex,
  handleJumpToSlide,
  setViewMode,
  setCalcBudget
}: SlideTemplatesProps) {
  // Slide 4 activity select
  const [slide4Activity, setSlide4Activity] = useState(0);

  // Slide 5 suppliers tab
  const [slide5SupplierTab, setSlide5SupplierTab] = useState<"internes" | "externes">("internes");

  // Slide 10 open question
  const [slide10OpenQuestion, setSlide10OpenQuestion] = useState<number | null>(null);

  // Slide 14 chosen month calendar
  const [slide14Month, setSlide14Month] = useState<"mars" | "avril" | "mai">("mars");

  // Slide 17 chosen video script
  const [slide17Video, setSlide17Video] = useState(0);

  // Slide 19 message list & custom new messenger simulation
  const [slide19SentCount, setSlide19SentCount] = useState(0);
  const [slide19ChatReplies, setSlide19ChatReplies] = useState<string[]>([]);

  useEffect(() => {
    if (currentSlide.id === "slide-19") {
      setSlide19SentCount(0);
    } else if (currentSlide.id === "slide-19b") {
      setSlide19SentCount(1);
    }
  }, [currentSlide.id]);

  // Slide 4 SVG Pie Chart Active Segment
  const [activePieSegment, setActivePieSegment] = useState<number | null>(null);

  // Slide 7 Qualitative interview active note
  const [activeInterviewNod, setActiveInterviewNod] = useState(0);

  // Slide 10 Simulated mobile phone reel toggle
  const [currentPhoneMock, setCurrentPhoneMock] = useState(0);

  // Slide 9 editorial calendar filtered day
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<string>("Lundi");

  // Slide 20 custom pixel tracker active logs and triggers
  const [slide20PixelLog, setSlide20PixelLog] = useState<{event: string; time: string; status: string}[]>([]);
  const [slide20LeadPixels, setSlide20LeadPixels] = useState<number>(158);
  const [slide20ContactPixels, setSlide20ContactPixels] = useState<number>(226);

  // Copy hex indicator
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(name);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="flex-1 relative z-10 flex flex-col justify-center min-h-[300px] overflow-y-auto pr-1">
      
      {/* 1. TITLE SCREEN (SLIDE 1) */}
      {currentSlide.id === "slide-1" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:col-span-7 space-y-4"
          >
            <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed font-sans font-light">
              Mémoire de soutenance de Projet de Fin d'Études présenté devant l'établissement d'enseignement technique et de formation professionnelle de Mégrine pour l'obtention du diplôme de fin de formation d'Assistant en Marketing.
            </p>
            <div className="h-0.5 w-24 bg-[#D1A153]" />
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-white/40 block font-mono uppercase tracking-wider">Élaboré par :</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {currentSlide.data.authors.map((auth: string, authIdx: number) => (
                    <motion.span
                      key={auth}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + authIdx * 0.1, duration: 0.3 }}
                      className="bg-[#D1A153]/10 px-3 py-1.5 rounded-md text-xs font-semibold text-white border border-[#D1A153]/20"
                    >
                      {auth}
                    </motion.span>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-[#D1A153] block font-mono uppercase tracking-wider font-bold">
                {currentSlide.data.promotion}
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="md:col-span-5 bg-black/40 p-5 rounded-xl border border-white/[0.06] space-y-3 font-mono text-xs"
          >
            <div className="text-[10px] border-b border-white/10 pb-1 text-[#D1A153] uppercase tracking-widest font-bold">
              Fiche d'identification
            </div>
            <div>
              <span className="text-white/45 block text-[10px]">ORGANISME :</span>
              <span className="text-white font-sans font-medium">{currentSlide.data.institution}</span>
            </div>
            <div>
              <span className="text-white/45 block text-[10px]">ENCADRANT ACADÉMIQUE :</span>
              <span className="text-white font-sans font-medium">{currentSlide.data.supervisors.academic}</span>
            </div>
            <div>
              <span className="text-white/45 block text-[10px]">ENCADRANT PROFESSIONNEL :</span>
              <span className="text-white font-sans font-medium">{currentSlide.data.supervisors.professional}</span>
            </div>
            <div className="text-[9px] text-white/30 text-right pt-2 border-t border-white/5">
              {currentSlide.data.decorations.republic}
            </div>
          </motion.div>
        </div>
      )}

      {/* 2. PLAN/SOMMAIRE (SLIDE 2) */}
      {currentSlide.id === "slide-2" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
          {currentSlide.data.steps.map((st: any, idx: number) => {
            const isActive = currentSlideIndex >= idx; 
            return (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                whileHover={{ scale: 1.04, y: -4, borderColor: "#D1A153" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  let mappedIndex = 0;
                  if (idx === 0) mappedIndex = 2; // Introduction & Contexte (slide-3)
                  else if (idx === 1) mappedIndex = 3; // Présentation Groupe SOROUBAT (slide-4)
                  else if (idx === 2) mappedIndex = 5; // Diagnostic — SWOT (slide-6)
                  else if (idx === 3) mappedIndex = 11; // Problématique & Objectifs (slide-12)
                  else if (idx === 4) mappedIndex = 8; // Étude de Perception Interne (slide-9)
                  else if (idx === 5) mappedIndex = 12; // Stratégie Digitale (slide-13)
                  else if (idx === 6) mappedIndex = 17; // Résultats (slide-18)
                  else mappedIndex = 21; // Recommandations (slide-22)
                  handleJumpToSlide(mappedIndex);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                  isActive 
                    ? "bg-[#122240] border-[#D1A153]/30 shadow-md" 
                    : "bg-black/20 border-white/5 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="text-xs font-mono font-bold text-[#D1A153] mb-1">{st.num}</div>
                <h4 className="text-xs font-semibold text-white font-display leading-tight">{st.title}</h4>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 3. INTRO & CONTEXTE (SLIDE 3) */}
      {currentSlide.id === "slide-3" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="bg-black/35 p-5 rounded-xl border border-white/5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#D1A153] uppercase tracking-wider">
                Le Contexte Immobilier Tunisien
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-sans font-light">
                {currentSlide.data.contexte}
              </p>
            </div>
            <div className="text-[10px] text-white/40 pt-3 border-t border-white/5 uppercase font-mono">
              Mutation majeure vers le SMM
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -3 }}
            className="bg-[#D1A153]/5 p-5 rounded-xl border border-[#D1A153]/30 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#D1A153] uppercase tracking-wider">
                Obstacle Clef Identifié
              </h3>
              <p className="text-xs text-amber-100 font-medium italic leading-relaxed">
                {currentSlide.data.probleme_cle}
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#D1A153] font-bold bg-[#D1A153]/10 p-2 rounded text-center">
              ✖ Visibilité négative par rapport à la concurrence active
            </div>
          </motion.div>
        </div>
      )}

      {/* 4. PRESENTATION GROUPE SOROUBAT (SLIDE 4) */}
      {currentSlide.id === "slide-4" && (
        <div className="space-y-4 py-2">
          {/* Fiche Technique in a nice compact horizontal list */}
          <div className="bg-black/30 p-4 rounded-xl border border-white/[0.08] text-xs">
            <span className="border-b border-[#D1A153]/20 pb-1 mb-2.5 font-mono text-[10px] text-[#D1A153] uppercase tracking-wider block">
              Fiche Signalétique Générale
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-white/40 block text-[9px] uppercase tracking-wider">Création :</span>
                <span className="text-white font-mono font-bold text-sm">{currentSlide.data.signaletique.founded}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px] uppercase tracking-wider">Pays et Filiales :</span>
                <span className="text-white font-sans text-sm font-semibold">{currentSlide.data.signaletique.subsidiaries}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px] uppercase tracking-wider">Effectif Global :</span>
                <span className="text-white font-sans font-semibold text-sm">{currentSlide.data.signaletique.employees}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px] uppercase tracking-wider">Capital Social :</span>
                <span className="text-white font-mono font-bold text-sm text-[#D1A153]">{currentSlide.data.signaletique.capital}</span>
              </div>
            </div>
          </div>

          {/* Pôles d'Activités Majeurs displayed directly */}
          <div className="space-y-2">
            <span className="text-[10px] text-white/40 uppercase block font-mono">
              Pôles d'Activités Majeurs du Groupe :
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentSlide.data.activities.map((act: any) => (
                <div key={act.title} className="bg-[#122240] border border-white/5 p-3.5 rounded-xl hover:border-[#D1A153]/30 transition-all flex flex-col justify-start">
                  <span className="text-[10.5px] font-mono text-[#D1A153] uppercase font-bold tracking-tight border-b border-white/5 pb-1 block mb-2">
                    {act.title}
                  </span>
                  <p className="text-[11px] text-white/70 leading-relaxed font-sans font-light">
                    {act.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. FICHE DE SYNTHESE STRATEGIQUE (SLIDE 5) */}
      {currentSlide.id === "slide-5" && (
        <div className="space-y-4 py-2">
          {/* Finance Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            {Object.keys(currentSlide.data.chiffreAffaires).filter(k => k.endsWith('_desc')).map((key, idx) => {
              const baseKey = key.replace('_desc', '');
              const value = currentSlide.data.chiffreAffaires[baseKey];
              const label = currentSlide.data.chiffreAffaires[key];
              const colors = ["text-green-400", "text-red-400", "text-[#D1A153]", "text-white"];
              return (
                <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.05, duration: 0.3 }}
                   whileHover={{ scale: 1.03, y: -2 }}
                   className="bg-black/30 p-2.5 rounded border border-white/5"
                >
                  <span className="text-[9px] text-white/30 uppercase block font-mono">{label}</span>
                  <span className={`text-md font-extrabold font-mono ${colors[idx] || 'text-white'}`}>{value}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Suppliers: fully laid out side-by-side, no tabs or switchers */}
            <div className="bg-[#122240] border border-white/5 p-3.5 rounded-lg flex flex-col justify-between">
              <div>
                <div className="border-b border-white/10 pb-1 mb-2">
                  <span className="text-[10px] font-bold text-[#D1A153] uppercase tracking-wider">Partenaires & Constructeurs</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-[8.5px] text-white/40 block font-mono">CONSTRUCTEURS INTERNES :</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentSlide.data.fournisseurs.internes.map((fo: string) => (
                        <span key={fo} className="text-[9.5px] bg-[#D1A153]/15 text-[#D1A153] px-1.5 py-0.5 rounded border border-[#D1A153]/25">
                          {fo}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[8.5px] text-white/40 block font-mono">SOUS-TRAITANTS EXTERNES :</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentSlide.data.fournisseurs.externes.map((fo: string) => (
                        <span key={fo} className="text-[9.5px] bg-white/5 text-stone-300 px-1.5 py-0.5 rounded border border-white/5">
                          {fo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clientele */}
            <div className="bg-[#122240] border border-white/5 p-3 rounded-lg">
              <div className="border-b border-white/10 pb-1 mb-2">
                <span className="text-[10px] font-bold text-[#D1A153] uppercase">Parts de Clientèle (Volume)</span>
              </div>
              <div className="space-y-1 text-[11px]">
                {currentSlide.data.clientele.map((cli: any) => (
                  <div key={cli.label} className="flex justify-between items-center py-0.5">
                    <span className="text-white/80 truncate max-w-[150px]" title={cli.label}>{cli.label}</span>
                    <span className="font-mono text-[#D1A153] font-bold shrink-0 ml-1">{cli.value}%</span>
                  </div>
                ))}
              </div>
              {currentSlide.data.clientele[0]?.warning && (
                <div className="text-[8.5px] text-yellow-300 font-mono italic leading-tight mt-2 border-t border-white/5 pt-1">
                  * Concentration sur les TRE
                </div>
              )}
            </div>

            {/* Competitors (no scrolling needed) */}
            <div className="bg-[#122240] border border-white/5 p-3 rounded-lg">
              <div className="border-b border-white/10 pb-1 mb-2">
                <span className="text-[10px] font-bold text-[#D1A153] uppercase">Concurrence Sectorielle</span>
              </div>
              <div className="space-y-2 text-[10px]">
                {currentSlide.data.concurrence.map((co: any) => (
                  <div key={co.type} className="border-b border-white/5 pb-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">{co.type}</span>
                      <span className="text-red-400 font-mono font-bold">{co.intensity}</span>
                    </div>
                    <p className="text-white/50 text-[9px] truncate">{co.names}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. DIAGNOSTIC — SWOT (SLIDE 6) */}
      {currentSlide.id === "slide-6" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 py-1">
          {/* Forces */}
          <div className="bg-[#122240]/40 border border-green-500/20 hover:border-green-500/40 p-3 rounded-lg transition-all">
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider block mb-1">🛡 Forces / Strengths (S)</span>
            <ul className="space-y-1 text-xs text-white/70 font-sans">
              {currentSlide.data.forces.map((f: string) => (
                <li key={f} className="flex items-start">
                  <span className="text-green-400 mr-1.5 font-bold">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Faiblesses */}
          <div className="bg-[#122240]/40 border border-red-500/20 hover:border-red-500/40 p-3 rounded-lg transition-all">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">⚠️ Faiblesses / Weaknesses (W)</span>
            <ul className="space-y-1 text-xs text-white/70 font-sans">
              {currentSlide.data.faiblesses.map((w: string) => (
                <li key={w} className="flex items-start">
                  <span className="text-red-400 mr-1.5 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="bg-[#122240]/40 border border-blue-400/20 hover:border-blue-400/40 p-3 rounded-lg transition-all">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">🚀 Opportunités / Opportunities (O)</span>
            <ul className="space-y-1 text-xs text-white/70 font-sans">
              {currentSlide.data.opportunites.map((o: string) => (
                <li key={o} className="flex items-start">
                  <span className="text-blue-400 mr-1.5 font-bold">•</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-[#122240]/40 border border-yellow-500/20 hover:border-yellow-500/40 p-3 rounded-lg transition-all">
            <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider block mb-1">⚡ Menaces / Threats (T)</span>
            <ul className="space-y-1 text-xs text-white/70 font-sans">
              {currentSlide.data.menaces.map((t: string) => (
                <li key={t} className="flex items-start">
                  <span className="text-yellow-500 mr-1.5 font-bold">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 7. AUDIT DE LA PRESENCE FACEBOOK (SLIDE 7) */}
      {currentSlide.id === "slide-7" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-2">
          {/* Highlights */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
              <span className="text-[9px] text-white/45 uppercase font-mono block">Données Statistiques</span>
              <div className="flex justify-between items-baseline border-b border-white/5 pb-1">
                <span className="text-xs text-white/75">Abonnés organiques :</span>
                <strong className="text-sm font-mono text-white">{currentSlide.data.metrics.followers}</strong>
              </div>
              <div className="flex justify-between items-baseline border-b border-white/5 pb-1">
                <span className="text-xs text-white/75">Vues de départ :</span>
                <strong className="text-sm font-mono text-red-400">{currentSlide.data.metrics.views}</strong>
              </div>
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-white/75">Retrait d'audience :</span>
                <strong className="font-mono text-center text-red-300">{currentSlide.data.metrics.views_change}</strong>
              </div>
            </div>

            <div className="bg-[#D1A153]/5 border border-[#D1A153]/15 p-2.5 rounded text-[11px] text-stone-300 leading-tight">
              * {currentSlide.data.metrics.non_subscribers} de l'auditoire provenait de non-abonnés, prouvant un excellent potentiel de conversion de prospects.
            </div>
          </div>

          {/* Formats Graph */}
          <div className="md:col-span-7 space-y-3">
            <span className="text-[10px] text-white/40 uppercase block font-mono">Engagement cannelé par format d'audience :</span>
            <div className="space-y-2.5">
              {currentSlide.data.formats.map((form: any) => (
                <div key={form.name} className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">{form.name}</span>
                    <span className="font-mono text-[#D1A153] font-bold">{form.value}%</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full rounded-full" style={{ width: `${form.value}%`, backgroundColor: form.color }} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-black/30 p-2.5 rounded border border-white/5 text-[10px] text-white/50 italic leading-snug">
              Diagnostics : Absence totale d'agenda récurrent de publication.
            </div>
          </div>
        </div>
      )}

      {/* 8. AUDIT DE LA PRESENCE INSTAGRAM (SLIDE 8) */}
      {currentSlide.id === "slide-8" && (
        <div className="space-y-3.5 py-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-center">
            <div className="bg-[#122240] border border-white/5 p-2.5 rounded-xl">
              <span className="text-[9px] text-white/40 uppercase block">Followers IG</span>
              <strong className="text-sm font-mono text-pink-400">{currentSlide.data.metrics.followers}</strong>
            </div>
            <div className="bg-[#122240] border border-white/5 p-2.5 rounded-xl">
              <span className="text-[9px] text-white/40 uppercase block">Total Vues (30J)</span>
              <strong className="text-sm font-mono text-white">{currentSlide.data.metrics.views}</strong>
            </div>
            <div className="bg-[#122240] border border-white/5 p-2.5 rounded-xl">
              <span className="text-[9px] text-white/40 uppercase block">Reach Organique</span>
              <strong className="text-sm font-mono text-pink-300">{currentSlide.data.metrics.reach}</strong>
            </div>
            <div className="bg-[#122240] border border-white/5 p-2.5 rounded-xl">
              <span className="text-[9px] text-white/40 uppercase block">Views Hors Abonnés</span>
              <strong className="text-sm font-mono text-white">{currentSlide.data.metrics.non_followers}</strong>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-white/[0.08] bg-black/25">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.08] text-pink-400 font-mono">
                  <th className="p-2">Indicateur Technique</th>
                  <th className="p-2">Résultat Obtenu</th>
                  <th className="p-2">Interprétation Pratique</th>
                  <th className="p-2 text-center">Niveau</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {currentSlide.data.table.map((row: any) => (
                  <tr key={row.indicator} className="hover:bg-white/[0.01]">
                    <td className="p-2 font-semibold text-white">{row.indicator}</td>
                    <td className="p-2 text-[#D1A153]">{row.result}</td>
                    <td className="p-2 text-white/60">{row.interpretation}</td>
                    <td className="p-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${row.status === "Fort" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-500"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 9. METHODOLOGIE ENQUETE (SLIDE 9) */}
      {currentSlide.id === "slide-9" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          <div className="bg-[#122240]/60 border border-[#D1A153]/25 p-5 rounded-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="bg-[#D1A153]/15 text-[#D1A153] font-bold text-[9px] px-2.5 py-0.5 rounded uppercase">Cadre Scientifique</span>
              <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">Objectif de l'Enquête Terrain</h4>
              <p className="text-xs text-stone-200 leading-relaxed font-sans">
                {currentSlide.data.objectif}
              </p>
            </div>
            <div className="text-[10px] text-white/30 border-t border-white/5 pt-2 italic">
              * Recueil du vécu direct en relation client
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <div className="bg-black/35 p-3 rounded-lg border border-white/5 text-xs">
              <span className="text-[9px] text-white/40 block font-mono">POPULATION DIRECTE :</span>
              <strong className="text-white font-sans font-semibold">{currentSlide.data.population}</strong>
            </div>
            <div className="bg-black/35 p-3 rounded-lg border border-white/5 text-xs">
              <span className="text-[9px] text-white/40 block font-mono">OUTIL DE RECHERCHE :</span>
              <strong className="text-white font-sans font-semibold">{currentSlide.data.methode}</strong>
            </div>
            <div className="bg-black/35 p-3 rounded-lg border border-white/5 text-xs flex justify-between items-center">
              <div>
                <span className="text-[9px] text-white/40 block font-mono font-bold text-[#D1A153]">ÉCHANTILLON CONSTITUTIONNEL :</span>
                <strong className="text-[#D1A153] font-mono font-bold">{currentSlide.data.taille}</strong>
              </div>
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
      )}

      {/* 10. GUIDE ENTRETIEN & QUESTIONNAIRE (SLIDE 10) */}
      {currentSlide.id === "slide-10" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 py-2 text-xs">
          {/* Raisons - fully open, no scrollbar */}
          <div className="md:col-span-4 bg-[#122240] border border-white/5 p-4 rounded-xl space-y-2.5">
            <span className="text-[10px] text-[#D1A153] font-bold uppercase tracking-wider block border-b border-white/10 pb-1">Intérêts Stratégiques</span>
            <ul className="space-y-2 text-xs text-white/70">
              {currentSlide.data.raisons.map((r: string, idx: number) => (
                <li key={idx} className="flex items-start leading-tight">
                  <span className="text-[#D1A153] font-mono font-bold mr-2">{idx + 1}.</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Questionnaire list with pre-expanded findings - fully open 2x2 grid, no clicks, no scrollbar */}
          <div className="md:col-span-8 space-y-2.5">
            <span className="text-[10px] text-white/40 uppercase block font-mono">Grille d'Évaluation & Diagnostics Immédiats :</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-black/35 rounded-xl border border-white/10 p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[8.5px] font-mono text-[#D1A153] uppercase block mb-1">01. IMPORTANCE GLOBALE</span>
                  <strong className="text-[11px] text-white block leading-tight">{currentSlide.data.questions[0] || "SMM pour l'immobilier ?"}</strong>
                </div>
                <p className="text-[10.5px] text-white/50 border-t border-white/5 mt-1.5 pt-1.5 font-light font-sans">
                  Clé absolue face aux nouveaux comportements d'achat des TRE.
                </p>
              </div>

              <div className="bg-black/35 rounded-xl border border-white/10 p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[8.5px] font-mono text-[#D1A153] uppercase block mb-1">02. CANAUX EXPLOITÉS</span>
                  <strong className="text-[11px] text-white block leading-tight">{currentSlide.data.questions[1] || "Canaux existants ?"}</strong>
                </div>
                <p className="text-[10.5px] text-white/50 border-t border-white/5 mt-1.5 pt-1.5 font-light font-sans">
                  Site web statique, absence totale de communication active sur Instagram.
                </p>
              </div>

              <div className="bg-black/35 rounded-xl border border-white/10 p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[8.5px] font-mono text-[#D1A153] uppercase block mb-1">03. NIVEAU DES CONTENUS</span>
                  <strong className="text-[11px] text-white block leading-tight">{currentSlide.data.questions[4] || "Qualité des contenus ?"}</strong>
                </div>
                <p className="text-[10.5px] text-white/50 border-t border-white/5 mt-1.5 pt-1.5 font-light font-sans">
                  Simple photos brutes de ferraille de chantier, manque cruel d'immersion noble.
                </p>
              </div>

              <div className="bg-black/30 rounded-xl border border-white/10 p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[8.5px] font-mono text-[#D1A153] uppercase block mb-1">04. DELAI D'INTERACTION</span>
                  <strong className="text-[11px] text-white block leading-tight">{currentSlide.data.questions[5] || "Temps de réponse ?"}</strong>
                </div>
                <p className="text-[10.5px] text-white/50 border-t border-white/5 mt-1.5 pt-1.5 font-light font-sans">
                  Temps de réponse moyen estimé à plus de 28 heures sur Facebook.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. ANNALYSE DES REPONSES (SLIDE 11) */}
      {currentSlide.id === "slide-11" && (
        <div className="space-y-2 py-2">
          <span className="text-[10px] text-white/40 uppercase block font-mono">Synthèse qualitative codée des entretiens terrain (sans défilement) :</span>
          <div className="rounded border border-white/10 bg-black/40 p-1">
            <table className="w-full text-left text-[10.5px] border-collapse font-sans">
              <thead>
                <tr className="bg-[#122240] text-[#D1A153] font-medium">
                  <th className="p-2">Indicateur Diagnostic</th>
                  <th className="p-2">Constat Unanime constaté</th>
                  <th className="p-2">Interprétation opérationnelle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentSlide.data.rows.map((row: any) => (
                  <tr key={row.q} className="hover:bg-white/[0.01]">
                    <td className="p-2 font-semibold text-white max-w-[130px] truncate">{row.q}</td>
                    <td className="p-2 text-white/70 font-light">{row.response}</td>
                    <td className="p-2 text-amber-100 italic">{row.interpretation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 12. PROBLEM & OBJECTIFS (SLIDE 12) */}
      {currentSlide.id === "slide-12" && (
        <div className="space-y-4 py-2">
          <div className="bg-[#D1A153]/10 border border-[#D1A153]/30 p-3.5 rounded-xl text-center">
            <span className="text-[9px] uppercase tracking-wider text-[#D1A153] font-bold block mb-1">PROBLÉMATIQUE DE RECHERCHE</span>
            <p className="text-xs md:text-sm text-stone-100 italic font-medium leading-relaxed">
              « {currentSlide.data.problematique} »
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {currentSlide.data.objectifs.map((obj: any, idx: number) => (
              <div key={obj.label} className="bg-navy-dark border border-white/[0.06] p-3 rounded-lg flex flex-col justify-between hover:border-[#D1A153]/45 transition-all text-center">
                <div>
                  <span className="bg-[#D1A153]/15 text-[#D1A153] px-1.5 py-0.5 rounded text-[8px] font-mono font-bold block mb-1">OBJET {idx + 1}</span>
                  <strong className="text-xs text-white uppercase tracking-tight font-display block leading-tight">{obj.label}</strong>
                </div>
                <p className="text-[9.5px] text-white/50 leading-tight mt-1.5 font-sans font-light">{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 13. LA NOUVELLE STRATEGIE (SLIDE 13) */}
      {currentSlide.id === "slide-13" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 py-1">
          {currentSlide.data.axes.map((ax: any) => (
            <div
              key={ax.id}
              className="bg-[#122240]/40 border border-white/5 hover:border-[#D1A153]/35 p-3.5 rounded-xl transition-all text-center flex flex-col justify-center"
            >
              <span className="text-[11px] font-mono text-[#D1A153] font-bold block uppercase tracking-wider mb-1">AXE PUBLICITAIRE {ax.id}</span>
              <h4 className="text-xs font-bold text-white font-display border-b border-white/5 pb-1 mb-1.5 uppercase leading-normal">{ax.title}</h4>
              <p className="text-[10.5px] text-white/50 leading-tight">{ax.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* 14. CALENDRIER EDITORIAL INTERACTIVE (SLIDE 14) */}
      {currentSlide.id === "slide-14" && (
        <div className="space-y-3 py-1 text-xs">
          <span className="text-[10px] text-white/40 uppercase block font-mono">Calendrier Éditorial Global • Aperçu Direct :</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentSlide.data.months.map((m: any) => (
              <div key={m.name} className="bg-[#122240] border border-[#D1A153]/15 p-3 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="border-b border-[#D1A153]/30 pb-1 mb-2">
                    <span className="text-[11px] font-bold text-white font-display block uppercase">{m.name}</span>
                    <span className="text-[9px] text-[#D1A153] block italic mt-0.5 font-light">Cible : {m.focus}</span>
                  </div>
                  <div className="space-y-1.5">
                    {m.events.map((ev: any) => (
                      <div key={ev.day} className="bg-black/25 border border-white/5 p-2 rounded text-left text-[10.5px]">
                        <span className="px-1.5 py-0.5 bg-[#D1A153]/10 text-[#D1A153] font-mono font-bold text-[8.5px] rounded uppercase mr-1.5 inline-block">
                          {ev.day}
                        </span>
                        <span className="text-white/80 font-light leading-tight">{ev.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 15. DIVERSIFICATION - FICHE RESIDENCE FARES (SLIDE 15) */}
      {currentSlide.id === "slide-15" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 py-2">
          {/* Image preview of modern residence */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-4 rounded-xl overflow-hidden border border-white/10 shadow-lg relative group h-[200px] md:h-auto min-h-[160px]"
          >
            <img
              src="/assets/images/fares_residence_1781116048439.png"
              alt="Résidence Farès"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-widest text-[#D1A153] font-bold font-mono">Modèle Pilote</span>
              <h4 className="text-sm font-bold text-white font-display">Résidence Farès</h4>
            </div>
          </motion.div>

          {/* specifications */}
          <div className="md:col-span-4 bg-[#122240] border border-[#D1A153]/25 p-4 rounded-xl space-y-3 text-xs flex flex-col justify-between">
            <div>
              <span className="bg-[#D1A153] text-navy-deep font-bold text-[9px] px-2 py-0.5 rounded tracking-widest uppercase block w-fit mb-2">MODÈLE PILOTE</span>
              <div className="space-y-2">
                <div>
                  <span className="text-[9px] text-white/40 block">PROJET RÉFÉRENT :</span>
                  <span className="text-xs font-bold text-white uppercase">{currentSlide.data.projet.name}</span>
                </div>
                <div>
                  <span className="text-[9px] text-white/40 block">STANDING :</span>
                  <span className="text-xs text-[#D1A153] font-bold">{currentSlide.data.projet.standing}</span>
                </div>
                <div>
                  <span className="text-[9px] text-white/40 block">ÉTIQUETTE ATTRAIT :</span>
                  <span className="text-white/80 leading-tight block">{currentSlide.data.projet.equipements}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-1.5 pt-1.5 border-t border-white/5">
              {currentSlide.data.projet.colors.map((c: string) => (
                <span key={c} className="text-[8px] bg-white/5 px-1.5 rounded text-stone-300 capitalize font-mono block">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Objectives of layout */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] text-white/40 uppercase block">Critères essentiels de l'Affiche :</span>
            <ul className="space-y-1.5">
              {currentSlide.data.projet.objectifsAffiche.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start bg-black/25 p-2 rounded border border-white/5 hover:border-[#D1A153]/20 transition-all text-xs">
                  <span className="text-[#D1A153] font-bold mr-2">✔</span>
                  <span className="text-stone-200 leading-tight font-light">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-black/20 p-2 rounded text-[9px] text-white/40 font-mono text-right">
              Réalisation : {currentSlide.data.projet.logiciel} • Publication {currentSlide.data.projet.publicationDate}
            </div>
          </div>
        </div>
      )}

      {/* 16. ANALYSE MULTI PROJETS AFFICHE (SLIDE 16) */}
      {currentSlide.id === "slide-16" && (
        <div className="space-y-3.5 py-1">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {currentSlide.data.affiches.map((aff: any, idx: number) => {
              const imgUrl = 
                aff.title.toLowerCase().includes("global") ? "/assets/images/global_projects_1781116099624.png" :
                aff.title.toLowerCase().includes("farès") || aff.title.toLowerCase().includes("fares") ? "/assets/images/fares_residence_1781116048439.png" :
                aff.title.toLowerCase().includes("arcades") ? "/assets/images/arcades_residence_1781116064218.png" :
                aff.title.toLowerCase().includes("médina") || aff.title.toLowerCase().includes("medina") ? "/assets/images/medina_residence_1781116080444.png" : "";

              return (
                <motion.div
                  key={aff.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.03, y: -4, borderColor: "#D1A153" }}
                  className="bg-[#122240] border border-white/5 hover:border-[#D1A153]/40 rounded-xl transition-all flex flex-col justify-between text-xs overflow-hidden shadow-lg"
                >
                  {imgUrl && (
                    <div className="h-28 w-full overflow-hidden border-b border-white/5 relative group">
                      <img
                        src={imgUrl}
                        alt={aff.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-navy-deep/80 backdrop-blur-sm text-[8px] text-[#D1A153] px-1.5 py-0.5 rounded font-mono font-bold uppercase border border-white/5">
                        {aff.software}
                      </span>
                    </div>
                  )}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <strong className="text-xs text-white block uppercase tracking-tight font-display mb-1 border-b border-white/5 pb-1 leading-tight">{aff.title}</strong>
                      <span className="text-[9.5px] text-stone-300 italic block mb-1">{aff.subtitle}</span>
                      <p className="text-[10.5px] text-white/50 leading-tight font-sans font-light">{aff.desc}</p>
                    </div>
                    <div className="text-[9px] font-mono text-white/30 pt-1.5 border-t border-white/5 mt-2 flex justify-between">
                      <span>{aff.size}</span>
                      <span className="truncate max-w-[50px]">{aff.textStyle.split(" ")[0]}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-black/30 p-2 rounded border border-white/5 flex flex-wrap gap-2 justify-between items-center text-[11px]">
            {currentSlide.data.buts.map((b: string) => (
              <span key={b} className="text-stone-300 flex items-center space-x-1">
                <span className="text-[#D1A153] mr-1">✔</span>
                <span className="font-light">{b}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 17. OPTIMISATION SCRIPT VIDEO CAPCUT (SLIDE 17) */}
      {currentSlide.id === "slide-17" && (
        <div className="space-y-3 py-1 text-xs">
          <span className="text-[10px] text-white/40 uppercase block font-mono">Séquencier Vidéo CapCut de Promotion Immobilière (Aperçu direct sans défilement) :</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentSlide.data.videos.map((vid: any, idx: number) => {
              const videoUrls = [
                "/videos/fares-appartement.mp4",
                "/videos/salle-de-sport.mp4",
                "/videos/triplex-arcades.mp4"
              ];
              return (
                <div key={vid.id} className="bg-[#122240] border border-[#D1A153]/15 rounded-xl overflow-hidden flex flex-col justify-between">
                  {/* Card Video Header */}
                  <div className="h-[200px] relative bg-black">
                    <video
                      src={videoUrls[idx]}
                      className="w-full h-full object-contain"
                      controls
                      preload="metadata"
                      playsInline
                    />
                    <div className="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 rounded font-mono text-[8px] text-[#D1A153] uppercase font-bold z-10">
                      {vid.duration}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-3 space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-[11.5px] font-bold text-white font-display border-b border-white/5 pb-1 block mb-1">
                        {vid.title}
                      </h4>
                      <div className="bg-black/35 p-2 rounded text-[10px] italic text-[#D1A153] leading-snug mb-2 font-sans font-light">
                        « {vid.openingText} »
                      </div>

                      <div className="space-y-1">
                        <span className="text-[8px] text-white/40 font-mono block uppercase">Buts Visuels :</span>
                        {vid.objectifs.map((ob: string) => (
                          <span key={ob} className="text-[9.5px] text-stone-300 block truncate" title={ob}>
                            • {ob}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#D1A153]/10 mt-2 space-y-1">
                      <div className="flex flex-wrap gap-1">
                        {vid.capcutTools.map((t: string) => (
                          <span key={t} className="text-[8px] bg-[#D1A153]/10 text-[#D1A153] px-1.5 py-0.5 rounded font-mono border border-[#D1A153]/20">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="text-[8.5px] text-[#D1A153]/80 italic mt-1 text-right truncate">
                        🎵 {vid.music}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 18. PROCESSUS DE SPONSORING PUBLICITAIRE (SLIDE 18) */}
      {currentSlide.id === "slide-18" && (
        <div className="space-y-2.5 py-2">
          <span className="text-[10px] text-white/40 uppercase block font-mono">Les 7 briques d'intégration d'une campagne Meta Ads performante (sans défilement) :</span>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
            {currentSlide.data.etapes.map((et: any) => (
              <div key={et.step} className="bg-[#122240] border border-white/5 p-2 rounded-xl hover:border-[#D1A153]/40 transition-all flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#D1A153] font-bold block mb-0.5">ÉTAPE {et.step}</span>
                  <strong className="text-[10.5px] text-white block uppercase tracking-tight font-[#D1A153] mb-1 border-b border-white/5 pb-1 leading-none">{et.title}</strong>
                  <p className="text-[9.5px] text-white/60 leading-tight font-sans font-light">{et.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 19. CONVERSATIONS CHAT SIMULATOR (SLIDE 19) */}
      {(currentSlide.id === "slide-19" || currentSlide.id === "slide-19b") && (
        <div className="space-y-4 py-1 text-xs">
          {/* Header context area */}
          <div className="bg-[#D1A153]/5 border border-[#D1A153]/20 px-3 py-2 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[11px]">
            <span className="font-light text-stone-200">
              ⚡ <strong className="text-[#D1A153] font-bold">
                {currentSlide.id === "slide-19" 
                  ? "Captures : Messageries Messenger & FB" 
                  : "Captures : Canaux Instagram Direct & Story"}
              </strong> • Preuves directes tirées de notre Meta Business Suite (TRE).
            </span>
            <div className="flex items-center space-x-2 font-mono text-xs text-white/50 shrink-0">
              <span className={`px-2 py-0.5 rounded border ${
                currentSlide.id === "slide-19"
                  ? "bg-blue-600/10 text-blue-400 border-blue-500/20"
                  : "bg-pink-600/10 text-pink-400 border-pink-500/20"
              }`}>
                {currentSlide.id === "slide-19" ? "● Messagerie Live FB" : "● Instagram Direct"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Column: Inbox List Selector */}
            <div className="lg:col-span-4 bg-[#122240]/40 rounded-2xl border border-white/5 p-3 flex flex-col space-y-2">
              <span className="text-[9px] text-[#D1A153] uppercase font-mono tracking-wider font-bold block px-1 pb-1 border-b border-white/5">
                {currentSlide.id === "slide-19" ? "📥 SÉLECTIONNER UN PROSPECT (FB)" : "📥 SÉLECTIONNER UN PROSPECT (IG)"}
              </span>
              
              {/* Tabs list */}
              <div className="space-y-1.5 flex-1 min-h-[300px] overflow-y-auto pr-1">
                {/* Tab 1: Samia */}
                {currentSlide.id === "slide-19" && (
                <button
                  onClick={() => setSlide19SentCount(0)} // Use existing state as tab pointer
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start space-x-2.5 ${
                    slide19SentCount === 0
                      ? "bg-[#182C4E] border-[#D1A153]/50 text-white shadow-lg"
                      : "bg-black/10 border-white/5 hover:bg-white/[0.02] text-white/70"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-pink-600/35 border border-pink-500 flex items-center justify-center text-white font-bold text-xs shrink-0 self-center">
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-[11.5px] truncate">Samia Ch Abid</span>
                      <span className="text-[8px] font-mono text-zinc-400">Diaspora 🌍</span>
                    </div>
                    <p className="text-[10px] text-[#D1A153] leading-none font-sans font-semibold mb-1">بقدّاش المتر المربع</p>
                    <span className="text-[8.5px] text-zinc-500/90 block">Messenger • 20 avr 2026</span>
                  </div>
                </button>
                )}

                {/* Tab 2: Bochra */}
                {currentSlide.id === "slide-19b" && (
                <button
                  onClick={() => setSlide19SentCount(1)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start space-x-2.5 ${
                    slide19SentCount === 1 || (slide19SentCount !== 2 && slide19SentCount !== 3 && slide19SentCount !== 4)
                      ? "bg-[#182C4E] border-[#D1A153]/50 text-white shadow-lg"
                      : "bg-black/10 border-white/5 hover:bg-white/[0.02] text-white/70"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600/35 border border-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0 self-center">
                    B
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-[11.5px] truncate">Bochra Mel</span>
                      <span className="text-[8px] font-mono text-zinc-400">Diaspora 🌍</span>
                    </div>
                    <p className="text-[10px] text-stone-300 truncate leading-none font-light mb-1">Prix svp / S+2 me&apos;a</p>
                    <span className="text-[8.5px] text-zinc-500/90 block">Instagram • 1 avr 2026</span>
                  </div>
                </button>
                )}

                {/* Tab 3: Najet */}
                {currentSlide.id === "slide-19b" && (
                <button
                  onClick={() => setSlide19SentCount(2)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start space-x-2.5 ${
                    slide19SentCount === 2
                      ? "bg-[#182C4E] border-[#D1A153]/50 text-white shadow-lg"
                      : "bg-black/10 border-white/5 hover:bg-white/[0.02] text-white/70"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-teal-600/30 border border-teal-500 flex items-center justify-center text-white font-bold text-xs shrink-0 self-center">
                    N
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-[11.5px] truncate">Najet</span>
                      <span className="text-[8px] font-mono text-zinc-400">Diaspora 🌍</span>
                    </div>
                    <p className="text-[10px] text-stone-300 truncate leading-none font-light mb-1">Salem prix S+1 & S+2</p>
                    <span className="text-[8.5px] text-zinc-500/90 block">Instagram Direct • 1 avr</span>
                  </div>
                </button>
                )}

                {/* Tab 4: Lobna L */}
                {currentSlide.id === "slide-19b" && (
                <button
                  onClick={() => setSlide19SentCount(3)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start space-x-2.5 ${
                    slide19SentCount === 3
                      ? "bg-[#182C4E] border-[#D1A153]/50 text-white shadow-lg"
                      : "bg-black/10 border-white/5 hover:bg-white/[0.02] text-white/70"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-sky-600/30 border border-sky-500 flex items-center justify-center text-white font-bold text-xs shrink-0 self-center">
                    L
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-[11.5px] truncate">Lobna.L</span>
                      <span className="text-[8px] font-mono text-zinc-400">Diaspora 🌍</span>
                    </div>
                    <p className="text-[10px] text-stone-300 truncate leading-none font-light mb-1">Prix S+3 / Photos chantiers</p>
                    <span className="text-[8.5px] text-zinc-500/90 block">Insta Story • 21 avr</span>
                  </div>
                </button>
                )}

                {/* Tab 5: Karim Magh */}
                {currentSlide.id === "slide-19" && (
                <button
                  onClick={() => setSlide19SentCount(4)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start space-x-2.5 ${
                    slide19SentCount === 4 || (slide19SentCount !== 0)
                      ? "bg-[#182C4E] border-[#D1A153]/50 text-white shadow-lg"
                      : "bg-black/10 border-white/5 hover:bg-white/[0.02] text-white/70"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-600/30 border border-amber-500 flex items-center justify-center text-white font-bold text-xs shrink-0 self-center">
                    K
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-[11.5px] truncate">Karim Magh</span>
                      <span className="text-[8px] font-mono text-zinc-400">TRE 🌍</span>
                    </div>
                    <p className="text-[10px] text-stone-300 truncate leading-none font-light mb-1">Validation Marbre / S+2</p>
                    <span className="text-[8.5px] text-zinc-500/90 block">Facebook • 21 avr 2026</span>
                  </div>
                </button>
                )}
              </div>
            </div>

            {/* Middle Column: Physical Smartphone Screenshot Mockup */}
            <div className="lg:col-span-5 flex flex-col justify-between items-center bg-[#070F1E] rounded-2xl border border-white/10 p-4 shadow-2xl relative min-h-[480px]">
              {/* Smartphone physical bezel notch */}
              <div className="w-full max-w-[280px] bg-black rounded-[36px] border-[5px] border-[#374151] p-2 flex flex-col justify-between relative shadow-2xl overflow-hidden min-h-[440px]">
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-black rounded-xl z-50 flex items-center justify-between px-1.5">
                  <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
                  <div className="w-1 h-1 bg-blue-900 rounded-full" />
                </div>
                
                {/* Physical status bar */}
                <div className="flex justify-between items-center text-[8px] px-4 pt-1 pb-1.5 text-zinc-900 font-bold bg-[#F4F4F5] border-b border-zinc-200">
                  <span>10:14</span>
                  <div className="flex items-center space-x-1">
                    <span>LTE</span>
                    <span>🔋 94%</span>
                  </div>
                </div>

                {/* Simulated Meta Ads Manager Messenger Application Header */}
                <div className="sticky top-0 bg-[#FFFFFF] border-b border-zinc-200 z-40 p-2 text-zinc-800">
                  <div className="flex justify-between items-center text-[7px] text-zinc-400 font-mono mb-1 leading-none">
                    <span className="font-bold tracking-tight text-blue-600">Meta Business Manager Direct</span>
                    <span>Active 24/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#1e293b] border border-zinc-200 flex items-center justify-center text-white text-[9px] font-bold">
                        {slide19SentCount === 0 && "S"}
                        {slide19SentCount === 1 && "B"}
                        {slide19SentCount === 2 && "N"}
                        {slide19SentCount === 3 && "L"}
                        {slide19SentCount === 4 && "K"}
                      </div>
                      <div className="leading-tight">
                        <div className="flex items-center space-x-1">
                          <h4 className="text-[10px] font-bold text-zinc-900 leading-none">
                            {slide19SentCount === 0 && "Samia Ch Abid"}
                            {slide19SentCount === 1 && "Bochra Mel"}
                            {slide19SentCount === 2 && "Najet"}
                            {slide19SentCount === 3 && "Lobna.L"}
                            {slide19SentCount === 4 && "Karim Magh"}
                          </h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        </div>
                        <span className="text-[7.5px] text-indigo-600 font-light underline block">
                          {slide19SentCount === 0 && "Affecter cette co..."}
                          {slide19SentCount === 1 && "Attribuer fil de discussion..."}
                          {slide19SentCount === 2 && "Affecter à l'équipe..."}
                          {slide19SentCount === 3 && "En attente du commercial..."}
                          {slide19SentCount === 4 && "Validation de projet..."}
                        </span>
                      </div>
                    </div>
                    {/* Inbox command buttons */}
                    <div className="flex items-center space-x-1 shrink-0">
                      <span className="w-4 h-4 rounded bg-zinc-100 flex items-center justify-center text-[8px] border border-zinc-200" title="Signaler">⚠️</span>
                      <span className="w-4 h-4 rounded bg-zinc-100 flex items-center justify-center text-[8px] border border-zinc-200" title="Supprimer">🗑️</span>
                      <span className="w-4 h-4 rounded bg-zinc-100 flex items-center justify-center text-[8px] border border-zinc-200" title="Marquer non lu">✉️</span>
                      <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center text-[8px] font-bold border border-emerald-200" title="Clôturer">✓</span>
                    </div>
                  </div>
                </div>

                {/* Chat window body */}
                <div className="flex-1 bg-zinc-50 p-2.5 space-y-2 overflow-y-auto max-h-[300px] text-[9.5px]">
                  
                  {/* SAMIA CH ABID MESSENGER */}
                  {slide19SentCount === 0 && (
                    <>
                      {/* Outgoing greet message */}
                      <div className="flex justify-end">
                        <div className="bg-[#0084FF] text-white p-2 rounded-2xl rounded-tr-none max-w-[190px] leading-snug">
                          Bonjour Samia ! Dites-nous comment nous pouvons vous aider.
                        </div>
                      </div>

                      {/* Incoming Arabic message */}
                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-zinc-900 p-2 rounded-2xl rounded-tl-none max-w-[170px]">
                          <p className="text-right font-semibold text-[11px] leading-none text-zinc-950 font-sans" dir="rtl">بقدّاش المتر المربع</p>
                        </div>
                      </div>

                      {/* Date Separator */}
                      <div className="text-center text-[7.5px] text-zinc-400 font-mono my-1">
                        20 avr 2026, 10:14
                      </div>

                      {/* Sophisticated response from soroubat in Messenger */}
                      <div className="flex justify-end">
                        <div className="bg-[#0084FF] text-white p-2 rounded-2xl rounded-tr-none space-y-1 max-w-[195px] text-[8.5px] leading-relaxed">
                          <p className="font-semibold text-[9px] border-b border-white/20 pb-0.5">Bonjour de Soroubat 🇹🇳</p>
                          <p>Nous sommes très heureux de vous accueillir parmi nous.</p>
                          <p>Les S+2 surfaces disponibles de 112 m² jusqu&apos;à 123 m².</p>
                          <p>Situés au 1er étage et 2ème étage.</p>
                          <p><strong className="text-amber-200">💰 Prix : À partir de 515 000 DT TTC.</strong></p>
                          <p>Garage sous-sol : 25 000 DT en TTC. Aérien : 2000 DT en TTC.</p>
                          <p className="text-[7.5px] font-mono text-zinc-200 underline">Maps: gp.glo/bpcn6jVpFGOCQyv77</p>
                          
                          {/* Apartment render inside bubble */}
                          <div className="rounded overflow-hidden border border-white/10 mt-1 h-14 bg-zinc-950/20">
                            <img src="/assets/images/fares_residence_1781116048439.png" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* BOCHRA MEL INSTAGRAM */}
                  {slide19SentCount === 1 && (
                    <>
                      {/* Incoming greet */}
                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-[#1c1e21] p-1.5 rounded-2xl rounded-tl-none max-w-[160px] leading-tight">
                          Prix svp
                        </div>
                      </div>

                      {/* Replying to ad separator */}
                      <div className="text-center text-[7.5px] text-zinc-400 font-mono my-1">
                        Bochra Mel replied to an Instagram ad. • 1 avr, 18:52
                      </div>

                      {/* Outgoing direct */}
                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-1.5 rounded-2xl rounded-tr-none leading-none">
                          Bsr
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-1.5 rounded-2xl rounded-tr-none max-w-[180px] leading-tight">
                          Quel type d&apos;appartement vous désirez ?
                        </div>
                      </div>

                      <div className="text-center text-[7.5px] text-zinc-400 font-mono my-1">
                        1 avr 2026, 19:09
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-zinc-900 p-1.5 rounded-2xl rounded-tl-none font-bold">
                          S+1
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-1.5 rounded-2xl rounded-tr-none max-w-[190px] leading-snug">
                          Les <span className="font-extrabold text-amber-200">S+1 sont TOUS VENDUS</span> ! J&apos;ai quelques magnifiques S+2 et S+3.
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-zinc-900 p-1.5 rounded-2xl rounded-tl-none italic text-[9px]">
                          S+2 me&apos;a
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-1.5 rounded-2xl rounded-tr-none space-y-0.5 max-w-[190px] text-[8.5px]">
                          <p>Superficie de 112 m² jusqu&apos;à 123 m².</p>
                          <p className="font-bold text-amber-200 border-t border-white/15 pt-0.5">💰 Prix 4500 dt le m² en TTC.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* NAJET INSTAGRAM APEL */}
                  {slide19SentCount === 2 && (
                    <>
                      {/* Missed call card */}
                      <div className="bg-orange-50 border border-orange-100 rounded-lg p-1.5 text-center text-zinc-800 text-[8px] space-y-0.5">
                        <p className="text-orange-500 font-bold font-mono"> najet777 a démarré un appel vocal</p>
                        <p className="text-zinc-400">Vous avez manqué un appel vocal • 1 avr 2026, 18:42</p>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-zinc-900 p-1.5 rounded-2xl rounded-tl-none font-medium">
                          Salem
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-1.5 rounded-2xl rounded-tr-none">
                          3aslema
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-1.5 rounded-2xl rounded-tr-none">
                          Marhba bik madame najet
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-zinc-900 p-2 rounded-2xl rounded-tl-none max-w-[170px] leading-snug">
                          Salem je souhaiterais connaître les prix d&apos;un S+1 et un S+2 a ain zaghouen merci
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-1.5 rounded-2xl rounded-tr-none text-red-100 font-bold">
                          Les S+1 sont tous vendus
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-1.5 rounded-2xl rounded-tr-none max-w-[175px] leading-snug text-[8.5px]">
                          Les s+2 surface de 112 m² jusqu&apos;à 123 m²
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-1.5 rounded-2xl rounded-tr-none font-bold text-amber-200">
                          Prix à 4600 dt le m² en TTC
                        </div>
                      </div>
                    </>
                  )}

                  {/* LOBNA L. STORY & PHOTO CATALOG */}
                  {slide19SentCount === 3 && (
                    <>
                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-zinc-900 p-2 rounded-2xl rounded-tl-none max-w-[180px] leading-snug">
                          Bonjour, je souhaiterais des informations pour un S+4 à la Résidence Farès.
                        </div>
                      </div>

                      {/* Mention story box */}
                      <div className="bg-pink-50 border border-pink-100 rounded-lg p-2 text-zinc-800 text-[8px] space-y-1">
                        <p className="text-pink-500 font-bold block leading-none">✨ A MENTIONNÉ VOTRE NOM DANS SA STORY :</p>
                        
                        {/* Realistic exposition booth card showing Soroubat signage */}
                        <div className="bg-white/95 rounded border border-pink-200 p-1 flex items-center space-x-1.5">
                          <div className="w-10 h-7 bg-indigo-900 rounded text-[5.5px] text-white flex flex-col justify-center items-center font-bold">
                            <span>SOUROBAT</span>
                            <span className="scale-75 text-[#D1A153]">FARÈS</span>
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-800 leading-none">Foire Immobilière 🇹🇳</p>
                            <p className="text-zinc-400 text-[6.5px]">Banners: Résidence les Alizées & Farès</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-zinc-900 p-1.5 rounded-2xl rounded-tl-none">
                          Je peux avoir des photos ?
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-zinc-900 p-1.5 rounded-2xl rounded-tl-none">
                          Et dans d&apos;autre résidence ?
                        </div>
                      </div>

                      {/* Premium internal finishes directory gallery (REAL CAPTURE DIRECT COPIES) */}
                      <div className="bg-white rounded-lg border border-zinc-200 p-1.5 max-w-[190px]">
                        <p className="text-[7px] text-[#D1A153] font-bold uppercase mb-1">📷 CATALOGUE PHOTOS CHANTIER ENVOYÉ :</p>
                        <div className="grid grid-cols-3 gap-1">
                          {/* Rendering high fidelity mock materials resembling real bathroom & tiles */}
                          <div className="h-6 rounded bg-gradient-to-tr from-stone-300 to-indigo-100 flex items-center justify-center text-[5.5px] font-bold text-zinc-700 border border-zinc-200 leading-none text-center">Sol Marbe</div>
                          <div className="h-6 rounded bg-gradient-to-tr from-slate-200 to-zinc-400 flex items-center justify-center text-[5.5px] font-bold text-zinc-700 border border-zinc-200 leading-none text-center">Cuisine</div>
                          <div className="h-6 rounded bg-gradient-to-tr from-stone-100 to-pink-50 flex items-center justify-center text-[5.5px] font-bold text-zinc-750 border border-zinc-200 leading-none text-center">Sanitaire</div>
                          <div className="h-6 rounded bg-gradient-to-tr from-zinc-300 to-zinc-500 flex items-center justify-center text-[5.5px] font-bold text-white border border-zinc-200 leading-none text-center">Hall S+2</div>
                          <div className="h-6 rounded bg-gradient-to-tr from-neutral-200 to-neutral-450 flex items-center justify-center text-[5.5px] font-bold text-zinc-800 border border-zinc-200 leading-none text-center">Plâtre</div>
                          <div className="h-6 rounded bg-gradient-to-tr from-blue-100 to-slate-200 flex items-center justify-center text-[5.5px] font-bold text-zinc-750 border border-zinc-200 leading-none text-center">Suite M</div>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] text-zinc-900 p-1.5 rounded-2xl rounded-tl-none">
                          Le prix du S+3 svp ?
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#CC00C9] text-white p-2 rounded-2xl rounded-tr-none space-y-0.5 max-w-[190px] text-[8.5px] leading-tight">
                          <p className="font-bold text-amber-200">💰 À partir de 714 000 DT TTC.</p>
                          <p>Superficie : 155,35 m²</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* KARIM MAGH CHANTIER AND FLOOR */}
                  {slide19SentCount === 4 && (
                    <>
                      {/* Photo verification bubble send */}
                      <div className="flex justify-start">
                        <div className="bg-[#E4E6EB] rounded-2xl p-1 max-w-[180px] border border-zinc-300">
                          {/* Img of polished marble floor mockup */}
                          <div className="w-full h-24 bg-gradient-to-br from-stone-100 via-neutral-100 to-amber-50 rounded-xl relative overflow-hidden flex flex-col justify-center items-center border border-zinc-200">
                            {/* Dialect text overlay watermark */}
                            <span className="text-zinc-650 font-mono text-[9px] font-bold select-all bg-white/70 px-1.5 py-0.5 rounded shadow-sm">+216 29 665 822</span>
                            <span className="text-[6.5px] text-zinc-400 absolute bottom-1">Finition Marbe Thala</span>
                          </div>
                          <div className="p-1 leading-none">
                            <p className="text-[8.5px] text-zinc-700 font-bold block">Soroubat Immobilier</p>
                            <span className="text-[6.5px] text-zinc-400">Facebook</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-[7.5px] text-zinc-400 font-mono my-1">
                        21 avr 2026, 20:15
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-[#0084FF] text-white p-2 rounded-2xl rounded-tr-none max-w-[190px] text-[8.5px] leading-relaxed space-y-0.5">
                          <p>Bonjour Karim ! Nous sommes très heureux de vous accueillir parmi nous.</p>
                          <p>Les S+2 surfaces disponibles de 112 m² jusqu&apos;à 123 m².</p>
                          <p className="font-bold text-amber-200">💰 Prix à partir de 515 000 DT TTC.</p>
                          <p className="text-[7.5px] text-zinc-200 font-mono">📱 WhatsApp: +216 29 665 822</p>
                        </div>
                      </div>
                    </>
                  )}

                </div>

                {/* Footer Messenger layout icons */}
                <div className="bg-white p-1 text-center border-t border-zinc-150 rounded-b-none relative flex items-center justify-between text-[8px] text-zinc-400 font-sans">
                  <div className="flex space-x-1.5 pl-1.5">
                    <span>➕</span>
                    <span>📷</span>
                    <span>🖼️</span>
                  </div>
                  <div className="bg-zinc-100 rounded-xl px-2 py-0.5 text-left text-zinc-500 flex-1 mx-1 text-[7px]">
                    {slide19SentCount === 0 && "Répondre dans Messenger..."}
                    {slide19SentCount === 1 && "Répondre au message..."}
                    {slide19SentCount === 2 && "Répondre sur Instagram..."}
                    {slide19SentCount === 3 && "Saisir un message..."}
                    {slide19SentCount === 4 && "Votre message..."}
                  </div>
                  <span className="pr-1">👍</span>
                </div>
              </div>

              {/* Verified Badge and status info */}
              <div className="mt-2 text-center text-[9px] font-mono text-[#D1A153] bg-[#D1A153]/5 px-4 py-1.5 rounded-xl border border-[#D1A153]/20 w-full max-w-[280px]">
                🚀 <strong className="font-bold">CONVERSION DIRECTE VALIDÉE</strong>
                <p className="text-[8px] text-stone-400 font-sans mt-0.5">La véracité du projet s&apos;impose sur les canaux chantiers.</p>
              </div>
            </div>

            {/* Right Column: Quantitative and Qualitative Analysis */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
              {/* Core metrics for selected lead */}
              <div className="bg-[#122240] border border-white/5 p-4 rounded-2xl flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="border-b border-[#D1A153]/25 pb-1.5 mb-2.5">
                    <span className="text-[8.5px] font-mono text-[#D1A153] uppercase block font-bold leading-none">
                      {slide19SentCount === 0 && "FICHE DE CONVERSION 01"}
                      {slide19SentCount === 1 && "FICHE DE CONVERSION 02"}
                      {slide19SentCount === 2 && "FICHE DE CONVERSION 03"}
                      {slide19SentCount === 3 && "FICHE DE CONVERSION 04"}
                      {slide19SentCount === 4 && "FICHE DE CONVERSION 05"}
                    </span>
                    <h3 className="text-sm font-bold text-white font-display mt-1">
                      {slide19SentCount === 0 && "L'Obstacle Clé Prix"}
                      {slide19SentCount === 1 && "La Redirection S+2"}
                      {slide19SentCount === 2 && "Ventes Épuisées S+1"}
                      {slide19SentCount === 3 && "Visite Immersive 3D"}
                      {slide19SentCount === 4 && "Preuve de Solidité"}
                    </h3>
                  </div>

                  <div className="space-y-2 text-[11px] text-stone-300">
                    {slide19SentCount === 0 && (
                      <>
                        <p className="leading-relaxed">Le lead de <strong className="text-white">Samia (Lyon)</strong> démontre l&apos;exigence de l&apos;obtention de la tarification au m².</p>
                        <ul className="space-y-1 text-[10px] text-stone-450 pl-2">
                          <li>• <strong className="text-[#D1A153]">Intention d&apos;achat :</strong> Immédiat</li>
                          <li>• <strong className="text-[#D1A153]">Diagnostic :</strong> Préfère WhatsApp</li>
                          <li>• <strong className="text-[#D1A153]">Action :</strong> Appel d&apos;engagement d&apos;un S+2</li>
                        </ul>
                      </>
                    )}
                    {slide19SentCount === 1 && (
                      <>
                        <p className="leading-relaxed"><strong>Bochra Mel</strong> illustre le processus de réorientation immédiate face à la pénurie complète du produit S+1.</p>
                        <ul className="space-y-1 text-[10px] text-stone-450 pl-2">
                          <li>• <strong className="text-[#D1A153]">Ciblage :</strong> Allemand (TRE)</li>
                          <li>• <strong className="text-[#D1A153]">Diagnostic :</strong> S+1 indisponible</li>
                          <li>• <strong className="text-[#D1A153]">Action :</strong> Proposition d&apos;un S+2 m² TTC</li>
                        </ul>
                      </>
                    )}
                    {slide19SentCount === 2 && (
                      <>
                        <p className="leading-relaxed"><strong>Najet</strong> est un cas exceptionnel d&apos;entrée de lead vocal non décroché, suivi d&apos;une conversion de messagerie.</p>
                        <ul className="space-y-1 text-[10px] text-stone-450 pl-2">
                          <li>• <strong className="text-[#D1A153]">Format :</strong> Message direct vocal</li>
                          <li>• <strong className="text-[#D1A153]">Tarif délivré :</strong> 4600 DT le m²</li>
                          <li>• <strong className="text-[#D1A153]">Résultat :</strong> Pipeline de négociation</li>
                        </ul>
                      </>
                    )}
                    {slide19SentCount === 3 && (
                      <>
                        <p className="leading-relaxed"><strong>Lobna L. (Diaspora)</strong> témoigne du poids absolu des images authentiques de construction pour rassurer les TRE.</p>
                        <ul className="space-y-1 text-[10px] text-stone-450 pl-2">
                          <li>• <strong className="text-[#D1A153]">Élément de foi :</strong> Marbre, Hall</li>
                          <li>• <strong className="text-[#D1A153]">Valeur S+3 :</strong> 714 000 DT TTC</li>
                          <li>• <strong className="text-[#D1A153]">Impact :</strong> Confiance à 100% à distance</li>
                        </ul>
                      </>
                    )}
                    {slide19SentCount === 4 && (
                      <>
                        <p className="leading-relaxed">Le contact de <strong>Karim Magh</strong> illustre le partage de photo directe du marbre thala pour asseoir le standing de la résidence.</p>
                        <ul className="space-y-1 text-[10px] text-stone-450 pl-2">
                          <li>• • <strong className="text-[#D1A153]">Vérification :</strong> Standing Premium</li>
                          <li>• • <strong className="text-[#D1A153]">Origine :</strong> Diaspora (TRE)</li>
                          <li>• • <strong className="text-[#D1A153]">Téléphone :</strong> +216 29 665 822</li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-[#D1A153]/10 p-2.5 rounded-xl text-[10.5px]/relaxed text-[#D1A153] border border-[#D1A153]/15">
                  <strong>💡 Analyse Commerciale</strong>
                  <p className="text-zinc-350 text-[9.5px]/tight mt-0.5">
                    {slide19SentCount === 0 && "La disponibilité d'un lien Google Maps qualifié et de la brochure PDF réduit de 85% le temps de signature pour la diaspora."}
                    {slide19SentCount === 1 && "La vélocité d&apos;accueil et la transparence des prix (4500-4600 DT/m²) préviennent la perte de confiance caractéristique des clients TRE."}
                    {slide19SentCount === 2 && "L'annonce que les S+1 sont épuisés accélère l&apos;arbitrage d&apos;achat vers les typologies S+2, perçues comme opportunités."}
                    {slide19SentCount === 3 && "Le fait de pouvoir consulter un ensemble de photos de finitions (marbre, plâtre) lève l&apos;inquiétude de l&apos;achat sur plan de l&apos;étranger."}
                    {slide19SentCount === 4 && "Afficher le numéro tunisien de référence (+216 29 665 822) directement sur les photos d&apos;avancement garantit la propriété de la marque."}
                  </p>
                </div>
              </div>

              {/* Conversion Statistics Card */}
              <div className="bg-black/40 border border-white/5 p-3 rounded-2xl text-center space-y-1 text-xs">
                <span className="text-[8.5px] font-mono text-zinc-500 uppercase block leading-none">Indice d&apos;Efficacité Commerciale</span>
                <strong className="text-xl font-bold font-mono text-emerald-400 block tracking-tight">CPL : ~5,20 €</strong>
                <p className="text-[9.5px] text-zinc-400 leading-none">Coût d&apos;acquisition Lead Qualifié</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 20. TEST DE PERFORMANCE SPONSORISÉ (SLIDE 20) */}
      {currentSlide.id === "slide-20" && (
        <div className="space-y-4 py-2 text-xs">
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {currentSlide.data.keyKPIs.map((k: any) => (
              <div key={k.label} className="bg-[#122240] border border-white/5 p-3 rounded-xl text-center shadow">
                <span className="text-[9px] text-white/40 uppercase block font-mono">{k.label}</span>
                <span className="text-xl font-mono font-extrabold text-[#D1A153] block my-1">{k.value}</span>
                <span className="text-[9px] text-green-400 font-bold block">{k.change}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left side: Demographics + Acquisition stacked */}
            <div className="md:col-span-5 space-y-3.5 flex flex-col justify-between">
              {/* Demographics */}
              <div className="bg-[#122240] p-3.5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] text-white/40 uppercase block border-b border-white/10 pb-1 font-bold">Fiche Démographie de la Diaspora</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-white/40 block text-[8.5px]">DIASPORA CIBLE :</span>
                    <strong className="text-[#D1A153] font-bold">{currentSlide.data.profilAudience.diaspora}</strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[8.5px]">GOUVERNORAT MAX :</span>
                    <strong className="text-white">{currentSlide.data.profilAudience.mainCity}</strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[8.5px]">CŒUR D'ÂGE SECTORIEL :</span>
                    <strong className="text-white font-mono">{currentSlide.data.profilAudience.ageGroup}</strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[8.5px]">GENRE DE COUVERTURE :</span>
                    <strong className="text-white">{currentSlide.data.profilAudience.gender}</strong>
                  </div>
                </div>
              </div>

              {/* Engagement list (No scrollbars) */}
              <div className="bg-[#122240] p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-white/40 uppercase block border-b border-white/10 pb-0.5 font-bold">Bilan de l'Acquisition (Sponsors Ads)</span>
                <div className="space-y-1 text-[11px]">
                  {currentSlide.data.engagementMetrics.map((met: any) => (
                    <div key={met.label} className="flex justify-between items-center border-b border-white/5 pb-0.5">
                      <span className="text-[#D1A153] text-[10.5px]">{met.label} :</span>
                      <div className="font-mono text-[10.5px] space-x-1 flex">
                        <strong className="text-white">{met.count}</strong>
                        <span className="text-green-400">({met.pct})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: High Fidelity Meta Pixel Conversion Capture System (No interaction clicks, fully rendered data logs) */}
            <div className="md:col-span-7 bg-[#122240] border border-[#D1A153]/35 p-4 rounded-xl flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <div className="flex items-center space-x-2 relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-[10px] text-white font-bold font-mono tracking-wider">CAPTEUR DE CONVERSION META PIXEL</span>
                </div>
                <span className="text-[8.5px] font-mono text-[#D1A153] tracking-widest uppercase font-bold bg-[#D1A153]/10 px-2 py-0.5 rounded border border-[#D1A153]/20">ID: PX-83294323-TN</span>
              </div>

              {/* Event stats counts */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs mb-3">
                <div className="bg-black/30 p-2.5 rounded border border-white/5 flex flex-col justify-between">
                  <span className="text-[9px] text-[#D1A153] block uppercase font-mono font-semibold">Conversations (WhatsApp)</span>
                  <span className="text-xl font-mono font-black text-white block my-1 font-bold">
                    114 Conversions
                  </span>
                  <span className="text-[8px] text-emerald-400 font-mono">Event: ContactStarted ✔</span>
                </div>
                <div className="bg-black/30 p-2.5 rounded border border-white/5 flex flex-col justify-between">
                  <span className="text-[9px] text-[#D1A153] block uppercase font-mono font-semibold">Prospects Qualifiés (Formulaires)</span>
                  <span className="text-xl font-mono font-black text-white block my-1 font-bold">
                    48 Formulaires
                  </span>
                  <span className="text-[8px] text-emerald-400 font-mono">Event: LeadFormSubmit ✔</span>
                </div>
              </div>

              {/* Simulation logs list */}
              <div className="bg-black/50 p-2.5 rounded border border-white/5 text-[9.5px]/relaxed font-mono space-y-1">
                <div className="text-white/40 block mb-1">LOG DE TÉLÉMÉTRIE D'ÉVÉNEMENTS (TEMPS RÉEL SANS DEFILEMENT) :</div>
                <div className="flex justify-between items-center text-emerald-400 border-b border-white/5 pb-0.5">
                  <span>✔ Event 'LeadFormSubmit' captured</span>
                  <span className="text-white/40 font-light">Status: SUCCESS (18:35:55)</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 border-b border-white/5 pb-0.5">
                  <span>✔ Event 'ContactStarted' captured</span>
                  <span className="text-white/40 font-light">Status: SUCCESS (18:35:10)</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 border-b border-white/5 pb-0.5">
                  <span>✔ Event 'LeadFormSubmit' captured</span>
                  <span className="text-white/40 font-light">Status: SUCCESS (18:34:39)</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 border-b border-white/5 pb-0.5">
                  <span>✔ Event 'ContactStarted' captured</span>
                  <span className="text-white/40 font-light">Status: SUCCESS (18:34:02)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 21. ANALYSE COMPARATIVE (SLIDE 21) */}
      {currentSlide.id === "slide-21" && (
        <div className="space-y-4 py-2">
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-black/25">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.08] text-[#D1A153] font-mono">
                  <th className="p-3">Réseau Social / Canal</th>
                  <th className="p-3">Indicateur de Performance</th>
                  <th className="p-3">Avant (État Initial)</th>
                  <th className="p-3">Après (Modernisation)</th>
                  <th className="p-3">Croissance Mesurable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {currentSlide.data.beforeAfter.map((r: any, idx: number) => (
                  <tr key={idx} className="hover:bg-white/[0.01]">
                    <td className="p-3 font-semibold text-white uppercase font-display">{r.platform}</td>
                    <td className="p-3 text-white/70 font-light">{r.indicator}</td>
                    <td className="p-3 font-mono text-white/50">{r.before}</td>
                    <td className="p-3 font-mono text-white font-semibold">{r.after}</td>
                    <td className="p-3 font-mono text-green-400 font-bold flex items-center space-x-1">
                      <span>{r.evol}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#D1A153]/5 border border-[#D1A153]/20 p-3 rounded-lg text-xs text-amber-100 font-sans text-center">
            <strong>Bilan de la Transformation :</strong> « {currentSlide.data.bilanSynthese} »
          </div>
        </div>
      )}

      {/* 22. RECOMMANDATIONS STRATEGIQUES (SLIDE 22) */}
      {currentSlide.id === "slide-22" && (
        <div className="space-y-3 py-2 text-xs">
          <span className="text-[10px] text-white/40 uppercase block font-mono">Feuille de route pour pérenniser l'intégration digitale :</span>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {currentSlide.data.recommendations.map((rec: any, idx: number) => (
              <div
                key={idx}
                className="bg-[#122240] border border-white/5 hover:border-[#D1A153]/45 p-3.5 rounded-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start border-b border-white/10 pb-1">
                    <span className="text-[9px] font-mono font-bold text-[#D1A153]">RECOM {idx + 1}</span>
                    <span className="text-green-400 font-semibold text-[10px]">✔</span>
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-tight font-display leading-snug">{rec.title}</h4>
                  <p className="text-[10.5px] text-white/55 font-sans leading-tight font-light">{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 23. CONCLUSION GENERALE (SLIDE 23) */}
      {currentSlide.id === "slide-23" && (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentSlide.data.accomplissements.map((acc: any, idx: number) => (
              <div key={idx} className="bg-[#122240] border border-[#D1A153]/20 p-4 rounded-xl hover:border-[#D1A153]/35 transition-all text-center flex flex-col justify-between">
                <span className="text-[9px] font-mono text-[#D1A153] uppercase font-bold block mb-1">PROGRES CRITÈRE {idx + 1}</span>
                <strong className="text-xs text-white uppercase tracking-tight block font-display mb-1">{acc.label}</strong>
                <p className="text-xs text-white/60 mt-1 leading-relaxed font-sans font-light">{acc.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#D1A153]/15 via-[#D1A153]/10 to-transparent border-y border-[#D1A153]/20 p-4 rounded-xl text-center relative overflow-hidden">
            <h3 className="text-md md:text-lg font-display font-extrabold text-white uppercase tracking-widest block">
              « {currentSlide.data.cloture} »
            </h3>
          </div>
        </div>
      )}

    </div>
  );
}
