export interface Slide {
  id: string;
  sectionId: string;
  slideNumber: number;
  title: string;
  subtitle?: string;
  speakingNotes: string;
  data?: any;
}

export interface Section {
  id: string;
  number: string;
  title: string;
  slidesCount: number;
}

export const SECTIONS: Section[] = [
  { id: "intro", number: "01", title: "Introduction & Présentation", slidesCount: 5 },
  { id: "diagnostic", number: "02", title: "Diagnostic & Étude Terrain", slidesCount: 6 },
  { id: "strategie", number: "03", title: "Stratégie Digitale & Plan d'Action", slidesCount: 6 },
  { id: "resultats", number: "04", title: "Résultats & Analyse Comparative", slidesCount: 5 },
  { id: "conclusion", number: "05", title: "Recommandations & Conclusion", slidesCount: 2 }
];

export const SLIDES: Slide[] = [
  // SECTION 01: INTRODUCTION & PRESENTATION (Slides 1 to 5)
  {
    id: "slide-1",
    sectionId: "intro",
    slideNumber: 1,
    title: "Amélioration de la Présence Digitale",
    subtitle: "du Groupe SOROUBAT Immobilier via les réseaux sociaux pour renforcer sa visibilité digitale.",
    speakingNotes: "Bonjour à tous les membres du jury. Nous sommes très heureuses de vous présenter ce projet de fin d'études mené par Siwar Gharbi et Wiem Ghariani, sous la direction académique de Mr. Aymen Ben Mne et l'encadrement professionnel de Mr. Sofien Gharbi, au sein du CSFTAC Mégrine, année 2026. L'objectif est d'insuffler une transformation de la présence sociale de SOROUBAT Immobilier.",
    data: {
      authors: ["Siwar Gharbi", "Wiem Ghariani"],
      promotion: "Projet de Fin de Formation — Année 2026",
      institution: "CSFTAC Mégrine",
      supervisors: {
        academic: "Mr Aymen Ben Mne",
        professional: "Mr Sofien Gharbi"
      },
      decorations: {
        republic: "République Tunisienne",
        pfeTag: "PFE 2026"
      }
    }
  },
  {
    id: "slide-2",
    sectionId: "intro",
    slideNumber: 2,
    title: "Plan de la Présentation",
    subtitle: "La structure logique de notre démarche académique et pratique.",
    speakingNotes: "Voici la structure de notre mémoire. Nous commencerons par l'introduction et contexte, suivie de la présentation de l'histoire du Groupe Soroubat. De là, nous aborderons le diagnostic de l'existante présence digitale, la problématique et nos objectifs, puis l'étude de perception interne que nous avons menée sur le terrain. Nous présenterons ensuite notre plan d'action stratégique, puis les résultats comparatifs réels de notre campagne test avant de terminer par nos recommandations.",
    data: {
      steps: [
        { num: "01", title: "Introduction & Contexte" },
        { num: "02", title: "Présentation du Groupe Soroubat" },
        { num: "03", title: "Diagnostic — Présence Digitale" },
        { num: "04", title: "Problématique & Objectifs" },
        { num: "05", title: "Étude de Perception Interne" },
        { num: "06", title: "Stratégie Digitale & Plan d'Action" },
        { num: "07", title: "Résultats & Analyse Comparative" },
        { num: "08", title: "Recommandations & Conclusion" }
      ]
    }
  },
  {
    id: "slide-3",
    sectionId: "intro",
    slideNumber: 3,
    title: "Introduction et Contexte",
    subtitle: "La communication en ligne, un levier incontournable du secteur immobilier.",
    speakingNotes: "Dans un environnement économique de plus en plus numérisé, les canaux sociaux constituent l'élément clé pour attirer la clientèle immobilière. Pour Soroubat, acteur hautement réputé, nous avons identifié une présence digitale historiquement insuffisante, se limitant à une page Facebook inactive et quasi-inexistante, ce qui pose une vulnérabilité face à des concurrents de plus en plus agressifs.",
    data: {
      contexte: "Dans un environnement économique de plus en plus digitalisé, la communication en ligne est devenue un levier incontournable pour les entreprises du secteur immobilier. Les réseaux sociaux constituent aujourd'hui un canal privilégié pour renforcer la notoriété, attirer de nouveaux clients et fidéliser une audience.",
      probleme_cle: "Le Groupe Soroubat Immobilier, acteur reconnu du secteur en Tunisie, dispose d'une présence digitale insuffisante : sa page Facebook reste inactive et sa communication en ligne est quasi inexistante, ce qui limite sa visibilité face à des concurrents de plus en plus actifs sur le plan numérique."
    }
  },
  {
    id: "slide-4",
    sectionId: "intro",
    slideNumber: 4,
    title: "Présentation du Groupe SOROUBAT",
    subtitle: "Un géant de la construction historique avec ses fondations solides depuis 1974.",
    speakingNotes: "Le Groupe SOROUBAT, fondé en 1974 par Mr. Noureddine Hachicha, est un des piliers majeurs du BTP en Tunisie avec une extension remarquable en Afrique. Fort de 1600 employés, un capital de 4 millions de dinars sur le secteur immobilier mais plus globalement avec une intégration de multiples branches comme les travaux publics, le béton prêt-à-l'emploi avec BEST BETON, et l'agriculture.",
    data: {
      signaletique: {
        founded: "1974",
        form: "SARL",
        employees: "1 600 employés",
        capital: "4 000 000 DT",
        hq: "Mégrine, Tunis",
        subsidiaries: "16 (Tunisie & Afrique)"
      },
      activities: [
        { title: "Travaux Publics", desc: "Routes, autoroutes, ponts, barrages — la force légendaire du groupe." },
        { title: "Immobilier & Bâtiments", desc: "Résidences, villas, locaux de prestige via Immo du Sud & Foncière Tunisienne." },
        { title: "Béton Préfabriqué", desc: "BEST BETON — matériaux de construction intégrés verticalement." },
        { title: "Agriculture", desc: "2 500 ha de domaines agricoles répartis sur 4 gouvernorats." },
        { title: "Présence Africaine", desc: "Filiales actives en Côte d'Ivoire, Bénin, Togo, Tchad, Cameroun..." }
      ]
    }
  },
  {
    id: "slide-5",
    sectionId: "intro",
    slideNumber: 5,
    title: "Fiche de Synthèse Stratégique",
    subtitle: "L'analyse consolidée des performances financières, clients et partenaires (2021-2025).",
    speakingNotes: "Voici la synthèse stratégique des activités immobilières. Nous observons un volume exceptionnel : le chiffre d'affaires a augmenté de +195% sur la période initiale avant de subir un creux d'activité de -50% en 2024 dû à la crise, pour clore l'année 2025 à 13,5 Millions de Dinars Tunisiens (DT). Ce chiffre représente un facteur de croissance globale de 9,3 fois. Notre clientèle est majoritairement représentée par la diaspora tunisienne (TRE) à 58,6%.",
    data: {
      chiffreAffaires: {
        growth1: "+195 %",
        growth1_desc: "Hausse du CA (2021 → 2022)",
        drop: "-50 %",
        drop_desc: "Creux d'activité (Année 2024)",
        total2025: "13,5 M DT",
        total2025_desc: "Chiffre d'Affaires 2025",
        factor: "×9,3",
        factor_desc: "Croissance totale sur 5 ans (2021-2025)"
      },
      clientele: [
        { label: "TRE — Tunisiens Résidents à l'Étranger", value: 58.6, warning: "Risque concentration : 58,6% TRE. Nécessité de diversifier vers la clientèle locale." },
        { label: "Investisseurs", value: 27.3 },
        { label: "TRT — Résidents Locaux", value: 14.1 }
      ],
      fournisseurs: {
        internes: ["Soroubat Bâtiments", "Best Béton", "SETT", "Carrières Groupe", "Division Fondations", "SOTAM / SOHAM"],
        externes: ["STUDI, SCET Tunisie", "Cabinets d'Architecture", "BCAT, Apave", "MASS H&H, Alufer", "Dorémail, Siceram", "IMMOTECH / CONCEPTLAB"]
      },
      concurrence: [
        { type: "Institutionnels", names: "SIMPAR — ESSOUKNA — SITS", intensity: "ÉLEVÉE", profile: "Haut standing — Grand Tunis — Cotés en bourse" },
        { type: "Groupes Familiaux", names: "Chaabane Imm. — Gloulou", intensity: "FORTE", profile: "BTP intégré, luxe & bureaux, archi tendance" },
        { type: "Promoteurs Locaux", names: "Diar El Melek — SPI", intensity: "MODÉRÉE", profile: "Ariana / Nord Tunis — présence agile" }
      ],
      avantage: "Intégration verticale + réputation historique solide + CA de 13,5 M DT en 2025."
    }
  },

  // SECTION 02: DIAGNOSTIC & ETUDE TERRAIN (Slides 6 to 11)
  {
    id: "slide-6",
    sectionId: "diagnostic",
    slideNumber: 6,
    title: "Diagnostic — Analyse SWOT",
    subtitle: "L'évaluation croisée de notre situation pour en extraire des recommandations.",
    speakingNotes: "Passons au diagnostic SWOT. Nos forces historiques résident dans notre intégration et notre grandissime notoriété. Néanmoins, l'absence absolue de visibilité digitale et le ralentissement des chantiers sont des faiblesses critiques. Nous avons l'immense opportunité de capter l'épargne de la diaspora tunisienne (TRE), en luttant contre la hausse des prix des matériaux de construction grâce à de meilleures campagnes.",
    data: {
      forces: [
        "Grande expérience BTP & immobilier",
        "Bonne réputation et image de marque historique",
        "Intégration complète : conception + construction",
        "16 filiales actives en Tunisie & Afrique"
      ],
      faiblesses: [
        "Absence remarquée sur les réseaux sociaux",
        "Prix de vente élevés des résidences de luxe",
        "Délais de réalisation parfois longs",
        "Faible visibilité digitale globale"
      ],
      opportunites: [
        "Forte demande de logements standing en Tunisie",
        "Investissements de la diaspora (TRE)",
        "Développement de nouveaux quartiers à forte valeur",
        "Expansion de la promotion immobilière en Afrique"
      ],
      menaces: [
        "Hausse continue du coût des matériaux",
        "Concurrence agressive : SIMPAR, SEGOR, Essoukna",
        "Baisse générale du pouvoir d'achat en local",
        "Instabilité économique globale"
      ]
    }
  },
  {
    id: "slide-7",
    sectionId: "diagnostic",
    slideNumber: 7,
    title: "Audit de la Présence sur Facebook",
    subtitle: "Bilan critique d'une page en plein déficit d'activité organique.",
    speakingNotes: "Notre page Facebook comptabilisait 3600 abonnés, mais souffrait d'une inactivité historique. Les statistiques de l'audit de départ montrent que 65,6% des vues sur les publications provenaient de non-abonnés, illustrant un immense potentiel d'acquisition. Malheureusement, l'activité irrégulière a causé une baisse drastique de -84% des vues totales, confirmant l'urgence d'une refonte.",
    data: {
      metrics: {
        followers: "3 600",
        followers_label: "Followers (Audience actuelle de base)",
        views: "7 010",
        views_change: "−84 % en baisse",
        views_desc: "Vues totales (Activité irrégulière)",
        non_subscribers: "65,6 %",
        non_subscribers_desc: "Non-abonnés (Audience externe intéressée)",
        subscribers: "34,4 %",
        subscribers_desc: "Abonnés fidèles"
      },
      formats: [
        { name: "Réels", value: 48.3, color: "#1E3A8A" },
        { name: "Photos", value: 44.6, color: "#D1A153" },
        { name: "Autres formats", value: 7.1, color: "#475569" }
      ],
      constats: [
        "Vues en forte baisse (-84%) causées par une activité irrégulière",
        "65,6% de l'audience constatée provient de personnes non-abonnées",
        "Les Réels et les Photos constituent les formats de prédilection prioritaires",
        "Nécessité vitale d'une stratégie digitale documentée et structurée"
      ]
    }
  },
  {
    id: "slide-8",
    sectionId: "diagnostic",
    slideNumber: 8,
    title: "Audit de la Présence sur Instagram",
    subtitle: "Une plateforme esthétique indispensable restée embryonnaire (@soroubat).",
    speakingNotes: "Sur Instagram, la situation était encore plus restrictive : seulement 737 abonnés, traduisant un déficit de notoriété. L'analyse des 30 derniers jours indique une portée globale modeste de 577 comptes atteints organiques, ce qui est très faible pour un promoteur immobilier haut standing. Le format dominant est d'ores et déjà le Réel à 53,9%, confirmant notre hypothèse vidéo.",
    data: {
      metrics: {
        followers: "737",
        followers_label: "Abonnés (Communauté ultra-modeste)",
        views: "3 012",
        views_desc: "Vues totales sur les 30 derniers jours",
        reach: "577",
        reach_desc: "Comptes atteints (Portée organique pure)",
        non_followers: "42,1 %",
        non_followers_desc: "Des vues viennent des non-abonnés"
      },
      table: [
        { indicator: "Abonnés", result: "737 abonnés", interpretation: "Base communautaire modeste — notoriété en développement", status: "Moyen" },
        { indicator: "Vues (30 jours)", result: "3 012 vues", interpretation: "Visibilité satisfaisante malgré un nombre d'abonnés limité", status: "Positif" },
        { indicator: "Comptes atteints", result: "577 comptes", interpretation: "Portée organique correcte — contenu valorisant", status: "Positif" },
        { indicator: "Vues hors abonnés", result: "42,1% des vues", interpretation: "La page parvient à intéresser de nouveaux utilisateurs extérieurs", status: "Fort" },
        { indicator: "Format dominant", result: "Réels — 53,9%", interpretation: "Les vidéos courtes génèrent le plus d'engagement", status: "Fort" }
      ]
    }
  },
  {
    id: "slide-9",
    sectionId: "diagnostic",
    slideNumber: 9,
    title: "Étude de Perception Interne : Méthodologie",
    subtitle: "Les fondements de l'entretien mené auprès des ressources humaines du groupe.",
    speakingNotes: "Pour appuyer notre démarche scientifique et académique, nous avons réalisé une étude qualitative approfondie. Nous avons interrogé les équipes commerciales et de promotion pour recueillir leur retour d'expérience concernant l'existant. L'objectif était de cartographier la perception interne de la marque.",
    data: {
      objectif: "Analyser la perception qu'ont les collaborateurs de la communication digitale actuelle et identifier les pistes d'amélioration prioritaires.",
      population: "Cadres commerciaux, chefs de projets immobiliers, chargés de clientèle et responsables administratifs de la promotion.",
      methode: "Entretiens semi-directifs individuels avec grilles d'évaluation sur 10 questions clés.",
      taille: "Échantillon représentatif de 12 professionnels en contact de vente direct."
    }
  },
  {
    id: "slide-10",
    sectionId: "diagnostic",
    slideNumber: 10,
    title: "Guide de l'Entretien & Questionnaire",
    subtitle: "Les questions soumises aux équipes commerciales de SOROUBAT.",
    speakingNotes: "Voici d'un côté le guide stratégique d'entretien et de l'autre les 10 questions clés que nous leur avons posées. Nous avons cherché à mesurer l'importance accordée au digital, les outils analysés et les obstacles qu'ils rencontrent tous les jours face aux prospects.",
    data: {
      raisons: [
        "Évaluer le niveau réel de la notoriété perçue sur le marché immobilier",
        "Identifier de nouvelles approches d'acquisition et de fidélisation",
        "Prendre des décisions de ciblage marketing basées sur des données fiables",
        "Faciliter le développement structuré sur les nouveaux réseaux (Instagram)",
        "Répondre avec précision aux attentes quotidiennes exprimées par les clients"
      ],
      questions: [
        "1. Quelle importance accordez-vous au marketing digital dans la stratégie globale de SOROUBAT ?",
        "2. Quels sont les principaux canaux digitaux utilisés actuellement par l'entreprise ?",
        "3. La présence actuelle sur les réseaux sociaux est-elle suffisante pour assurer une bonne visibilité ?",
        "4. Existe-t-il une stratégie de contenu claire pour les publications sur les réseaux sociaux ?",
        "5. Quels types de contenus sont généralement publiés sur les plateformes digitales ?",
        "6. Comment évaluez-vous l'interaction des internautes avec les publications ?",
        "7. Quels sont les principaux obstacles qui limitent l'efficacité du marketing digital ?",
        "8. L'entreprise utilise-t-elle des outils professionnels d'analyse des performances ?",
        "9. Quelles améliorations suggérez-vous pour renforcer la présence digitale ?",
        "10. Pensez-vous que le renforcement du digital peut amener de nouveaux acquéreurs ?"
      ]
    }
  },
  {
    id: "slide-11",
    sectionId: "diagnostic",
    slideNumber: 11,
    title: "Analyse des Réponses : Synthèse & Interprétation",
    subtitle: "Résultat détaillé de la grille de codage des entretiens (10 critères).",
    speakingNotes: "Voici la synthèse qualitative de nos entretiens. Les équipes sont conscientes de l'importance absolue du digital, mais soulignent l'anarchie de la présence actuelle. Ils notent l'usage passif de Facebook sans communication unifiée, l'absence de budget de sponsoring publicitaire, et regrettent l'absence totale d'outils analytiques modernes ou de CRM. Cependant, leur perception du potentiel reste excellente.",
    data: {
      rows: [
        { q: "1. Importance du digital", response: "Considéré comme le moteur principal de la notoriété immobilière future.", interpretation: "Forte prise de conscience des équipes mais absence d'exploitation stratégique." },
        { q: "2. Canaux actuels", response: "Usage éparpillé (FB, site web, Mubawab, Tayara...) sans coordination.", interpretation: "Présence multicanale passive et non structurée." },
        { q: "3. Suffisance visibilité", response: "Jugée unanimement insuffisante sur internet.", interpretation: "Manque cruel d'investissement publicitaire." },
        { q: "4. Stratégie contenu", response: "Partage sporadique de simples photos de chantiers prises au smartphone.", interpretation: "Stratégie non formalisée et absence de calendrier." },
        { q: "5. Types de contenus", response: "Annonces basiques, quelques visites 360° anciennes.", interpretation: "Contenus trop centrés sur la vente directe sans storytelling." },
        { q: "6. Interaction client", response: "Limitée à la réponse superficielle aux commentaires.", interpretation: "Gestion basique sans animation active." },
        { q: "7. Obstacles majeurs", response: "Concurrence féroce, méfiance des clients à distance, retard technologique.", interpretation: "Obstacles internes organisationnels et externes." },
        { q: "8. Outils de mesure", response: "Aucun outil professionnel (pas de Google Analytics, pas de CRM).", interpretation: "Absence de décisions guidées par la data." },
        { q: "9. Solutions suggérées", response: "Améliorer le design visuel, visite virtuelle moderne, budget publicitaire.", interpretation: "Volonté commerciale d'innovation esthétique." },
        { q: "10. Impact projeté", response: "Conviction que cela se traduira directement par un boom des ventes.", interpretation: "Adhésion commerciale totale aux nouvelles initiatives." }
      ]
    }
  },

  // SECTION 03: STRATEGIE DIGITALE & PLAN D'ACTION (Slides 12 to 17)
  {
    id: "slide-12",
    sectionId: "strategie",
    slideNumber: 12,
    title: "Problématique & Objectifs",
    subtitle: "Traduire notre diagnostic terrain en objectifs digitaux précis.",
    speakingNotes: "De cette étude découle notre problématique centrale : comment améliorer l'attractivité et l'acquisition clients de SOROUBAT via l'écosystème numérique ? Nous y répondons à travers 5 objectifs majeurs : renforcer l'autorité de la marque, optimiser les canaux, doper l'engagement, diversifier les contenus et générer du trafic qualifié pour nos vendeurs.",
    data: {
      problematique: "Comment améliorer la présence digitale du Groupe SOROUBAT Immobilier sur les réseaux sociaux afin d'en faire un cannal de promotion performant ?",
      objectifs: [
        { label: "Renforcer la Visibilité", desc: "Instaurer une présence digitale forte, esthétique, cohérente et régulière." },
        { label: "Optimiser les Canaux", desc: "Harmoniser et exploiter activement le réseau Meta (Facebook et Instagram) et l'emailing." },
        { label: "Développer l'Engagement", desc: "Augmenter l'incitation aux interactions et dialogues privés." },
        { label: "Diversifier les Contenus", desc: "Proposer de la valeur ajoutée : guides, témoignages, coulisses." },
        { label: "Générer du Trafic Qualifié", desc: "Générer des leads qualifiés à des coûts hautement compétitifs grâce à la publicité." }
      ]
    }
  },
  {
    id: "slide-13",
    sectionId: "strategie",
    slideNumber: 13,
    title: "La Nouvelle Stratégie Digitale",
    subtitle: "Les 6 axes complémentaires de notre plan d'action opérationnel.",
    speakingNotes: "Pour surmonter ces faiblesses, nous avons développé une vision articulée autour de 6 piliers : le calendrier éditorial planifié, la diversification des contenus vers le premium, l'optimisation visuelle de Facebook, l'exploitation systématique d'Instagram, le déploiement de campagnes Meta Ads sponsorisées et l'accélération de de l'interaction client.",
    data: {
      axes: [
        { id: "01", title: "Calendrier éditorial", desc: "Planification hebdomadaire stricte pour contrer l'irrégularité." },
        { id: "02", title: "Diversification des contenus", desc: "Storytelling, fiches projets et immobilier haut standing." },
        { id: "03", title: "Optimisation Facebook", desc: "Rénovation graphique complète de la bannière et de l'accueil." },
        { id: "04", title: "Optimisation Instagram", desc: "Production intensive de vidéos courtes adaptées aux algorithmes." },
        { id: "05", title: "Campagnes sponsorisées", desc: "Lancement de tunnels d'acquisition Meta Ads." },
        { id: "06", title: "Amélioration de l'interaction", desc: "Instauration de réponses rapides sous un delai de 15 minutes." }
      ]
    }
  },
  {
    id: "slide-14",
    sectionId: "strategie",
    slideNumber: 14,
    title: "Mise en place d'un Calendrier Éditorial",
    subtitle: "Calendriers d'actions précis menés entre Mars et Mai 2026.",
    speakingNotes: "Voici notre agenda rigoureux déployé sur trois mois. En mars, nous nous sommes focalisés sur la phase de notoriété générale. En avril, nous avons enclenché les publications de récits immersifs sur la Résidence Farès. Enfin en mai, nous avons diversifié avec la mise en avant des autres résidences comme les Arcades et la Médina.",
    data: {
      months: [
        {
          name: "Mars 2026",
          focus: "Lancement & Notoriété",
          events: [
            { day: "Lundi 16", label: "Affiche de base FB / Présentation PFE" },
            { day: "Mercredi 18", label: "Lancement de la Story de Marque" },
            { day: "Lundi 30", label: "Story institutionnelle SOROUBAT" }
          ]
        },
        {
          name: "Avril 2026",
          focus: "Campagne Test & Vidéo Farès",
          events: [
            { day: "Lundi 6", label: "Affiche promotionnelle Facebook" },
            { day: "Mardi 14", label: "Story interactive Instagram" },
            { day: "Mercredi 15", label: "Lancement Campagne Meta Ads" },
            { day: "Vendredi 17", label: "Réel Instagram Résidence Farès" },
            { day: "Mercredi 22", label: "Fiche Projet interactive (FB & IG)" },
            { day: "Mardi 28", label: "Réel Triplex Les Arcades (IG)" }
          ]
        },
        {
          name: "Mai 2026",
          focus: "Diversification & Bilan",
          events: [
            { day: "Lundi 4", label: "Lancement de la Story interactive" },
            { day: "Mardi 12", label: "Publication du Catalogue de Projets" },
            { day: "Mercredi 13", label: "Affiche interactive - Les Arcades" },
            { day: "Vendredi 15", label: "Affiches - Jardins de la Médina" },
            { day: "Dimanche 17", label: "Réel récapitulatif de fidélisation" },
            { day: "Mercredi 20", label: "Visualisation technique Fiches 3D" }
          ]
        }
      ]
    }
  },
  {
    id: "slide-15",
    sectionId: "strategie",
    slideNumber: 15,
    title: "Diversification de Contenu : Fiche Projet",
    subtitle: "Le standard de valorisation esthétique appliqué à la Résidence Farès.",
    speakingNotes: "Pour de nouveaux posts Facebook, nous avons rédigé des fiches techniques extrêmement détaillées selon une charte noble. L'affiche du 22 avril pour la Résidence Farès met en avant des informations claires : localisation Ain Zaghouan Nord, standing de luxe, équipements comme la salle de sport, et une conception graphique impeccable assistée par maquette 3D et Photoshop.",
    data: {
      projet: {
        name: "Résidence Farès",
        promoteur: "Soroubat (Société de Routes et de Bâtiments)",
        location: "Ain Zaghouan Nord",
        standing: "Haut standing (S+2 & S+3)",
        equipements: "Salle de sport équipée, parking sous-sol, double ascenseur",
        logiciel: "Adobe Photoshop & Modélisation 3D Studio Max",
        colors: ["Blanc épuré", "Gris clair", "Beige sable", "Jaune doré"],
        objectifsAffiche: [
          "Renforcer l'attractivité et la visibilité esthétique immédiate de l'architecture",
          "Diffuser des informations structurelles claires et mémorisables",
          "Nivellement qualitatif de l'image de marque du groupe",
          "Outil d'incitation à la vente directe pour notre équipe de téléprospection"
        ],
        publicationDate: "22 Avril 2026"
      }
    }
  },
  {
    id: "slide-16",
    sectionId: "strategie",
    slideNumber: 16,
    title: "Diversification : Analyse Comparative des Affiches",
    subtitle: "L'ingénierie visuelle appliquée à notre catalogue de résidences.",
    speakingNotes: "Voici notre matrice de production pour trois projets : Fiche Projet Globale, Résidence Farès, Résidence Les Arcades, et Jardins de la Médina. Chaque création respecte des dimensions spécifiques idéales au format smartphone, des typographies raffinées comme Montserrat, et des buts précis.",
    data: {
      affiches: [
        { title: "Nos Projets (Global)", size: "1080 × 1350 px", subtitle: "L'étendue de l'offre", textStyle: "Montserrat / Centré / Noir & Blanc", software: "Photoshop", desc: "Aperçu de notre dynamisme géographique tunisien." },
        { title: "Résidence Farès", size: "1080 × 1350 px", subtitle: "Ain Zaghouan Nord", textStyle: "Montserrat / Bas Gauche / Blanc", software: "Photoshop", desc: "Affiche résidentielle valorisant la qualité des finitions." },
        { title: "Résidence Les Arcades", size: "1080 × 1350 px", subtitle: "Yasmine Hammamet", textStyle: "Montserrat / Bas Gauche / Blanc", software: "Photoshop", desc: "Mise en scène balnéaire pour capter la clientèle de villégiature et les retraités." },
        { title: "Jardins de la Médina", size: "1080 × 1350 px", subtitle: "Medina Jedida", textStyle: "Montserrat / Bas Gauche / Blanc", software: "Photoshop", desc: "Affiche résidentielle pour la classe moyenne supérieure active." }
      ],
      buts: [
        "Promouvoir l'offre commerciale géographique complète",
        "Renforcer la mémorisation et la notoriété de marque",
        "Capter des prospects qualifiés à forte intention d'achat"
      ]
    }
  },
  {
    id: "slide-17",
    sectionId: "strategie",
    slideNumber: 17,
    title: "Vidéo Sponsorisée & Scénarisation CapCut",
    subtitle: "Démonstration interactive de l'écriture narrative et de la vidéo sponsorisée.",
    speakingNotes: "Notre 'virage vidéo' s'est concrétisé par de vrais scripts dynamiques d'une durée maîtrisée, montés sur CapCut avec des mélodies de fond immersives. La première vidéo de 15 sec décrit l'appartement S+2 à Ain Zaghouan, la deuxième montre la salle de sport de la Résidence Farès pour valoriser le style de vie, et la troisième de 39 sec offre une vue tridimensionnelle du Triplex les Arcades.",
    data: {
      videos: [
        {
          id: "v1",
          title: "Appartement S+2 Farès",
          duration: "15 secondes",
          music: "Douce et chaleureuse (Ambiance zen)",
          openingText: "« Appartement S+2 à vendre Aïn Zaghouan Nord Résidence Farès »",
          objectifs: ["Attirer de jeunes couples", "Montrer le standing intérieur", "Donner l'adresse précise"],
          capcutTools: ["Découpe de clips", "Incrustation de textes", "Synchronisation audio"],
          date: "30 Mars 2026"
        },
        {
          id: "v2",
          title: "Salle de Sport Premium",
          duration: "17 secondes",
          music: "Énergique, moderne et motivante (Sans paroles)",
          openingText: "« Salle de sport Résidence Farès »",
          closingText: "« Nous contacter +216 29 665 822 »",
          objectifs: ["Valoriser les équipements exclusifs", "Donner confiance", "Incitations d'appels directs"],
          capcutTools: ["Accélération / Slow motion", "Transitions fluides", "Bouton d'appel direct"],
          date: "10 Avril 2026"
        },
        {
          id: "v3",
          title: "Triplex Les Arcades",
          duration: "39 secondes",
          music: "Musique douce et luxueuse (Haut de gamme)",
          openingText: "« TRIPLEX A VENDRE LES ARCADES | YASMINE HAMMAMET »",
          objectifs: ["Attirer des investisseurs prestige", "Explorer toutes les pièces clés", "Écran noir final mémorable"],
          capcutTools: ["Correction colorimétrique", "Incrustations multipistes", "Effet fondu"],
          date: "28 Avril 2026"
        }
      ]
    }
  },

  // SECTION 04: RESULTATS & ANALYSE COMPARATIVE (Slides 18 to 21)
  {
    id: "slide-18",
    sectionId: "resultats",
    slideNumber: 18,
    title: "Processus d'une Campagne Sponsorisée",
    subtitle: "Les 7 étapes technologiques de notre entonnoir publicitaire Meta Ads.",
    speakingNotes: "Voici notre méthodologie exacte en 7 étapes stratégiques pour nos campagnes. Nous concevons l'objectif, choisissons les plateformes FB et IG, définissons le budget de test de 34,78€, ciblons géographiquement la Tunisie et la diaspora de 25-50 ans intéressée par l'immobilier, produisons les visuels vidéos, lançons via le gestionnaire de publicités Facebook et analysons les prospects.",
    data: {
      etapes: [
        { step: "01", title: "Définir l'objectif", desc: "Notoriété de Soroubat & Génération efficace de formulaires / conversations pour leads." },
        { step: "02", title: "Choisir la plateforme", desc: "Meta Ads unifié : Facebook Ads & Instagram Ads en simultané." },
        { step: "03", title: "Définir le budget", desc: "Budget chirurgical de 34,78 € au total (budget journalier sécurisé)." },
        { step: "04", title: "Cibler l'audience", desc: "Géographie : Tunisie & Diaspora (Europe, Amérique, etc.) | Âge : 25-50 ans | Intérêts : Immobilier, appartement de luxe." },
        { step: "05", title: "Créer le contenu", desc: "Captations vidéos réelles de la Résidence + textes accrocheurs Montserrat." },
        { step: "06", title: "Lancer la campagne", desc: "Configuration de la diffusion via Facebook Business Manager." },
        { step: "07", title: "Suivre & Analyser", desc: "Ajustement quotidien de la rentabilité (clics, portée, leads, CTR)." }
      ]
    }
  },
  {
    id: "slide-19",
    sectionId: "resultats",
    slideNumber: 19,
    title: "Leads Qualifiés : Canaux Messenger & FB",
    subtitle: "L'impact direct des campagnes publicitaires sur nos messageries Facebook.",
    speakingNotes: "Voici un premier volet de la réussite commerciale directe. Les vidéos sponsorisées ont déclenché l'entrée immédiate de dizaines de clients potentiels sur Messenger et Facebook. Nous affichons des captures montrant l'intérêt des TRE pour les prix des S+2 ou la solidité du projet.",
    data: {
      channels: ["Messenger", "Facebook Page"],
      insights: [
        "Demandes de prix ciblées au m² par la diaspora européenne.",
        "Prise de contact rapide avec communication de coordonnées de rappel.",
        "Transmission immédiate de documents officiels, de localisations ou de plans de masse."
      ]
    }
  },
  {
    id: "slide-19b",
    sectionId: "resultats",
    slideNumber: 20,
    title: "Leads Qualifiés : Canal Instagram Direct & Story",
    subtitle: "L'impact direct de notre contenu régulier et de nos Stories interactives sur Instagram.",
    speakingNotes: "Sur Instagram, la cible est encore plus connectée. Les prospects réagissent à nos Stories ou Réels en nous demandant des prix ou des catalogues de photos réelles du chantier. Nous démontrons dans ces échanges notre réactivité avec des partages instantanés de photos de sols, de plâtre ou de sanitaires.",
    data: {
      channels: ["Instagram Direct", "Insta Story"],
      insights: [
        "Demandes instantanées de prix S+1 et S+2 de la part des membres de la diaspora (TRE).",
        "Envoi de packs de photos réelles du chantier pour asseoir et valider la solidité et le standing de Soroubat.",
        "Mise en place de permanence digitale pour maintenir un taux de réponse optimal à distance."
      ]
    }
  },
  {
    id: "slide-20",
    sectionId: "resultats",
    slideNumber: 21,
    title: "Performance Ads & Capteur de Conversion Client",
    subtitle: "Bilan analytique de notre campagne test et du capteur de conversion (Meta Pixel).",
    speakingNotes: "Les KPIs statistiques de notre campagne sont vertigineux. Pour un budget total de 34,78 €, nous avons obtenu plus de 51 000 vues uniques, engendrant 232 conversations uniques démarrées en direct. Le coût unitaire par conversation s'établit à seulement 0,15 € (ou 15 centimes d'euro). C'est un coût de génération de prospects inédit et ultra-rentable pour le luxe immobilier.",
    data: {
      budget: "34,78 €",
      dates: "15 — 20 Avril 2026",
      keyKPIs: [
        { label: "Vues Totales", value: "51K", change: "↑ 656% vs période précédente" },
        { label: "Conversations Initiées", value: "232", change: "Coût : 0,15 € / lead qualifié" },
        { label: "Coût de Lead", value: "0,15€", change: "ROI compétitif" },
        { label: "CTR (Taux de Clic)", value: "2,12%", change: "31.8K lectures complètes de vidéos" }
      ],
      profilAudience: {
        totalFollowers: "3 831 (+91)",
        ageGroup: "35—44 ans (~28%)",
        gender: "Hommes (61,8%)",
        mainCity: "Tunis (28,8%)",
        diaspora: "~8% de l'audience (Diaspora active)"
      },
      engagementMetrics: [
        { label: "Interactions contenu", count: "158", pct: "↑ 409,7%" },
        { label: "Conversations totales", count: "226", pct: "↑ 11 200%" },
        { label: "Taux de réponse", count: "90%", pct: "↑ 100%" },
        { label: "Visites de la page", count: "1 800", pct: "↑ 120,4%" },
        { label: "Spectateurs uniques", count: "19 172", pct: "↑ 767%" }
      ]
    }
  },
  {
    id: "slide-21",
    sectionId: "resultats",
    slideNumber: 22,
    title: "Analyse Comparative : Avant / Après",
    subtitle: "L'évaluation empirique de l'évolution organique sur Facebook et Instagram.",
    speakingNotes: "Ce tableau récapitulatif montre l'évolution fulgurante de nos KPIs sur un mois de travail structuré. Facebook a progressé de 3600 à 3800 followers, soit +5.5% d'expansion. Plus incroyable encore : Instagram a bondi de +12.8% en followers et de +8.1% de publications de qualité. Le bilan est magnifiquement positif.",
    data: {
      beforeAfter: [
        { platform: "Facebook", indicator: "Followers", before: 3600, after: 3800, evol: "+200 (+5,5%)", color: "text-blue-400" },
        { platform: "Facebook", indicator: "Comptes suivis", before: 15, after: 17, evol: "+2 (+13,3%)", color: "text-blue-400" },
        { platform: "Instagram", indicator: "Publications", before: 148, after: 160, evol: "+12 (+8,1%)", color: "text-pink-400" },
        { platform: "Instagram", indicator: "Followers", before: 737, after: 831, evol: "+94 (+12,8%)", color: "text-pink-400" },
        { platform: "Instagram", indicator: "Comptes suivis", before: 915, after: 906, evol: "-9 (-1%)", color: "text-pink-400" }
      ],
      bilanSynthese: "Bilan positif : progression notable sur Facebook (+5,5% followers) et surtout sur Instagram (+12,8% followers, +8,1% publications) suite aux actions de restructuration digitale menées."
    }
  },

  // SECTION 05: RECOMMANDATIONS & CONCLUSION (Slides 22 & 23)
  {
    id: "slide-22",
    sectionId: "conclusion",
    slideNumber: 23,
    title: "Recommandations Stratégiques",
    subtitle: "La feuille de route pour pérenniser l'éveil numérique de SOROUBAT.",
    speakingNotes: "Pour de futures actions pérennes, nous recommandons le recrutement d'une équipe Marketing Digital interne pour orchestrer ces réseaux. Deuxièmement, maintenir une ligne de contenus vidéos immersive rigoureuse. Troisièmement, optimiser l'interaction client rapide, installer des outils de mesure et allouer un budget Meta Ads permanent pour sécuriser des ventes constantes.",
    data: {
      recommendations: [
        { title: "Service Marketing Digital Interne", desc: "Créer et recruter un département ou un Community Manager dédié à la gestion continue des réseaux sociaux." },
        { title: "Stratégie de Contenu Régulière", desc: "Maintenir le rythme strict de publications d'affiches de luxe et de formats Réels/Stories immersifs." },
        { title: "Renforcer l'Interaction Client", desc: "Mettre en place une permanence digitale pour répondre en moins de 15 min aux questions de prix." },
        { title: "Outils d'Analyse de Performance", desc: "Adopter Google Analytics, Facebook Pixel et un outil CRM pour évaluer le parcours d'acquisition." },
        { title: "Campagnes Sponsorisées Régulières", desc: "Allouer un budget mensuel fixe Meta Ads pour cibler prioritairement les TRE (diaspora de 35-44 ans)." }
      ]
    }
  },
  {
    id: "slide-23",
    sectionId: "conclusion",
    slideNumber: 24,
    title: "Conclusion Générale",
    subtitle: "La confirmation du digital comme levier d'excellence immobilière.",
    speakingNotes: "Pour conclure, ce projet prouve que la présence digitale n'est plus un luxe, mais un moteur stratégique pour l'immobilier moderne en Tunisie. Nous avons validé des habiletés précieuses allant de la conception créative Canva/CapCut jusqu'à la rigueur budgétaire Meta Ads et la conduite du changement en entreprise. Nous remercions les membres du jury pour votre attention, et nous ouvrons maintenant les discussions.",
    data: {
      synthèse: "Ce projet a confirmé que la présence digitale est un levier stratégique incontournable pour le secteur immobilier. Une communication digitale structurée améliore la visibilité, renforce la relation client et consolide la position concurrentielle de Soroubat.",
      accomplissements: [
        { label: "Création de contenus", text: "Calendrier éditorial rigoureux Mars-Mai 2026, réalisation d'affiches professionnelles, Réels programmés." },
        { label: "Résultats mesurables", text: "51 000 vues qualifiées, 232 leads engagés instantanément, taux de réactivité interne de 90%, coût exceptionnel de 0,15€/lead." },
        { label: "Apport académique", text: "Mise en pratique pluridisciplinaire : marketing digital stratégique, techniques audiovisuelles et management de projet." }
      ],
      cloture: "Merci pour votre attention — Questions & Discussion"
    }
  }
];
