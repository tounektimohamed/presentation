import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Volume2,
  VolumeX,
  NotebookText,
  LayoutDashboard,
  Presentation,
  Calculator,
  TrendingUp,
  Target,
  Users,
  Award,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Search,
  Share2,
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
  TrendingDown,
  Info,
  Building,
  Check,
  PhoneCall,
  Laptop,
  ArrowRight,
  HelpCircle,
  Minimize2
} from "lucide-react";
import { SECTIONS, SLIDES, Slide, Section } from "./data/slidesData";
import SlideTemplates from "./components/SlideTemplates";

export default function App() {
  // State variables
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"slides" | "dashboard" | "calculator">("slides");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpeakingNotes, setShowSpeakingNotes] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge" | "xxlarge" | "giant">("large");

  // ROI Calculator states
  const [calcBudget, setCalcBudget] = useState(100);

  // Slide 4 SVG Pie Chart Active Segment
  const [activePieSegment, setActivePieSegment] = useState<number | null>(null);

  // Slide 7 Qualitative interview active note
  const [activeInterviewNod, setActiveInterviewNod] = useState(0);

  // Slide 10 Simulated mobile phone reel toggle
  const [currentPhoneMock, setCurrentPhoneMock] = useState(0);

  // Slide 9 editorial calendar filtered day
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<string>("Lundi");

  // New Presentation States
  const [slide4Activity, setSlide4Activity] = useState(0);
  const [slide5SupplierTab, setSlide5SupplierTab] = useState<"interne" | "externe">("interne");
  const [slide10OpenQuestion, setSlide10OpenQuestion] = useState<number | null>(null);
  const [slide14Month, setSlide14Month] = useState<"mars" | "avril" | "mai">("mars");
  const [slide17Video, setSlide17Video] = useState(0);
  const [slide19SentCount, setSlide19SentCount] = useState(0);
  const [slide19ChatReplies, setSlide19ChatReplies] = useState<string[]>([]);

  // Speech synthesis reference
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const presentationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopSpeaking();
    };
  }, []);

  // Autoplay handler
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        handleNextSlide();
      }, 8000); // 8 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlideIndex]);

  const currentSlide = SLIDES[currentSlideIndex];
  const currentSection = SECTIONS.find((s) => s.id === currentSlide.sectionId);

  // Slide navigation
  const handlePrevSlide = () => {
    stopSpeaking();
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1));
  };

  const handleNextSlide = () => {
    stopSpeaking();
    setCurrentSlideIndex((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0));
  };

  const handleJumpToSlide = (index: number) => {
    stopSpeaking();
    setCurrentSlideIndex(index);
    if (viewMode !== "slides") setViewMode("slides");
  };

  const handleJumpToSection = (sectionId: string) => {
    stopSpeaking();
    const index = SLIDES.findIndex((s) => s.sectionId === sectionId);
    if (index !== -1) {
      setCurrentSlideIndex(index);
    }
    if (viewMode !== "slides") setViewMode("slides");
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === "slides") {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault();
          handleNextSlide();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrevSlide();
        } else if (e.key.toLowerCase() === "f") {
          e.preventDefault();
          toggleFullscreen();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlideIndex, viewMode, isFullscreen]);

  // Speaking voice synthesize functionality (Text to Speech)
  const toggleSpeaking = () => {
    if (!synthRef.current) {
      // Browser doesn't support speech synthesis
      alert("Votre navigateur ne prend pas en charge la synthèse vocale.");
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
    } else {
      stopSpeaking();
      const textToSpeak = currentSlide.speakingNotes;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "fr-FR";
      utterance.rate = 1.05;

      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      utterRef.current = utterance;
      setIsSpeaking(true);
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  };

  // Coût par Lead & metrics calculator computation helpers
  const calculateMetrics = (budget: number) => {
    // Baseline: 34.78€ -> 51,000 views, 232 leads, CPA = 0.15€
    const cpaBaseline = 0.15;
    const viewsBaselineRatio = 51000 / 34.78; // approx 1466 views/€
    
    const views = Math.round(budget * viewsBaselineRatio);
    const leads = Math.round(budget / cpaBaseline);
    
    // Average premium apartment price in Tunisia approx 380,000 DT (or ~115,000€)
    // Conversion lead -> sale conservative estimate (e.g. 0.5% lead to signed contract)
    const projectedSalesVal = Math.floor(leads * 0.01); 
    const turnoverProjected = projectedSalesVal * 380000;

    return {
      views,
      leads,
      convertedClients: projectedSalesVal,
      turnoverProjected
    };
  };

  const currentCalcMetrics = calculateMetrics(calcBudget);

  // Full screen toggle with native HTML5 & smart CSS fallback
  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      const elem = presentationContainerRef.current;
      if (elem) {
        try {
          if (elem.requestFullscreen) {
            await elem.requestFullscreen();
          } else if ((elem as any).webkitRequestFullscreen) {
            await (elem as any).webkitRequestFullscreen();
          } else if ((elem as any).msRequestFullscreen) {
            await (elem as any).msRequestFullscreen();
          }
        } catch (err) {
          console.warn("Native fullscreen request blocked or unsupported, falling back to CSS fullscreen:", err);
        }
      }
    } else {
      setIsFullscreen(false);
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      } catch (err) {
        console.warn("Failed to exit native fullscreen:", err);
      }
    }
  };

  // Synchronize state with native fullscreen mode events (e.g., ESC key press)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyNativeFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      if (!isCurrentlyNativeFullscreen && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, [isFullscreen]);

  // Filter slides by search query
  const filteredSlides = SLIDES.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.subtitle && s.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.speakingNotes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-navy-deep text-slate-100 font-sans flex flex-col selection:bg-gold-brand selection:text-navy-deep antialiased overflow-x-hidden">
      
      {/* FLOATING NAVIGATION FOR PRESENTATION MODE */}
      {viewMode === "slides" && !isFullscreen && (
        <div className="fixed top-4 right-4 z-50 bg-navy-dark/95 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex flex-wrap items-center gap-2.5 sm:space-x-3 shadow-2xl animate-fade-in">
          <span className="text-[10px] font-bold text-gold-brand uppercase tracking-wider font-mono hidden lg:inline mr-1">
            SOROUBAT IMMOBILIER
          </span>
          <span className="text-white/25 hidden lg:inline">|</span>
          <button
            onClick={() => {
              setViewMode("slides");
              stopSpeaking();
            }}
            className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gold-brand text-navy-deep shadow-md transition-all duration-200 cursor-pointer"
          >
            Diapositives
          </button>
          <button
            onClick={() => {
              setViewMode("dashboard");
              stopSpeaking();
            }}
            className="px-2.5 py-0.5 text-xs font-medium rounded-full text-white/70 hover:text-white hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
          >
            Rapport Global
          </button>
          <button
            onClick={() => {
              setViewMode("calculator");
              stopSpeaking();
            }}
            className="px-2.5 py-0.5 text-xs font-medium rounded-full text-white/70 hover:text-white hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
          >
            Simulateur ROI
          </button>
          
          <span className="text-white/20">|</span>
          <button
            onClick={() => setShowSpeakingNotes(!showSpeakingNotes)}
            className={`px-2.5 py-0.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
              showSpeakingNotes
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "text-white/50 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {showSpeakingNotes ? "Notes ✓" : "Notes"}
          </button>
          <span className="text-white/20">|</span>
          <div className="flex items-center bg-black/45 rounded-full px-1.5 py-0.5 border border-white/5 space-x-1">
            <span className="text-[9px] text-white/40 uppercase font-mono px-1">Texte</span>
            <button
              onClick={() => setTextSize("normal")}
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                textSize === "normal"
                  ? "bg-amber-500/20 text-gold-brand font-bold border border-gold-brand/20"
                  : "text-white/50 hover:text-white"
              }`}
              title="Taille Normale"
            >
              A
            </button>
            <button
              onClick={() => setTextSize("large")}
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                textSize === "large"
                  ? "bg-gold-brand text-navy-deep font-bold"
                  : "text-white/50 hover:text-white"
              }`}
              title="Grande Taille (Défaut)"
            >
              A+
            </button>
            <button
              onClick={() => setTextSize("xlarge")}
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                textSize === "xlarge"
                  ? "bg-amber-500/20 text-gold-brand font-bold border border-gold-brand/30"
                  : "text-white/50 hover:text-white"
              }`}
              title="Très Grande Taille"
            >
              A++
            </button>
            <button
              onClick={() => setTextSize("xxlarge")}
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                textSize === "xxlarge"
                  ? "bg-amber-500/30 text-gold-brand font-bold border border-gold-brand/40"
                  : "text-white/50 hover:text-white"
              }`}
              title="Taille Maximale"
            >
              A3+
            </button>
            <button
              onClick={() => setTextSize("giant")}
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                textSize === "giant"
                  ? "bg-emerald-500/30 text-emerald-400 font-bold border border-emerald-500/40"
                  : "text-white/50 hover:text-white"
              }`}
              title="Taille Géante (Giga)"
            >
              A4+ ⚡
            </button>
          </div>
        </div>
      )}

      {/* GLOBAL NOTIFICATION / HEADER BAR */}
      {viewMode !== "slides" && (
        <header className="bg-navy-dark border-b border-white/[0.08] px-4 py-3 sticky top-0 z-40 flex flex-wrap items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-white/[0.05] text-gold-brand transition-colors focus:ring-1 focus:ring-gold-brand focus:outline-none"
              title="Menu du plan"
              id="btn-sidebar-toggle"
            >
              <Layers className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-gold-brand/10 text-gold-brand px-2 py-0.5 rounded-full font-mono font-bold tracking-wider">
                  PROJET DE FIN D'ÉTUDES 2026
                </span>
                <span className="text-xs text-white/40 hidden md:inline">|</span>
                <span className="text-xs text-white/60 hidden md:inline font-semibold">
                  Siwar Gharbi & Wiem Ghariani
                </span>
              </div>
              <h1 className="text-sm md:text-md font-display font-semibold tracking-tight text-white flex items-center space-x-2 mt-0.5">
                <span>Présentation SOROUBAT</span>
                <span className="text-gold-brand/70 font-light">•</span>
                <span className="text-gold-brand font-light text-xs hidden sm:inline">L'Éveil Numérique</span>
              </h1>
            </div>
          </div>

          {/* TOP LEVEL NAVIGATION TOGGLES */}
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <div className="bg-black/30 p-1 rounded-lg flex space-x-1 border border-white/[0.05]">
              <button
                onClick={() => {
                  setViewMode("slides");
                  stopSpeaking();
                }}
                className={`flex items-center space-x-1.5 px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                  viewMode === "slides"
                    ? "bg-gold-brand text-navy-deep font-semibold shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                }`}
                id="mode-slides-tab"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Diapositives</span>
              </button>
              <button
                onClick={() => {
                  setViewMode("dashboard");
                  stopSpeaking();
                }}
                className={`flex items-center space-x-1.5 px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                  viewMode === "dashboard"
                    ? "bg-gold-brand text-navy-deep font-semibold shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                }`}
                id="mode-dashboard-tab"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Rapport Global</span>
              </button>
              <button
                onClick={() => {
                  setViewMode("calculator");
                  stopSpeaking();
                }}
                className={`flex items-center space-x-1.5 px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                  viewMode === "calculator"
                    ? "bg-gold-brand text-navy-deep font-semibold shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                }`}
                id="mode-calc-tab"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Simulateur ROI</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center space-x-2 bg-black/20 p-1 rounded-lg border border-white/[0.04]">
              <button
                onClick={() => setShowSpeakingNotes(!showSpeakingNotes)}
                className={`p-1.5 rounded-md text-xs flex items-center space-x-1 transition-colors ${
                  showSpeakingNotes ? "text-gold-brand bg-white/[0.06]" : "text-white/50 hover:text-white"
                }`}
                title="Afficher les notes de soutenance"
              >
                <NotebookText className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Notes</span>
              </button>
              <button
                onClick={toggleSpeaking}
                className={`p-1.5 rounded-md text-xs flex items-center space-x-1 transition-colors ${
                  isSpeaking ? "bg-red-500/10 text-red-400 animate-pulse" : "text-white/50 hover:text-white"
                }`}
                title={isSpeaking ? "Arrêter la lecture" : "Faire lire la diapositive par l'IA"}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="text-[10px] uppercase font-bold tracking-wider">Vocale</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* CORE WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* SIDEBAR: INTERACTIVE TABLE OF CONTENT PLAN */}
        {viewMode !== "slides" && (
          <aside
            className={`bg-navy-dark border-r border-white/[0.07] transition-all duration-300 flex flex-col shrink-0 z-30 ${
              sidebarOpen ? "w-80" : "w-0 -translate-x-full absolute lg:relative lg:w-0"
            }`}
          >
            {/* SEARCH SYSTEM */}
            <div className="p-4 border-b border-white/[0.07]">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-white/40">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une notion, chiffre..."
                  className="w-full bg-black/30 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 border border-white/10 focus:outline-none focus:border-gold-brand focus:ring-1 focus:ring-gold-brand"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-2 text-[10px] uppercase tracking-wider text-white/50 hover:text-white"
                  >
                    Vider
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              
              {/* SEARCH RESULTS */}
              {searchQuery ? (
                <div className="px-4 py-2">
                  <h3 className="text-[10px] font-bold text-gold-brand uppercase tracking-wider mb-2">
                    Résultats ({filteredSlides.length})
                  </h3>
                  {filteredSlides.length === 0 ? (
                    <p className="text-xs text-white/40 italic py-2">Aucune diapositive trouvée.</p>
                  ) : (
                    <div className="space-y-1">
                      {filteredSlides.map((slide) => {
                        const originIndex = SLIDES.findIndex((s) => s.id === slide.id);
                        return (
                          <button
                            key={slide.id}
                            onClick={() => handleJumpToSlide(originIndex)}
                            className="w-full text-left p-2 rounded-md hover:bg-white/[0.04] transition-all text-xs border border-transparent hover:border-white/[0.04]"
                          >
                            <div className="font-semibold text-white truncate">{slide.title}</div>
                            <div className="text-[9px] text-gold-brand/80 truncate font-mono">
                              Diapo {slide.slideNumber} • {SECTIONS.find((cs) => cs.id === slide.sectionId)?.title}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                // DEFAULT VIEW SECTIONS
                <div className="space-y-4 px-4 py-2">
                  <div>
                    <h3 className="text-[10px] font-bold text-gold-brand/60 uppercase tracking-widest pl-1 mb-2">
                      PLAN DE PRÉSENTATION
                    </h3>
                    <div className="space-y-1">
                      {SECTIONS.map((sec) => {
                        const isActiveSection = currentSlide.sectionId === sec.id;
                        const relatedSlidesIdx = SLIDES.flatMap((s, i) => s.sectionId === sec.id ? [i] : []);
                        const isCurrentSectionInFocus = relatedSlidesIdx.includes(currentSlideIndex);

                        return (
                          <div key={sec.id} className="rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleJumpToSection(sec.id)}
                              className={`w-full text-left p-2.5 rounded-md flex items-start space-x-2 transition-all duration-200 ${
                                isCurrentSectionInFocus && viewMode === "slides"
                                  ? "bg-white/[0.05] border-l-2 border-gold-brand pl-2 text-white"
                                  : "text-white/60 hover:text-white hover:bg-white/[0.02]"
                              }`}
                            >
                              <span className="text-[10px] bg-black/40 font-mono py-0.5 px-1.5 rounded text-gold-brand font-bold mt-0.5">
                                {sec.number}
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-semibold leading-snug tracking-tight block">
                                  {sec.title}
                                </span>
                              </div>
                            </button>

                            {/* NESTED SLIDES OF THIS SECTION */}
                            {isCurrentSectionInFocus && (
                              <div className="mt-1 ml-6 pl-2 border-l border-white/[0.05] space-y-1">
                                {SLIDES.map((s, idx) => {
                                  if (s.sectionId !== sec.id) return null;
                                  const isSelected = idx === currentSlideIndex && viewMode === "slides";
                                  return (
                                    <button
                                      key={s.id}
                                      onClick={() => handleJumpToSlide(idx)}
                                      className={`w-full text-left py-1 px-2 rounded text-xs transition-colors flex items-center space-x-1.5 ${
                                        isSelected
                                          ? "text-gold-brand font-medium bg-gold-brand/10"
                                          : "text-white/40 hover:text-white"
                                      }`}
                                    >
                                      <span className="w-1 h-1 rounded-full bg-current"></span>
                                      <span className="truncate">{s.title}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* INTERACTIVE COMPASS OR DATA RECALL BOX */}
                  <div className="bg-black/40 border border-white/[0.08] p-3 rounded-lg mt-4">
                    <span className="text-[9px] font-bold text-gold-brand tracking-wider block uppercase mb-1">
                      Coup d'œil Métriques
                    </span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="p-2 bg-navy-dark rounded border border-white/5">
                        <div className="text-[9px] text-white/40 uppercase">Budget Test</div>
                        <div className="text-xs font-bold text-white font-mono">34.78 €</div>
                      </div>
                      <div className="p-2 bg-navy-dark rounded border border-white/5">
                        <div className="text-[9px] text-white/40 uppercase">Leads SMM</div>
                        <div className="text-xs font-bold text-gold-brand font-mono">232 Leads</div>
                      </div>
                      <div className="p-2 bg-navy-dark rounded border border-white/5">
                        <div className="text-[9px] text-white/40 uppercase">Coût unitaire</div>
                        <div className="text-xs font-bold text-green-400 font-mono">0.15 € / Lead</div>
                      </div>
                      <div className="p-2 bg-navy-dark rounded border border-white/5">
                        <div className="text-[9px] text-white/40 uppercase">Total Vues</div>
                        <div className="text-xs font-bold text-white font-mono">51k+</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ACADEMIC INFOS FOOTER */}
            <div className="p-4 bg-black/20 border-t border-white/[0.06] text-center text-[10px] text-white/40 font-mono">
              CSFTAC Mégrine • PFE 2026
            </div>
          </aside>
        )}

        {/* CONTAINER WORKSPACE CORES */}
        <main className="flex-1 flex flex-col min-w-0 bg-navy-deep relative overflow-y-auto">
          
          {/* 1. SLIDES DECK PLAYING MODE */}
          {viewMode === "slides" && (
            <motion.div
              ref={presentationContainerRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={isFullscreen 
                ? "fixed inset-0 z-[100] bg-[#060b13] flex flex-col justify-between p-4 md:p-8 overflow-y-auto" 
                : "flex-1 flex flex-col justify-between p-4 md:p-8 pt-16 md:pt-20 max-w-6xl mx-auto w-full"}
            >
              
              {/* Slides Metadata & Section Indicator */}
              {!isFullscreen && (
                <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-3">
                  <div className="flex items-center space-x-2 text-xs text-white/50">
                    <span className="bg-white/[0.08] px-2 py-0.5 rounded font-mono font-bold text-gold-brand text-[10px]">
                      SECTION {currentSection?.number}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="font-display font-medium text-white/80">{currentSection?.title}</span>
                  </div>
                  <div className="text-xs font-mono font-medium text-gold-brand bg-gold-brand/10 px-2.5 py-1 rounded-full">
                    Diapositive {currentSlideIndex + 1} / {SLIDES.length}
                  </div>
                </div>
              )}

              {/* SLIDES CORE SCREEN: CUSTOM HIGH INTENSITY CARD RENDERS */}
              <div className={`flex-1 flex items-center justify-center relative ${isFullscreen ? "w-full max-w-7xl mx-auto h-[calc(100vh-140px)] min-h-[500px]" : "min-h-[460px]"}`}>
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 0.98, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`w-full bg-navy-dark border border-white/[0.08] p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between ${
                    isFullscreen ? "h-full flex-1 rounded-2xl p-8 md:p-12 border-white/10" : "rounded-xl"
                  } ${
                    textSize === "normal"
                      ? "slide-text-normal"
                      : textSize === "large"
                      ? "slide-text-large"
                      : textSize === "xlarge"
                      ? "slide-text-xlarge"
                      : textSize === "xxlarge"
                      ? "slide-text-xxlarge"
                      : "slide-text-giant"
                  }`}
                  style={{ minHeight: isFullscreen ? "auto" : "480px" }}
                >
                  {/* Decorative Tech BG grid lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  
                  {/* Gold branding highlight at top left */}
                  <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-gold-brand to-transparent" />

                  {/* HEADER CONTENT */}
                  <div className="relative z-10 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono text-gold-brand uppercase tracking-widest font-bold bg-gold-brand/10 border border-gold-brand/15 px-2.5 py-0.5 rounded shadow-sm">
                        Chapitre {currentSection?.number} : {currentSection?.title}
                      </span>
                      <span className="text-[10px] font-mono text-white/50 bg-white/[0.05] border border-white/5 px-2.5 py-0.5 rounded font-bold">
                        Diapositive {currentSlideIndex + 1} / {SLIDES.length}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white mb-2 leading-tight">
                      {currentSlide.title}
                    </h2>
                    {currentSlide.subtitle && (
                      <p className="text-xs md:text-sm text-white/50 max-w-3xl leading-relaxed">
                        {currentSlide.subtitle}
                      </p>
                    )}
                  </div>

                  {/* SLIDES INNER DYNAMIC TEMPLATE RENDERS */}
                  <SlideTemplates
                    currentSlide={currentSlide}
                    currentSlideIndex={currentSlideIndex}
                    handleJumpToSlide={handleJumpToSlide}
                    setViewMode={setViewMode}
                    setCalcBudget={setCalcBudget}
                  />

                  {/* SPEAKING NOTES */}
                  {showSpeakingNotes && currentSlide.speakingNotes && (
                    <div className="relative z-10 mt-4 bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <NotebookText className="w-4 h-4 text-amber-400" />
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                          Notes de Soutenance
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed font-sans font-light">
                        {currentSlide.speakingNotes}
                      </p>
                    </div>
                  )}

                  {/* CARD FOOTER */}
                  <div className="border-t border-white/[0.05] pt-3 mt-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-white/40">
                    <div className="flex items-center space-x-1.5 font-sans justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-brand animate-pulse" />
                      <span>SOROUBAT Immobilier • Mémoire de PFE</span>
                    </div>
                    <div className="flex items-center space-x-2 font-mono text-[10px] justify-center md:justify-end text-white/35">
                      <span>Diapo {currentSlideIndex + 1}</span>
                      <span>•</span>
                      <span>Ch. {currentSection?.number}</span>
                      <span>•</span>
                      <span>Siwar Gharbi & Wiem Ghariani</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* SLIDE PROGRESS CONTROLS HEADER BAR */}
              {!isFullscreen && (
                <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/[0.05] pt-4">
                  
                  {/* Dots indicator */}
                  <div className="flex flex-wrap items-center gap-1.5 order-2 md:order-1">
                    {SLIDES.map((slide, idx) => {
                      const isPassed = idx < currentSlideIndex;
                      const isSelected = idx === currentSlideIndex;
                      return (
                        <button
                          key={slide.id}
                          onClick={() => handleJumpToSlide(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isSelected
                              ? "w-8 bg-gold-brand"
                              : isPassed
                              ? "w-2 bg-gold-brand/40"
                              : "w-2 bg-white/10 hover:bg-white/30"
                          }`}
                          title={`Sauter à la diapo ${idx + 1}`}
                        />
                      );
                    })}
                  </div>

                  {/* Arrow navigation triggers */}
                  <div className="flex items-center space-x-3 order-1 md:order-2 self-end md:self-auto">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`p-2 rounded-lg border transition-all ${
                        isPlaying
                          ? "bg-gold-brand text-navy-deep border-gold-brand font-bold"
                          : "bg-black/30 text-white/70 border-white/15 hover:text-white"
                      }`}
                      title={isPlaying ? "Mettre l'autoplay en pause" : "Lancer le défilement automatique"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={handlePrevSlide}
                      className="p-2 rounded-lg bg-black/30 border border-white/15 text-white/70 hover:text-white hover:border-gold-brand/30 transition-all active:scale-95"
                      title="Précédent (Flèche gauche)"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <span className="text-xs font-mono text-white/50">{currentSlideIndex + 1} / {SLIDES.length}</span>
                    
                    <button
                      onClick={handleNextSlide}
                      className="p-2 rounded-lg bg-black/30 border border-white/15 text-white/70 hover:text-white hover:border-gold-brand/30 transition-all active:scale-95"
                      title="Suivant (Flèche droite / Espace)"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Text Zoom Controls */}
                    <div className="flex items-center space-x-1 bg-black/30 border border-white/15 rounded-lg p-1">
                      <span className="text-[9px] text-white/40 uppercase font-mono px-1.5">Texte</span>
                      <button
                        onClick={() => setTextSize("normal")}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          textSize === "normal"
                            ? "bg-gold-brand text-navy-deep font-bold"
                            : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                        }`}
                        title="Taille Normale"
                      >
                        A
                      </button>
                      <button
                        onClick={() => setTextSize("large")}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          textSize === "large"
                            ? "bg-gold-brand text-navy-deep font-bold"
                            : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                        }`}
                        title="Grande Taille (Défaut)"
                      >
                        A+
                      </button>
                      <button
                        onClick={() => setTextSize("xlarge")}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          textSize === "xlarge"
                            ? "bg-gold-brand text-navy-deep font-bold"
                            : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                        }`}
                        title="Très Grande Taille"
                      >
                        A++
                      </button>
                      <button
                        onClick={() => setTextSize("xxlarge")}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          textSize === "xxlarge"
                            ? "bg-gold-brand text-navy-deep font-bold"
                            : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                        }`}
                        title="Taille Maximale"
                      >
                        A3+
                      </button>
                      <button
                        onClick={() => setTextSize("giant")}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          textSize === "giant"
                            ? "bg-emerald-500 text-navy-deep font-bold"
                            : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                        }`}
                        title="Taille Géante"
                      >
                        A4+ ⚡
                      </button>
                    </div>

                    <button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-lg bg-black/30 border border-white/15 text-white/70 hover:text-white transition-all"
                      title="Plein écran diapo"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* TRANSLUCENT PREMIUM OVERLAY CONTROLS FOR FULLSCREEN MODE */}
              {isFullscreen && (
                <div className="fixed bottom-6 right-6 z-50 bg-navy-dark/95 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center space-x-3 shadow-2xl animate-fade-in opacity-40 hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={handlePrevSlide}
                    className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    title="Précédent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono text-white/60 font-semibold">{currentSlideIndex + 1} / {SLIDES.length}</span>
                  <button
                    onClick={handleNextSlide}
                    className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    title="Suivant"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  <span className="text-white/20">|</span>
                  <div className="flex items-center space-x-1 bg-black/40 rounded-full px-2 py-0.5 border border-white/5">
                    <span className="text-[9px] text-white/40 uppercase font-mono mr-1">Zoom</span>
                    <button
                      onClick={() => setTextSize("normal")}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                        textSize === "normal"
                          ? "bg-gold-brand text-navy-deep font-bold"
                          : "text-white/40 hover:text-white"
                      }`}
                      title="Taille Normale"
                    >
                      A
                    </button>
                    <button
                      onClick={() => setTextSize("large")}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                        textSize === "large"
                          ? "bg-gold-brand text-navy-deep font-bold"
                          : "text-white/40 hover:text-white"
                      }`}
                      title="Grande Taille (Défaut)"
                    >
                      A+
                    </button>
                    <button
                      onClick={() => setTextSize("xlarge")}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                        textSize === "xlarge"
                          ? "bg-gold-brand text-navy-deep font-bold"
                          : "text-white/40 hover:text-white"
                      }`}
                      title="Très Grande Taille"
                    >
                      A++
                    </button>
                    <button
                      onClick={() => setTextSize("xxlarge")}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                        textSize === "xxlarge"
                          ? "bg-gold-brand text-navy-deep font-bold"
                          : "text-white/40 hover:text-white"
                      }`}
                      title="Taille Maximale"
                    >
                      A3+
                    </button>
                    <button
                      onClick={() => setTextSize("giant")}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                        textSize === "giant"
                          ? "bg-emerald-500 text-navy-deep font-bold"
                          : "text-white/40 hover:text-white"
                      }`}
                      title="Taille Géante"
                    >
                      A4+ ⚡
                    </button>
                  </div>

                  <span className="text-white/20">|</span>
                  <button
                    onClick={toggleFullscreen}
                    className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    title="Quitter le plein écran"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </div>
              )}

            </motion.div>
          )}

          {/* 2. DIGITAL EXECUTIVE COMPREHENSIVE REPORT DASHBOARD VIEW */}
          {viewMode === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8"
            >
              
              {/* Dynamic Presentation Banner */}
              <div className="bg-navy-dark border border-white/[0.08] p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-brand/5 rounded-full filter blur-3xl pointer-events-none" />
                
                <span className="text-xs bg-gold-brand text-navy-deep font-bold px-2 py-1 rounded inline-block mb-3 font-mono tracking-widest">
                  DOCUMENT STRATÉGIQUE COMPLET D'ÉVALUATION SMM
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
                  Modernisation Digitale de SOROUBAT Immobilier
                </h2>
                <p className="text-xs md:text-sm text-white/60 max-w-4xl mt-2 leading-relaxed">
                  Ce tableau analytique de synthèse réunit l'ensemble des études, résultats, et modélisations formulées dans notre Projet de Fin d'Études. Il permet une lecture transverse immédiate des KPI de rentabilité.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-start space-x-3 bg-black/20 p-3 rounded-lg border border-white/5">
                    <Users className="w-5 h-5 text-gold-brand mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] text-white/40 uppercase font-mono tracking-wider">Élaboration PFE</span>
                      <span className="text-xs font-medium text-white block">Siwar Gharbi & Wiem Ghariani</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 bg-black/20 p-3 rounded-lg border border-white/5">
                    <Award className="w-5 h-5 text-gold-brand mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] text-white/40 uppercase font-mono tracking-wider">Institution</span>
                      <span className="text-xs font-medium text-white block">CSFTAC Mégrine</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 bg-black/20 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] text-white/40 uppercase font-mono tracking-wider">Validation ROI</span>
                      <strong className="text-xs font-bold text-green-400 block">232 Leads à 0,15 € CPA</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* REPORT PARTS SECTIONS ACCORDION CARDS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Part 1: Contexte & Paradoxe */}
                <div className="bg-navy-dark border border-white/[0.08] rounded-xl p-5 hover:border-gold-brand/20 transition-all">
                  <div className="flex items-center space-x-1.5 border-b border-white/15 pb-2.5 mb-3">
                    <span className="text-xs bg-gold-brand/10 text-gold-brand font-mono font-bold px-1.5 py-0.5 rounded">01 & 02</span>
                    <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">Contexte & Héritage</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-3">
                    Le groupe d'infrastructures physiques SOROUBAT, fort de 50 ans d'histoire et ses 11 000 salariés, souffre d'une invisibilité en ligne alarmante (-84% de présence). Avec une clientèle composée à 58.6% de TRE (Diaspora), un réveil digital s'avère stratégiquement vital.
                  </p>
                  <div className="bg-black/30 p-3 rounded text-[11px] font-mono grid grid-cols-2 gap-2 text-white/80">
                    <div>• Création : <strong>1974</strong></div>
                    <div>• Cap Social : <strong>~35 M DT</strong></div>
                    <div>• Filiales : <strong>16 Afrique</strong></div>
                    <div>• Position : <strong>Haut Standing</strong></div>
                  </div>
                </div>

                {/* Part 2: SWOT & Marché Clientèle */}
                <div className="bg-navy-dark border border-white/[0.08] rounded-xl p-5 hover:border-gold-brand/20 transition-all">
                  <div className="flex items-center space-x-1.5 border-b border-white/15 pb-2.5 mb-3">
                    <span className="text-xs bg-gold-brand/10 text-gold-brand font-mono font-bold px-1.5 py-0.5 rounded">03 & 04</span>
                    <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">Diagnostic de situation</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-3">
                    L'analyse montre une clientèle dépendante de l'étranger. Les services internes s'accordent à 100% sur l'urgence stratégique de vendre à distance via les réseaux sociaux pour contrer une concurrence locale féroce (Chaabane, SIMPAR, Essoukna).
                  </p>
                  <div className="bg-black/30 p-3 rounded text-[11px] font-mono flex justify-between items-center text-gold-brand">
                    <span>• Conscience interne : <strong>100%</strong></span>
                    <span>• Exploitation actuelle : <strong>10%</strong></span>
                  </div>
                </div>

                {/* Part 3: Objectifs & Stratégie */}
                <div className="bg-navy-dark border border-white/[0.08] rounded-xl p-5 hover:border-gold-brand/20 transition-all">
                  <div className="flex items-center space-x-1.5 border-b border-white/15 pb-2.5 mb-3">
                    <span className="text-xs bg-gold-brand/10 text-gold-brand font-mono font-bold px-1.5 py-0.5 rounded">05 & 06</span>
                    <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">Objectifs & Moteur SMM</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-3">
                    Le pivot stratégique met en place un calendrier éditorial (3 publications par semaine) et une charte graphique premium (Montserrat, Bleu Nuit, Or). L'utilisation de vidéos courtes ou format 'Réels' sur mobile (CapCut) capte de plein fouet l'attention des investisseurs.
                  </p>
                  <div className="bg-black/30 p-2.5 rounded text-[11px] font-mono text-white/80 flex items-center justify-between">
                    <span>Palette : Bleu Nuit, Beige, Or</span>
                    <span className="text-gold-brand font-bold">Réels = 48.3% Audience</span>
                  </div>
                </div>

                {/* Part 4: Les Résultats Chocs & Recommandations */}
                <div className="bg-navy-dark border border-white/[0.08] rounded-xl p-5 hover:border-gold-brand/20 transition-all">
                  <div className="flex items-center space-x-1.5 border-b border-white/15 pb-2.5 mb-3">
                    <span className="text-xs bg-gold-brand/10 text-gold-brand font-mono font-bold px-1.5 py-0.5 rounded">07 & 08</span>
                    <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">Résultats & Conclusion</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-3">
                    Avec un budget infime de 34.78 €, le ciblage Facebook Ads génère 232 leads qualifiés pour un CPA unitaire record de 0.15 €. Le plan d'urbanisme digital recommande de pérenniser cette dynamique en recrutant à temps plein un spécialiste de l'acquisition.
                  </p>
                  <div className="bg-black/30 p-2.5 rounded text-[11px] font-mono text-green-400 font-bold flex justify-between">
                    <span>CPA Moyen : 0,15 €</span>
                    <span>ROI Chiffre : 232 Prospects</span>
                  </div>
                </div>

              </div>

              {/* INTERACTIVE COMPARISON TAB SLIDER IN REPORT */}
              <div className="bg-navy-dark border border-white/[0.08] p-6 rounded-xl space-y-4">
                <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                  <span>📊 Analyse Comparative Avant vs Après Intervention</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* FACEBOOK STATS ROW */}
                  <div className="bg-black/20 border border-white/5 p-4 rounded-lg flex flex-col justify-between space-y-3">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-white/80">Canal Facebook (Abonnés)</span>
                      <span className="text-green-400 font-bold font-mono">+5.5% Croissance</span>
                    </div>
                    
                    {/* SVG mini-graph simulator */}
                    <div className="h-20 w-full bg-navy-deep rounded flex items-end p-2 border border-white/5">
                      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                        <path
                          d="M 5,35 L 50,32 L 95,5"
                          fill="none"
                          stroke="#D9B55E"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="5" cy="35" r="3.5" fill="#475569" />
                        <circle cx="95" cy="5" r="3.5" fill="#D9B55E" />
                        <text x="8" y="38" fill="#94a3b8" fontSize="6">Avant : 3600</text>
                        <text x="80" y="14" fill="#D9B55E" fontSize="6">Après : 3800</text>
                      </svg>
                    </div>
                  </div>

                  {/* INSTAGRAM STATS ROW */}
                  <div className="bg-black/20 border border-white/5 p-4 rounded-lg flex flex-col justify-between space-y-3">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-white/80">Canal Instagram (Abonnés)</span>
                      <span className="text-green-400 font-bold font-mono">+12.8% Croissance</span>
                    </div>

                    {/* SVG mini-graph simulator */}
                    <div className="h-20 w-full bg-navy-deep rounded flex items-end p-2 border border-white/5">
                      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                        <path
                          d="M 5,35 L 50,28 L 95,5"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="5" cy="35" r="3.5" fill="#475569" />
                        <circle cx="95" cy="5" r="3.5" fill="#10B981" />
                        <text x="8" y="38" fill="#94a3b8" fontSize="6">Avant : 737</text>
                        <text x="80" y="14" fill="#10B981" fontSize="6">Après : 831</text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-white/50 text-right font-mono italic">
                  *Statistiques calculées sur une période ferme d'évaluation publicitaire de 30 jours.
                </div>
              </div>

            </motion.div>
          )}

          {/* 3. INTERACTIVE ROI CALCULATOR SCREEN */}
          {viewMode === "calculator" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6"
            >
              
              <div className="bg-navy-dark border border-white/[0.08] p-6 rounded-2xl md:p-8 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                  <Calculator className="w-6 h-6 text-gold-brand" />
                  <div>
                    <h2 className="text-lg md:text-xl font-display font-bold text-white">
                      Simulateur Interactif de Budget & ROI Publicitaire
                    </h2>
                    <p className="text-xs text-white/50">
                      Entrez votre budget prévisionnel Meta Ads mensuel pour estimer les performances d'acquisition basées sur les données exactes du projet.
                    </p>
                  </div>
                </div>

                {/* Range Slider for Budget selection */}
                <div className="space-y-3 py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Budget d'Acquisition Mensuel :
                    </span>
                    <span className="text-2xl font-mono font-extrabold text-gold-brand">
                      {calcBudget} € / mois
                    </span>
                  </div>
                  
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    step="10"
                    value={calcBudget}
                    onChange={(e) => setCalcBudget(Number(e.target.value))}
                    className="w-full accent-gold-brand cursor-pointer focus:outline-none"
                    id="slider-roi-budget"
                  />
                  
                  <div className="flex justify-between text-[10px] text-white/40 font-mono">
                    <span>10 € (Test minimal)</span>
                    <span>100 € (Budget standard)</span>
                    <span>500 € (Campagne saisonnière)</span>
                    <span>2000 € (Budget annuel soutenu)</span>
                  </div>
                </div>

                {/* Computed output stats cards panel */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                  
                  {/* Metric 1 */}
                  <div className="bg-black/30 p-4 rounded-xl text-center border border-white/5 hover:border-gold-brand/30 transition-all">
                    <span className="text-[10px] text-white/40 uppercase block">Portée / Vues estimées</span>
                    <span className="text-xl font-mono font-extrabold text-white block mt-1">
                      {currentCalcMetrics.views.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-white/30 block">(Format vidéo immersif)</span>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-black/30 p-4 rounded-xl text-center border border-white/5 hover:border-gold-brand/30 transition-all">
                    <span className="text-[10px] text-white/40 uppercase block">Leads Qualifiés (CPA 0,15€)</span>
                    <span className="text-xl font-mono font-extrabold text-gold-brand block mt-1">
                      {currentCalcMetrics.leads.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-white/30 block">(Conversations initiées)</span>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-black/30 p-4 rounded-xl text-center border border-white/5 hover:border-gold-brand/30 transition-all">
                    <span className="text-[10px] text-white/40 uppercase block">Acquéreurs convertis (1%)</span>
                    <span className="text-xl font-mono font-extrabold text-green-400 block mt-1">
                      ~ {currentCalcMetrics.convertedClients}
                    </span>
                    <span className="text-[9px] text-white/30 block">(Taux standard bas)</span>
                  </div>

                  {/* Metric 4 */}
                  <div className="bg-black/30 p-4 rounded-xl text-center border border-white/5 hover:border-gold-brand/30 transition-all">
                    <span className="text-[10px] text-white/40 uppercase block">CA Généré Potentiel</span>
                    <span className="text-md font-mono font-extrabold text-white block mt-2">
                      {currentCalcMetrics.turnoverProjected.toLocaleString()} DT
                    </span>
                    <span className="text-[9px] text-white/30 block">(Sur un flat haut de gamme)</span>
                  </div>

                </div>

                <div className="bg-gold-light/5 border border-gold-brand/10 p-3 rounded-lg text-xs text-gold-light/90 italic flex items-start space-x-2">
                  <Info className="w-4 h-4 text-gold-brand shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Interprétation de la Simulation :</strong> À un coût d'acquisition de 0.15 € par prospect (comme validé par Siwar & Wiem durant la campagne de test en 2026), un budget mensuel même restreint de <strong>{calcBudget} €</strong> permet d'alimenter vos commerciaux avec <strong>{currentCalcMetrics.leads} prospects qualifiés</strong>. C'est la démonstration que le digital représente l'investissement le plus rentable et prévisible pour la promotion immobilière de standing.
                  </p>
                </div>

              </div>

              {/* CRM recommended pipeline diagram */}
              <div className="bg-navy-dark border border-white/[0.08] p-6 rounded-2xl shadow-xl space-y-3">
                <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  Transformation des Leads en Actes de Vente
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Le tunnel d'acquisition génère des prospects en messagerie. Voici la méthodologie recommandée pour maximiser le taux de fermeture des contrats :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs pt-2">
                  <div className="bg-black/30 p-3 rounded border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-gold-brand font-bold block">ÉTAPE 1</span>
                    <strong className="text-white block font-display">Réactivité Immédiate</strong>
                    <p className="text-white/50 text-[10.5px]">Réponse en moins de 15 minutes (Taux optimal 90%).</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-gold-brand font-bold block">ÉTAPE 2</span>
                    <strong className="text-white block font-display">Qualification Besoins</strong>
                    <p className="text-white/50 text-[10.5px]">Envoi de fiches techniques d'appartements ciblés S+2 / S+3.</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-gold-brand font-bold block">ÉTAPE 3</span>
                    <strong className="text-white block font-display">Rendez-vous à distance</strong>
                    <p className="text-white/50 text-[10.5px]">Appels vidéo réguliers et partage de la visite virtuelle 3D.</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-gold-brand font-bold block">ÉTAPE 4</span>
                    <strong className="text-white block font-display">Signature Acte</strong>
                    <p className="text-white/50 text-[10.5px]">Validation lors du retour de la diaspora (TRE) en période estivale.</p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </main>

      </div>

      {/* OVERALL FLOATING QUICK HELP POPUP */}
      {viewMode !== "slides" && (
        <footer className="bg-navy-dark py-3 px-4 text-center border-t border-white/[0.08] text-xs text-white/40 font-mono mt-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2 z-20">
          <div>
            © 2026 SOROUBAT Immobilier • Projet de Fin d'Études • Siwar Gharbi & Wiem Ghariani
          </div>
          <div className="flex items-center justify-center space-x-2 text-[11px] text-gold-brand/70 font-sans">
            <span>Clavier : Flèche Gauche / Droite pour naviguer</span>
            <span>•</span>
            <span>Soutenance validée par CSFTAC Mégrine</span>
          </div>
        </footer>
      )}

    </div>
  );
}
