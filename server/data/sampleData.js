// Curated high quality sample explorations for Rabbit Hole
// Covers 5 distinct domains matching the UI mockup:
// 1. Why do humans dream? (Featured)
// 2. The nature of consciousness
// 3. Black holes and time
// 4. The psychology of memories
// 5. Are we alone in the universe?

export const sampleExplorations = {
  "why-do-humans-dream": {
    id: "why-do-humans-dream",
    query: "Why do humans dream?",
    title: "Why do humans dream?",
    summary: "Exploring the neurological, evolutionary, and psychological mysteries behind human sleep and dreaming.",
    stats: {
      conceptsCount: 12,
      connectionsCount: 24,
    },
    rootConceptId: "dreaming",
    concepts: [
      {
        id: "dreaming",
        label: "Dreaming",
        type: "core",
        tagline: "The mysterious state of mind during sleep.",
        tags: ["Sleep", "Consciousness", "Memory", "Neuroscience", "Mental Health"],
        overview: "Dreaming is a complex mental process that occurs mainly during REM (Rapid Eye Movement) sleep, where the brain becomes highly active. Dreams may help with memory consolidation, emotional processing, problem solving, and even creativity. While the exact purpose is still debated, research suggests they play an important role in our mental and emotional well-being.",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
        icon: "cloud-moon",
        sources: [
          {
            title: "The Function of Dream Sleep - Nature Reviews Neuroscience",
            url: "https://www.nature.com/articles/nrn.2017.14",
            snippet: "Empirical studies indicate that REM sleep neurobiology supports the reactivation and cross-cortical consolidation of episodic memories.",
            isVerified: true
          },
          {
            title: "Why Do We Dream? Hypotheses & Evidence - Sleep Foundation",
            url: "https://www.sleepfoundation.org/dreams/why-do-we-dream",
            snippet: "Leading neurobiological theories propose dreaming aids neural plasticity, nocturnal emotional therapy, and evolutionary threat response.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "neural-network-overfitting",
            targetLabel: "AI Neural Network Regularization",
            evidenceType: "analogy",
            explanation: "In deep learning, dropout and synthetic noise prevent networks from overfitting to training data. Cognitive scientists hypothesize dreaming injects biological 'stochastic noise' so brains remain adaptable."
          },
          {
            targetConceptId: "quantum-superposition",
            targetLabel: "Quantum Superposition & Multi-World States",
            evidenceType: "speculative",
            explanation: "Some neurophysicists metaphorically liken unconstrained dream logic to exploring superposition states of autobiographical memory before waking collapses them into a single reality."
          }
        ],
        keyConnections: [
          { id: "rem-sleep", label: "REM Sleep", note: "When dreaming happens most" },
          { id: "memory-consolidation", label: "Memory Consolidation", note: "Helps form long-term memories" },
          { id: "lucid-dreaming", label: "Lucid Dreaming", note: "Can you control your dreams?" },
          { id: "consciousness", label: "Consciousness", note: "What is the nature of self?" }
        ]
      },
      {
        id: "rem-sleep",
        label: "REM Sleep",
        type: "related",
        tagline: "High-frequency brainwaves and rapid eye movement phase.",
        tags: ["Sleep Architecture", "Neurobiology", "Brainwaves"],
        overview: "Rapid Eye Movement (REM) sleep was discovered in 1953. During REM, our brain metabolic activity closely mimics wakefulness, accompanied by vivid dreams, temporary motor muscle paralysis (atonia), and autonomic variability.",
        imageUrl: "https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=1000&auto=format&fit=crop",
        icon: "moon",
        sources: [
          {
            title: "REM Sleep Discovery and Mechanisms - NIH National Library of Medicine",
            url: "https://pubmed.ncbi.nlm.nih.gov/15534988/",
            snippet: "Aserinsky and Kleitman's discovery demonstrated periodic cycles of ocular motility and low-voltage EEG throughout normal sleep.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "marine-mammal-unihemispheric",
            targetLabel: "Unihemispheric Cetacean Rest",
            evidenceType: "evidence-supported",
            explanation: "Dolphins and whales sleep with only one brain hemisphere at a time, skipping conventional full-body REM paralysis to avoid drowning."
          }
        ],
        keyConnections: [
          { id: "dreaming", label: "Dreaming", note: "Primary stage where narrative dreams emerge" },
          { id: "sleep-cycles", label: "Sleep Cycles", note: "Occurs 4-6 times every 90 minutes" },
          { id: "lucid-dreaming", label: "Lucid Dreaming", note: "Conscious awareness during REM" }
        ]
      },
      {
        id: "memory-consolidation",
        label: "Memory Consolidation",
        type: "related",
        tagline: "Transforming fragile recent experiences into lasting knowledge.",
        tags: ["Cognition", "Hippocampus", "Synapses"],
        overview: "During sleep, the hippocampus replays waking neural sequences to the neocortex. This replay transfers short-term memories into permanent long-term storage while pruning redundant synaptic connections.",
        imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop",
        icon: "brain",
        sources: [
          {
            title: "Sleep-dependent memory consolidation - Neuron Journal",
            url: "https://www.cell.com/neuron/fulltext/S0896-6273(14)00835-X",
            snippet: "Hippocampal sharp-wave ripples during slow-wave and REM sleep coordinate global synaptic reactivation.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "database-compaction",
            targetLabel: "LSM Tree Database Compaction",
            evidenceType: "analogy",
            explanation: "Modern distributed databases like Cassandra and RocksDB write quickly to an in-memory memtable and compact to disk during idle cycles, directly paralleling hippocampal memory consolidation."
          }
        ],
        keyConnections: [
          { id: "dreaming", label: "Dreaming", note: "Memory replay manifests as surreal dream scenarios" },
          { id: "neuroscience", label: "Neuroscience", note: "Synaptic plasticity and cellular consolidation" }
        ]
      },
      {
        id: "lucid-dreaming",
        label: "Lucid Dreaming",
        type: "cross",
        tagline: "The state of becoming consciously aware inside a dream.",
        tags: ["Consciousness", "Metacognition", "Neuroimaging"],
        overview: "Lucid dreaming occurs when the dreamer realizes they are dreaming while remaining asleep. Functional fMRI shows reactivation of the dorsolateral prefrontal cortex during lucidity, bridging reflective self-awareness with REM hallucinations.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
        icon: "sparkles",
        sources: [
          {
            title: "Neural correlates of lucid dreaming - SLEEP Journal",
            url: "https://academic.oup.com/sleep/article/32/9/1191/2454508",
            snippet: "Lucid dreamers exhibit significantly enhanced 40 Hz gamma-band power in frontolateral and temporoparietal areas.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "virtual-reality-immersion",
            targetLabel: "Full-Dive Virtual Reality",
            evidenceType: "analogy",
            explanation: "Lucid dreaming is humanity's native bio-simulator: complete sensorimotor immersion with zero external latency and direct neural feedback."
          }
        ],
        keyConnections: [
          { id: "consciousness", label: "Consciousness", note: "Meta-awareness in non-ordinary states" },
          { id: "rem-sleep", label: "REM Sleep", note: "Lucid states almost exclusively occur in REM" },
          { id: "dreaming", label: "Dreaming", note: "Active control over dream narratives" }
        ]
      },
      {
        id: "consciousness",
        label: "Consciousness",
        type: "cross",
        tagline: "Subjective phenomenal experience and the nature of self.",
        tags: ["Philosophy of Mind", "Qualia", "Neurobiology"],
        overview: "Consciousness is the internal subjective feeling of what it is like to experience reality. Sleep and dreaming prove that consciousness does not require sensory inputs from the outside world to produce rich subjective worlds.",
        imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
        icon: "eye",
        sources: [
          {
            title: "The Hard Problem of Consciousness - Stanford Encyclopedia of Philosophy",
            url: "https://plato.stanford.edu/entries/consciousness/",
            snippet: "Explores why physical neurochemical processes give rise to an inner life of qualia and subjective perception.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "panpsychism-integrated-info",
            targetLabel: "Integrated Information Theory (IIT)",
            evidenceType: "speculative",
            explanation: "Giulio Tononi's IIT claims consciousness is an intrinsic mathematical property (Phi) of any system with interconnected causal dynamics, even beyond biological brains."
          }
        ],
        keyConnections: [
          { id: "dreaming", label: "Dreaming", note: "Consciousness decoupled from external sensors" },
          { id: "lucid-dreaming", label: "Lucid Dreaming", note: "Metacognitive awareness" },
          { id: "neuroscience", label: "Neuroscience", note: "Search for Neural Correlates of Consciousness (NCC)" }
        ]
      },
      {
        id: "sleep-cycles",
        label: "Sleep Cycles",
        type: "related",
        tagline: "Ultradian 90-minute rhythms modulating rest depth.",
        tags: ["Circadian", "Slow-Wave", "Polysomnography"],
        overview: "Human sleep is structured into ultradian cycles lasting roughly 90 to 110 minutes each, shifting through Non-REM (N1, N2, N3 deep slow-wave sleep) and culminating in REM sleep before repeating.",
        imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop",
        icon: "activity",
        sources: [
          {
            title: "Physiology of Sleep Stages - StatPearls NIH",
            url: "https://www.ncbi.nlm.nih.gov/books/NBK526132/",
            snippet: "Defines NREM and REM transitions, delta-wave synchrony, and homeostatic sleep pressure.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "tidal-gravitational-cycles",
            targetLabel: "Lunar & Biological Tidal Rhythms",
            evidenceType: "speculative",
            explanation: "Clinical observations hint that human sleep latency and total sleep time subtly oscillate with lunar gravitational cycles even in blackout lab settings."
          }
        ],
        keyConnections: [
          { id: "rem-sleep", label: "REM Sleep", note: "Lengthens with each successive cycle of the night" },
          { id: "dreaming", label: "Dreaming", note: "Narrative dream complexity grows with each cycle" }
        ]
      },
      {
        id: "evolutionary-purpose",
        label: "Evolutionary Purpose",
        type: "related",
        tagline: "Natural selection and adaptive survival value of dreaming.",
        tags: ["Evolution", "Threat Simulation", "Ethology"],
        overview: "Antti Revonsuo's Threat Simulation Theory posits that dreams evolved as an ancient biological virtual reality training arena where ancestral humans practiced recognizing and escaping lethal predators without physical danger.",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop",
        icon: "tree-pine",
        sources: [
          {
            title: "The Reinterpretation of Dreams: An Evolutionary Hypothesis - BBS",
            url: "https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/abs/reinterpretation-of-dreams-an-evolutionary-hypothesis-of-the-function-of-dreaming/7F3795C5C053FEFDEB2E3EFBF54D59E7",
            snippet: "Revonsuo presents empirical evidence that dreams disproportionately represent realistic threatening waking scenarios.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "game-theory-simulations",
            targetLabel: "Monte Carlo Game Simulations",
            evidenceType: "evidence-supported",
            explanation: "Autonomous robots run thousands of offline Monte Carlo physics simulations overnight to practice hazardous terrain navigation before deployment, mimicking biological threat simulation."
          }
        ],
        keyConnections: [
          { id: "dreaming", label: "Dreaming", note: "Adaptive function preserving genetic survival" },
          { id: "emotions", label: "Emotions", note: "Fear and survival instincts frequently rehearsed" }
        ]
      },
      {
        id: "emotions",
        label: "Emotions",
        type: "cross",
        tagline: "Overnight affective therapy and chemical resets.",
        tags: ["Amygdala", "Emotional Regulation", "Noradrenaline"],
        overview: "Matthew Walker describes sleep as 'overnight therapy'. During REM sleep, the emotional center (amygdala) is intensely active, while noradrenaline (stress chemical) is completely shut off, stripping emotional charge from painful memories.",
        imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop",
        icon: "sunset",
        sources: [
          {
            title: "Sleep and Affective Brain Processing - Walker & van der Helm",
            url: "https://www.sciencedirect.com/science/article/pii/S1053811909009874",
            snippet: "REM sleep depotentiates emotional reactivity through locus coeruleus noradrenergic cessation.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "ptsd-reconsolidation-blockers",
            targetLabel: "Propranolol Trauma Dissociation",
            evidenceType: "evidence-supported",
            explanation: "Pharmacological beta-blockers administered during trauma recall chemically replicate REM sleep's zero-noradrenaline state to dissolve PTSD fear triggers."
          }
        ],
        keyConnections: [
          { id: "dreaming", label: "Dreaming", note: "Dreams process unresolved emotional tensions" },
          { id: "mental-health", label: "Mental Health", note: "Crucial buffer against anxiety and depression" }
        ]
      },
      {
        id: "mental-health",
        label: "Mental Health",
        type: "cross",
        tagline: "The bidirectional relationship between dreaming and psyche.",
        tags: ["Psychotherapy", "Depression", "Resilience"],
        overview: "Disrupted dream architecture is a primary hallmark of clinical depression, PTSD, and bipolar disorder. Healthy REM dreaming restores psychological equilibrium and fosters cognitive resilience.",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
        icon: "mountain",
        sources: [
          {
            title: "Sleep and Psychiatric Disorders - Harvard Health",
            url: "https://www.health.harvard.edu/newsletter_article/sleep-and-mental-health",
            snippet: "Chronic sleep disruptions contribute to psychiatric vulnerability, while dream therapy improves therapeutic outcomes.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "creative-epiphany",
            targetLabel: "The Incubation Effect & Eureka Epiphanies",
            evidenceType: "evidence-supported",
            explanation: "Kekulé discovered the benzene ring and Mendeleev solved the periodic table after dreaming, demonstrating unconscious combinatorial mental health processing."
          }
        ],
        keyConnections: [
          { id: "emotions", label: "Emotions", note: "Regulates daily psychological stressors" },
          { id: "dreaming", label: "Dreaming", note: "Dream quality mirrors internal psychological state" }
        ]
      },
      {
        id: "neuroscience",
        label: "Neuroscience",
        type: "related",
        tagline: "The electrical, neurochemical and cellular biology of brain states.",
        tags: ["Neurotransmitters", "Synaptic Pruning", "Default Mode"],
        overview: "Neuroscience investigates how neurotransmitters like acetylcholine, dopamine, serotonin, and GABA alternate to generate conscious vs sleeping states. Modern neuroimaging reveals that the Default Mode Network (DMN) sparks during unconstrained mind-wandering and dreaming.",
        imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop",
        icon: "network",
        sources: [
          {
            title: "The Neurobiology of Consciousness and Sleep - Frontiers in Systems Neuroscience",
            url: "https://www.frontiersin.org/articles/10.3389/fnsys.2020.00038/full",
            snippet: "Examines thalocortical gating, neurotransmitter switches, and connectome dynamics across wake-sleep cycles.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "psilocybin-neuroplasticity",
            targetLabel: "Psychedelic Brain Entropy",
            evidenceType: "evidence-supported",
            explanation: "FMRI studies by Carhart-Harris reveal that psilocybin and REM sleep activate strikingly identical high-entropy cerebral cortex connectivity patterns."
          }
        ],
        keyConnections: [
          { id: "memory-consolidation", label: "Memory Consolidation", note: "Synaptic plasticity mechanisms" },
          { id: "dreaming", label: "Dreaming", note: "Neural generation of surreal mental imagery" }
        ]
      },
      {
        id: "dream-theories",
        label: "Dream Theories",
        type: "related",
        tagline: "From Freudian psychoanalysis to activation-synthesis.",
        tags: ["History of Ideas", "Psychoanalysis", "Cognitive Science"],
        overview: "Historical theories of dreaming span Freud's 'wish fulfillment' and Jung's archetypal collective unconscious, to Hobson & McCarley's Activation-Synthesis hypothesis which claimed dreams were cognitive interpretations of random brainstem electrical discharges.",
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
        icon: "book-open",
        sources: [
          {
            title: "The Interpretation of Dreams - Sigmund Freud (1899)",
            url: "https://www.gutenberg.org/ebooks/4397",
            snippet: "Freud's foundational psychoanalytic work framing dreams as the royal road to the unconscious.",
            isVerified: true
          },
          {
            title: "The Brain as a Dream State Generator: Activation-Synthesis - AJP",
            url: "https://ajp.psychiatryonline.org/doi/10.1176/ajp.134.12.1335",
            snippet: "Hobson & McCarley's 1977 challenge asserting pontine reticular formation spikes drive cortical dream imagery.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "shamanic-dream-walking",
            targetLabel: "Aboriginal Dreamtime Cosmology",
            evidenceType: "analogy",
            explanation: "Australian Aboriginal mythology treats 'The Dreamtime' as a parallel primordial dimension where ancestral beings created reality, paralleling modern cognitive views of dreams constructing personal meaning."
          }
        ],
        keyConnections: [
          { id: "dreaming", label: "Dreaming", note: "Theoretical frameworks explaining the phenomenon" },
          { id: "evolutionary-purpose", label: "Evolutionary Purpose", note: "Contrasts biological adaptation with psychological symbolism" }
        ]
      },
      {
        id: "neural-network-overfitting",
        label: "AI Neural Regularization",
        type: "weird-bridge",
        tagline: "Surprising parallel: biological noise prevents mental rigidness.",
        tags: ["Machine Learning", "Neurocomputation", "Cross-Disciplinary"],
        overview: "When deep learning models are trained too strictly on past data, they memorize rather than generalize ('overfitting'). AI researchers use dropout, noise injection, and synthetic hallucinated datasets. Erik Hoel's Overfitted Brain Hypothesis proposes human dreaming evolved precisely as biological regularizer noise.",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
        icon: "cpu",
        sources: [
          {
            title: "The Overfitted Brain: Dreams evolved to assist generalization - Patterns / Cell Press",
            url: "https://www.cell.com/patterns/fulltext/S2666-3899(21)00064-7",
            snippet: "Hoel argues that biological brains need dreams' weirdness to prevent diurnal overfitting to repetitive sensory routines.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "dreaming",
            targetLabel: "Human Dreaming",
            evidenceType: "evidence-supported",
            explanation: "Deep reinforcement learning agents exposed to generative dream-like buffers learn complex navigation tasks 40% faster."
          }
        ],
        keyConnections: [
          { id: "dreaming", label: "Dreaming", note: "Biological inspiration for computational generalization" },
          { id: "neuroscience", label: "Neuroscience", note: "Mathematical modeling of neural plasticity" }
        ]
      }
    ],
    edges: [
      { id: "e1", source: "dreaming", target: "dream-theories", type: "related", label: "studied through" },
      { id: "e2", source: "dreaming", target: "memory-consolidation", type: "related", label: "catalyzes" },
      { id: "e3", source: "dreaming", target: "rem-sleep", type: "related", label: "occurs in" },
      { id: "e4", source: "dreaming", target: "lucid-dreaming", type: "cross", label: "meta-conscious form" },
      { id: "e5", source: "dreaming", target: "consciousness", type: "cross", label: "manifestation of" },
      { id: "e6", source: "dreaming", target: "sleep-cycles", type: "related", label: "recurs within" },
      { id: "e7", source: "dreaming", target: "evolutionary-purpose", type: "related", label: "shaped by" },
      { id: "e8", source: "dreaming", target: "emotions", type: "cross", label: "regulates" },
      { id: "e9", source: "dreaming", target: "mental-health", type: "cross", label: "supports" },
      { id: "e10", source: "dreaming", target: "neuroscience", type: "related", label: "probed by" },
      { id: "e11", source: "dream-theories", target: "evolutionary-purpose", type: "suggested", label: "contrasts" },
      { id: "e12", source: "memory-consolidation", target: "neuroscience", type: "suggested", label: "mechanisms" },
      { id: "e13", source: "rem-sleep", target: "sleep-cycles", type: "suggested", label: "stages" },
      { id: "e14", source: "rem-sleep", target: "lucid-dreaming", type: "suggested", label: "gateway" },
      { id: "e15", source: "lucid-dreaming", target: "consciousness", type: "cross", label: "waking overlap" },
      { id: "e16", source: "sleep-cycles", target: "evolutionary-purpose", type: "suggested", label: "circadian clock" },
      { id: "e17", source: "emotions", target: "mental-health", type: "cross", label: "affective buffer" },
      { id: "e18", source: "neuroscience", target: "mental-health", type: "suggested", label: "neurobiology" },
      { id: "e19", source: "dreaming", target: "neural-network-overfitting", type: "weird-bridge", label: "weird bridge" },
      { id: "e20", source: "neural-network-overfitting", target: "neuroscience", type: "weird-bridge", label: "regularization" },
      { id: "e21", source: "memory-consolidation", target: "neural-network-overfitting", type: "weird-bridge", label: "replay buffer" },
      { id: "e22", source: "consciousness", target: "emotions", type: "suggested", label: "felt presence" },
      { id: "e23", source: "dream-theories", target: "memory-consolidation", type: "suggested", label: "functional debate" },
      { id: "e24", source: "evolutionary-purpose", target: "mental-health", type: "suggested", label: "adaptive resilience" }
    ],
    followUps: [
      "Can animals experience lucid dreams?",
      "Why do we forget 95% of our dreams upon waking?",
      "How does sleep deprivation alter our perception of time?",
      "Could dreams have evolved as a threat simulation mechanism?",
      "How do blind people experience visual imagery in dreams?"
    ]
  },

  "the-nature-of-consciousness": {
    id: "the-nature-of-consciousness",
    query: "The nature of consciousness",
    title: "The nature of consciousness",
    summary: "From the Hard Problem to quantum biology and panpsychism: what gives rise to subjective experience?",
    stats: {
      conceptsCount: 10,
      connectionsCount: 18,
    },
    rootConceptId: "consciousness-core",
    concepts: [
      {
        id: "consciousness-core",
        label: "Consciousness",
        type: "core",
        tagline: "The subjective inner feeling of what it is like to exist.",
        tags: ["Qualia", "Philosophy", "Neuroscience", "Cognition"],
        overview: "Consciousness remains the greatest unsolved mystery of science. How do 86 billion biological neurons exchanging sodium and potassium ions give rise to the vivid subjective sensation of redness, grief, or awe? This divide is known as the 'Hard Problem'.",
        imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
        icon: "eye",
        sources: [
          {
            title: "Facing Up to the Problem of Consciousness - David Chalmers",
            url: "http://consc.net/papers/facing.html",
            snippet: "Chalmers' seminal paper bifurcating easy functional problems from the hard subjective phenomenal problem.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "slime-mold-decision",
            targetLabel: "Acellular Slime Mold Spatial Memory",
            evidenceType: "evidence-supported",
            explanation: "Physarum polycephalum, a brainless single-celled amoeba, solves complex mazes and anticipates temporal shocks, challenging neuron-centric theories of sentience."
          }
        ],
        keyConnections: [
          { id: "hard-problem", label: "The Hard Problem", note: "The explanatory gap between matter and qualia" },
          { id: "neural-correlates", label: "Neural Correlates", note: "Where experience lights up in fMRI" },
          { id: "integrated-information", label: "Integrated Information", note: "Quantifying awareness with Phi" }
        ]
      },
      {
        id: "hard-problem",
        label: "The Hard Problem",
        type: "related",
        tagline: "Why should physical brain processing feel like anything at all?",
        tags: ["Philosophy of Mind", "David Chalmers", "Epistemology"],
        overview: "Formulated by philosopher David Chalmers in 1995, the hard problem asks why subjective experiences (qualia) accompany physical cognitive mechanisms. We could conceive of 'philosophical zombies' who behave identically without an inner light.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
        icon: "help-circle",
        sources: [
          {
            title: "Consciousness and its Place in Nature - Oxford University Press",
            url: "https://global.oup.com/academic/product/the-character-of-consciousness-9780195311105",
            snippet: "Comprehensive taxonomy of dualism, materialism, and panpsychism frameworks.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "quantum-orch-or",
            targetLabel: "Microtubule Orchestrated Objective Reduction (Orch-OR)",
            evidenceType: "speculative",
            explanation: "Penrose and Hameroff postulate consciousness originates from quantum wave function collapses inside neuronal microtubules rather than classical computation."
          }
        ],
        keyConnections: [
          { id: "consciousness-core", label: "Consciousness", note: "Primary philosophical dilemma" },
          { id: "panpsychism", label: "Panpsychism", note: "Radical proposal that consciousness is fundamental" }
        ]
      },
      {
        id: "neural-correlates",
        label: "Neural Correlates (NCC)",
        type: "related",
        tagline: "The minimal neural mechanisms sufficient for a conscious percept.",
        tags: ["Neuroscience", "Cerebral Cortex", "Claustrum"],
        overview: "Christof Koch and Francis Crick spearheaded the empirical hunt for NCCs: identifying specific thalocortical loops and gamma synchrony that correspond to active conscious states.",
        imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop",
        icon: "activity",
        sources: [
          {
            title: "Neural Correlates of Consciousness: Progress and Problems - Nature Reviews",
            url: "https://www.nature.com/articles/nrn.2016.22",
            snippet: "Synthesizes empirical lesions and optogenetic findings mapping the posterior cortical hot zone.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "split-brain-syndrome",
            targetLabel: "Split-Brain Dual Consciousness",
            evidenceType: "evidence-supported",
            explanation: "Surgical severing of the corpus callosum creates two distinct independent conscious agents operating in the same skull, as demonstrated by Sperry and Gazzaniga."
          }
        ],
        keyConnections: [
          { id: "consciousness-core", label: "Consciousness", note: "Empirical biological basis" },
          { id: "integrated-information", label: "Integrated Information", note: "Mathematical model of NCCs" }
        ]
      },
      {
        id: "panpsychism",
        label: "Panpsychism",
        type: "cross",
        tagline: "Consciousness as an intrinsic fundamental building block of matter.",
        tags: ["Metaphysics", "Cosmology", "Russellian Monism"],
        overview: "Rather than claiming consciousness magically emerges when matter arranges in complex brains, panpsychism posits that rudimentary experiential properties are intrinsic to all fundamental matter, much like mass or electric charge.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
        icon: "sparkles",
        sources: [
          {
            title: "Galileo's Error: Foundations for a New Science of Consciousness - Philip Goff",
            url: "https://pantheonbooks.com/book/galileos-error/",
            snippet: "Argues standard physical science intentionally omitted subjective qualities from physical equations.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "quantum-entanglement",
            targetLabel: "Spooky Action & Holism",
            evidenceType: "analogy",
            explanation: "Non-local quantum entanglement shows particles share relational states across light-years, echoing panpsychist claims of universal interconnectedness."
          }
        ],
        keyConnections: [
          { id: "hard-problem", label: "The Hard Problem", note: "Provides an alternative answer to the explanatory gap" },
          { id: "consciousness-core", label: "Consciousness", note: "Radical worldview shifts" }
        ]
      },
      {
        id: "integrated-information",
        label: "Integrated Info Theory",
        type: "related",
        tagline: "Quantifying consciousness as irreducible information synergy (Phi).",
        tags: ["Information Theory", "IIT", "Mathematics"],
        overview: "Developed by Giulio Tononi, Integrated Information Theory (IIT) begins with axioms of experience and derives that any physical mechanism whose cause-effect power exceeds the sum of its parts possesses non-zero consciousness.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        icon: "cpu",
        sources: [
          {
            title: "Integrated Information Theory: From Consciousness to Its Physical Substrate - Nature",
            url: "https://www.nature.com/articles/nrn.2016.44",
            snippet: "Presents mathematical formalization of cause-effect structures and Phi computation.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "internet-phi",
            targetLabel: "The Global Internet Phi Paradox",
            evidenceType: "speculative",
            explanation: "Critics note IIT's formula implies that feedforward supercomputers have zero consciousness, whereas sprawling distributed communication mesh grids could mathematically exhibit higher Phi than sleeping primates."
          }
        ],
        keyConnections: [
          { id: "neural-correlates", label: "Neural Correlates", note: "Tested clinically in comatose patients" },
          { id: "consciousness-core", label: "Consciousness", note: "Formal quantitative metric" }
        ]
      }
    ],
    edges: [
      { id: "e-c1", source: "consciousness-core", target: "hard-problem", type: "related", label: "defines" },
      { id: "e-c2", source: "consciousness-core", target: "neural-correlates", type: "related", label: "measured by" },
      { id: "e-c3", source: "consciousness-core", target: "integrated-information", type: "related", label: "quantified by" },
      { id: "e-c4", source: "hard-problem", target: "panpsychism", type: "cross", label: "inspires" },
      { id: "e-c5", source: "neural-correlates", target: "integrated-information", type: "cross", label: "tested by" },
      { id: "e-c6", source: "panpsychism", target: "integrated-information", type: "weird-bridge", label: "shares axioms" }
    ],
    followUps: [
      "Could large language models ever develop genuine qualia?",
      "Can consciousness exist without a physical substrate?",
      "How do psychedelics temporarily dissolve the ego?"
    ]
  },

  "black-holes-and-time": {
    id: "black-holes-and-time",
    query: "Black holes and time",
    title: "Black holes and time",
    summary: "Gravitational time dilation, event horizons, Hawking radiation, and the nature of spacetime.",
    stats: {
      conceptsCount: 7,
      connectionsCount: 8,
    },
    rootConceptId: "black-holes-core",
    concepts: [
      {
        id: "black-holes-core",
        label: "Black Holes",
        type: "core",
        tagline: "Regions of spacetime where gravity prevents anything, even light, from escaping.",
        tags: ["General Relativity", "Astrophysics", "Cosmology", "Singularity"],
        overview: "Predicted by Einstein's General Relativity and confirmed by gravitational wave detectors and the Event Horizon Telescope, black holes warp space and time to the absolute extremes of modern physics.",
        imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop",
        icon: "disc",
        sources: [
          {
            title: "First M87 Event Horizon Telescope Results - Astrophysical Journal Letters",
            url: "https://iopscience.iop.org/article/10.3847/2041-8213/ab0ec7",
            snippet: "Direct observational evidence of a supermassive black hole shadow and photon ring.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "holographic-principle",
            targetLabel: "Black Hole Area Entropy & Holography",
            evidenceType: "evidence-supported",
            explanation: "Bekenstein and Hawking proved entropy scales with 2D surface area rather than 3D volume, inspiring the holographic principle that 3D space might be a boundary projection."
          }
        ],
        keyConnections: [
          { id: "event-horizon", label: "Event Horizon", note: "The boundary of no return" },
          { id: "time-dilation", label: "Gravitational Time Dilation", note: "Time slows to a crawl near mass" },
          { id: "hawking-radiation", label: "Hawking Radiation", note: "Quantum evaporation of black holes" }
        ]
      },
      {
        id: "event-horizon",
        label: "Event Horizon",
        type: "related",
        tagline: "The threshold where escape velocity exceeds the speed of light.",
        tags: ["Relativity", "Light Cones", "Schwarzschild"],
        overview: "Past the event horizon, the future light cones of all particles tilt inexorably inward toward the central singularity. In coordinate time, an infalling clock appears to freeze forever to a distant observer.",
        imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
        icon: "circle",
        sources: [
          {
            title: "The Mathematical Theory of Black Holes - Subrahmanyan Chandrasekhar",
            url: "https://oxford.universitypressscholarship.com/view/10.1093/acprof:oso/9780198503705.001.0001/acprof-9780198503705",
            snippet: "Rigorous geodesic derivation of Schwarzschild and Kerr metrics.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "acoustic-black-holes",
            targetLabel: "Sonic Horizons in Bose-Einstein Condensates",
            evidenceType: "evidence-supported",
            explanation: "Physicists create acoustic horizons in supersonic superfluids where sound cannot swim upstream, observing analog Hawking radiation in lab settings."
          }
        ],
        keyConnections: [
          { id: "black-holes-core", label: "Black Holes", note: "Defining boundary" },
          { id: "time-dilation", label: "Time Dilation", note: "Infinite red-shift at horizon" }
        ]
      },
      {
        id: "time-dilation",
        label: "Time Dilation",
        type: "related",
        tagline: "Clocks tick measurably slower in deeper gravitational wells.",
        tags: ["Spacetime Curvature", "Relativity", "GPS Systems"],
        overview: "According to Einstein's Equivalence Principle, strong gravity stretches the metric of spacetime. Near a supermassive black hole, an hour spent close to the horizon corresponds to decades passing back on Earth.",
        imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop",
        icon: "clock",
        sources: [
          {
            title: "Gravitational Time Dilation Tests - Clifford Will",
            url: "https://link.springer.com/article/10.12942/lrr-2014-4",
            snippet: "Pound-Rebka experiments and atomic clock measurements confirming relativistic time dilation.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "gps-satellite-drift",
            targetLabel: "Daily GPS Relativistic Correction",
            evidenceType: "evidence-supported",
            explanation: "Every smartphone GPS satellite counteracts 45 microseconds of daily relativistic time drift, proving black hole physics runs everyday navigation."
          }
        ],
        keyConnections: [
          { id: "black-holes-core", label: "Black Holes", note: "Extreme manifestation of time dilation" },
          { id: "event-horizon", label: "Event Horizon", note: "Where coordinate time asymptotes" }
        ]
      },
      {
        id: "hawking-radiation",
        label: "Hawking Radiation",
        type: "related",
        tagline: "Quantum particle creation near the horizon causing black holes to evaporate.",
        tags: ["Quantum Field Theory", "Thermodynamics", "Information"],
        overview: "In 1974, Stephen Hawking combined quantum field theory with general relativity to show that virtual particle pairs separated by the event horizon lead to black body thermal radiation, meaning black holes have a finite lifespan.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
        icon: "zap",
        sources: [
          {
            title: "Black hole explosions? - Stephen Hawking (Nature, 1974)",
            url: "https://www.nature.com/articles/248030a0",
            snippet: "Groundbreaking proof that quantum effects cause black holes to emit thermal radiation and slowly evaporate.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "unruh-effect",
            targetLabel: "The Unruh Acceleration Warmth",
            evidenceType: "evidence-supported",
            explanation: "Accelerating observers in a vacuum perceive a warm thermal bath, demonstrating that temperature and particles are observer-dependent relativistic phenomena."
          }
        ],
        keyConnections: [
          { id: "black-holes-core", label: "Black Holes", note: "Causes long-term evaporation" },
          { id: "information-paradox", label: "Information Paradox", note: "Triggers the mystery of lost information" }
        ]
      },
      {
        id: "information-paradox",
        label: "Information Paradox",
        type: "related",
        tagline: "Does quantum information get permanently destroyed when black holes evaporate?",
        tags: ["Quantum Mechanics", "Unitary Evolution", "String Theory"],
        overview: "Quantum mechanics dictates that information can never be destroyed (unitarity). But if a black hole evaporates purely into featureless thermal Hawking radiation, the state that formed it appears lost forever, creating modern theoretical physics' greatest dilemma.",
        imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop",
        icon: "network",
        sources: [
          {
            title: "The Black Hole War: My Battle with Stephen Hawking - Leonard Susskind",
            url: "https://www.hachettebookgroup.com/titles/leonard-susskind/the-black-hole-war/9780316016407/",
            snippet: "The history of the quantum information debate and the discovery of black hole complementarity.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "quantum-error-correction",
            targetLabel: "Spacetime as a Quantum Error Correcting Code",
            evidenceType: "speculative",
            explanation: "Recent papers by Almheiri, Dong, and Harlow model the holographic bulk spacetime as a fault-tolerant quantum error correcting code encoding boundary qubits."
          }
        ],
        keyConnections: [
          { id: "hawking-radiation", label: "Hawking Radiation", note: "Direct consequence of evaporation" },
          { id: "holographic-principle", label: "Holographic Principle", note: "Proposed resolution via boundary encoding" }
        ]
      },
      {
        id: "singularity",
        label: "Singularity",
        type: "cross",
        tagline: "The point of infinite density where general relativity breaks down.",
        tags: ["Curvature", "Penrose Theorem", "Quantum Gravity"],
        overview: "Roger Penrose proved that gravitational collapse inevitably leads to a spacetime singularity where curvature goes to infinity. It signals not physical infinity, but the breakdown of Einstein's classical equations.",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
        icon: "activity",
        sources: [
          {
            title: "Gravitational Collapse and Space-Time Singularities - Roger Penrose (1965)",
            url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.14.57",
            snippet: "Nobel Prize-winning singularity theorem proving black hole formation is an inevitable prediction of relativity.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "big-bang-cosmology",
            targetLabel: "The White Hole / Big Bang Inversion",
            evidenceType: "speculative",
            explanation: "Some loop quantum cosmology models suggest the singularity is a quantum bounce, with our universe's Big Bang originating as the white hole interior of a parent collapse."
          }
        ],
        keyConnections: [
          { id: "black-holes-core", label: "Black Holes", note: "Center of the event horizon" },
          { id: "time-dilation", label: "Time Dilation", note: "Curvature stretches time infinitely" }
        ]
      },
      {
        id: "holographic-principle",
        label: "Holographic Principle",
        type: "weird-bridge",
        tagline: "All 3D volumetric physics may be encoded on a 2D boundary screen.",
        tags: ["AdS/CFT", "String Theory", "Juan Maldacena"],
        overview: "Proposed by 't Hooft and Susskind and formalized by Maldacena's AdS/CFT correspondence, holography reveals that a gravitational theory in higher dimensions is mathematically equivalent to a quantum theory on its boundary surface.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        icon: "sparkles",
        sources: [
          {
            title: "The Large N Limit of Superconformal Field Theories - Juan Maldacena",
            url: "https://arxiv.org/abs/hep-th/9711200",
            snippet: "The most cited paper in theoretical physics establishing the AdS/CFT holographic correspondence.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "optical-hologram",
            targetLabel: "Optical Laser Holography & Phase Storage",
            evidenceType: "analogy",
            explanation: "Just as 2D photographic film recreates a complete 3D light field via coherent laser interference, boundary quantum states project physical bulk spacetime."
          }
        ],
        keyConnections: [
          { id: "information-paradox", label: "Information Paradox", note: "Demonstrates boundary unitarity" },
          { id: "black-holes-core", label: "Black Holes", note: "Inspired by Bekenstein area entropy" }
        ]
      }
    ],
    edges: [
      { id: "e-b1", source: "black-holes-core", target: "event-horizon", type: "related", label: "bounded by" },
      { id: "e-b2", source: "black-holes-core", target: "time-dilation", type: "related", label: "manifests" },
      { id: "e-b3", source: "black-holes-core", target: "singularity", type: "related", label: "contains" },
      { id: "e-b4", source: "black-holes-core", target: "hawking-radiation", type: "related", label: "emits" },
      { id: "e-b5", source: "event-horizon", target: "hawking-radiation", type: "cross", label: "generated at" },
      { id: "e-b6", source: "hawking-radiation", target: "information-paradox", type: "cross", label: "leads to" },
      { id: "e-b7", source: "information-paradox", target: "holographic-principle", type: "weird-bridge", label: "resolved by" },
      { id: "e-b8", source: "event-horizon", target: "time-dilation", type: "cross", label: "freezes time at" }
    ],
    followUps: [
      "What would you see if you fell feet-first into a supermassive black hole?",
      "How does Hawking Radiation resolve or worsen the Information Paradox?",
      "Can wormholes theoretically connect distant eras in cosmic history?"
    ]
  },

  "the-psychology-of-memories": {
    id: "the-psychology-of-memories",
    query: "The psychology of memories",
    title: "The psychology of memories",
    summary: "Reconstructive memory, false recollections, flashbulb clarity, and cognitive schemas.",
    stats: {
      conceptsCount: 7,
      connectionsCount: 8,
    },
    rootConceptId: "memory-psych-core",
    concepts: [
      {
        id: "memory-psych-core",
        label: "Memory Psychology",
        type: "core",
        tagline: "Memory is an act of imaginative reconstruction, not a video playback.",
        tags: ["Cognition", "Elizabeth Loftus", "Episodic Memory", "Neuropsychology"],
        overview: "Human memory does not store pristine recordings of our lives. Every time we retrieve a memory, our brain reconstructs the narrative from fragmented clues, altering the memory itself each time it is recalled.",
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
        icon: "book-open",
        sources: [
          {
            title: "The Malleability of Memory - Elizabeth Loftus",
            url: "https://www.psychologicalscience.org/observer/the-malleability-of-memory",
            snippet: "Groundbreaking legal psychology experiments revealing the ease of implanting false memories.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "git-commit-amend",
            targetLabel: "Git History Rewriting (Rebase)",
            evidenceType: "analogy",
            explanation: "When you run 'git commit --amend', you replace an old snapshot with a new hash without leaving traces of the intermediate edit—exactly how memory reconsolidation silently edits human pasts."
          }
        ],
        keyConnections: [
          { id: "reconsolidation", label: "Memory Reconsolidation", note: "Memories become fragile during recall" },
          { id: "false-memories", label: "False Memories", note: "Believing things that never happened" },
          { id: "flashbulb-memories", label: "Flashbulb Clarity", note: "High confidence vs accuracy" }
        ]
      },
      {
        id: "reconsolidation",
        label: "Reconsolidation",
        type: "related",
        tagline: "Retrieving a memory puts it back into an editable chemical state.",
        tags: ["Neurochemistry", "Protein Synthesis", "Therapy"],
        overview: "Discovered in rodent fear conditioning by Nader, reconsolidation proved that retrieved memories require protein synthesis to be restabilized, offering a therapeutic window to treat PTSD and phobias.",
        imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop",
        icon: "activity",
        sources: [
          {
            title: "Fear memories require protein synthesis in the amygdala - Karim Nader (Nature)",
            url: "https://www.nature.com/articles/35021052",
            snippet: "Proves stored memories are dynamic and chemically malleable upon reactivation.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "cryptographic-tamper",
            targetLabel: "Read-Disturb in Flash Solid-State Memory",
            evidenceType: "analogy",
            explanation: "In NAND flash memory, repeatedly reading cells leaks charge into adjacent cells ('read-disturb'), corrupting adjacent stored bits just like frequent memory recall subtly reshapes memories."
          }
        ],
        keyConnections: [
          { id: "memory-psych-core", label: "Memory Psychology", note: "The biological engine of memory malleability" },
          { id: "false-memories", label: "False Memories", note: "How edits become permanent recollections" }
        ]
      },
      {
        id: "false-memories",
        label: "False Memories",
        type: "related",
        tagline: "Vivid, emotionally compelling recollections of events that never occurred.",
        tags: ["Misinformation Effect", "Legal Testimony", "Suggestibility"],
        overview: "In Loftus's 'Lost in the Mall' study, over 25% of participants developed detailed, emotionally resonant memories of being lost as children after simple family suggestions, demonstrating memory's reconstructive vulnerability.",
        imageUrl: "https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=1000&auto=format&fit=crop",
        icon: "eye",
        sources: [
          {
            title: "Reconstruction of Automobile Destruction - Loftus & Palmer (1974)",
            url: "https://www.sciencedirect.com/science/article/pii/S0022537174800113",
            snippet: "Shows changing a single verb (smashed vs hit) radically shifts remembered vehicle speeds and broken glass reports.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "deepfakes-ai",
            targetLabel: "Synthetic Deepfake Hallucinations",
            evidenceType: "analogy",
            explanation: "Generative AI infills missing prompt details with hallucinatory plausibility, functioning identically to human confabulation filling autobiographical memory gaps."
          }
        ],
        keyConnections: [
          { id: "memory-psych-core", label: "Memory Psychology", note: "Primary experimental proof" },
          { id: "reconsolidation", label: "Reconsolidation", note: "Biological substrate enabling false additions" }
        ]
      },
      {
        id: "flashbulb-memories",
        label: "Flashbulb Memories",
        type: "cross",
        tagline: "Extraordinary subjective vividness paired with surprising factual decay.",
        tags: ["Trauma", "Amygdala", "Confidence Gap"],
        overview: "Brown and Kulik coined 'flashbulb memories' for national tragedies like JFK or 9/11. While individuals feel absolute 100% certainty about their vivid recollections, repeated testing proves their objective accuracy decays at the same rate as mundane memories.",
        imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1000&auto=format&fit=crop",
        icon: "zap",
        sources: [
          {
            title: "Flashbulb Memories - Brown & Kulik (Cognition, 1977)",
            url: "https://www.sciencedirect.com/science/article/pii/001002777790018X",
            snippet: "The foundational psychological study measuring personal vividness during catastrophic historical moments.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "overfitting-ai",
            targetLabel: "Neural Network Overfitting to Outliers",
            evidenceType: "speculative",
            explanation: "Flashbulb memories represent the biological brain over-weighting a high-salience loss-function spike, locking high subjective weights despite noisy sensory data."
          }
        ],
        keyConnections: [
          { id: "memory-psych-core", label: "Memory Psychology", note: "Subjective confidence vs reality" },
          { id: "false-memories", label: "False Memories", note: "Why confident witnesses can still be wrong" }
        ]
      },
      {
        id: "hippocampus-encoding",
        label: "Hippocampal Indexing",
        type: "related",
        tagline: "The medial temporal lobe structure acting as a central directory of experience.",
        tags: ["Neuroanatomy", "Patient H.M.", "Episodic Routing"],
        overview: "The hippocampus does not store entire memories forever; it acts as a pointer or index, coordinating cortical reactivation across occipital, temporal, and prefrontal lobes during recall until systems consolidation transfers memories to the neocortex.",
        imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop",
        icon: "brain",
        sources: [
          {
            title: "Loss of Recent Memory After Bilateral Hippocampal Lesions - Scoville & Milner (1957)",
            url: "https://jnnp.bmj.com/content/20/1/11",
            snippet: "The historic case of Patient H.M. demonstrating the hippocampus's indispensable role in forming new episodic memories.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "b-tree-indexing",
            targetLabel: "Database B-Tree Secondary Indexes",
            evidenceType: "analogy",
            explanation: "The hippocampus operates like an in-memory database index storing row pointers rather than bloated table blobs, fetching disparate cortical columns on demand."
          }
        ],
        keyConnections: [
          { id: "memory-psych-core", label: "Memory Psychology", note: "Anatomical core of episodic memory" },
          { id: "reconsolidation", label: "Reconsolidation", note: "Site of synaptic plasticity during retrieval" }
        ]
      },
      {
        id: "schema-theory",
        label: "Schema Theory",
        type: "cross",
        tagline: "Pre-existing mental frameworks that filter and bias incoming perceptions.",
        tags: ["Frederic Bartlett", "Cognitive Biases", "Stereotypes"],
        overview: "Introduced by Sir Frederic Bartlett, schema theory showed that when British students recalled Native American folk tales ('War of the Ghosts'), they unconsciously omitted supernatural elements and normalized details to match their European cultural schemas.",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
        icon: "mountain",
        sources: [
          {
            title: "Remembering: An Experimental and Social Study - Frederic Bartlett (1932)",
            url: "https://wellcomecollection.org/works/y975e533",
            snippet: "The classic text introducing schema theory and demonstrating cultural distortion during serial reproduction.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "lossy-compression",
            targetLabel: "JPEG Discrete Cosine Transform Compression",
            evidenceType: "analogy",
            explanation: "Schemas perform perceptual lossy compression: discarding unpredictable high-frequency narrative data and saving only broad low-frequency expectations."
          }
        ],
        keyConnections: [
          { id: "false-memories", label: "False Memories", note: "Direct driver of narrative distortion" },
          { id: "memory-psych-core", label: "Memory Psychology", note: "Organizing framework of recall" }
        ]
      },
      {
        id: "reminiscence-bump",
        label: "The Reminiscence Bump",
        type: "related",
        tagline: "Why older adults disproportionately remember events from ages 15 to 25.",
        tags: ["Autobiography", "Identity Formation", "Aging"],
        overview: "Psychological surveys consistently discover that adults over 40 have vivid, disproportionately dense recollections from their late adolescence and twenties—the pivotal decade of identity formation, first loves, and life-shaping career milestones.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
        icon: "sunset",
        sources: [
          {
            title: "The Reminiscence Bump in Autobiographical Memory - Rubin et al.",
            url: "https://link.springer.com/chapter/10.1007/978-1-4612-4948-1_10",
            snippet: "Quantitative psychometric documentation of preferential lifetime recall peaks.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "critical-periods-plasticity",
            targetLabel: "Epigenetic Ocular Dominance Plasticity",
            evidenceType: "evidence-supported",
            explanation: "Neurobiological critical periods in early development mirror cognitive identity formation, locking neural circuits via perineuronal nets."
          }
        ],
        keyConnections: [
          { id: "memory-psych-core", label: "Memory Psychology", note: "Autobiographical distribution curve" },
          { id: "hippocampus-encoding", label: "Hippocampal Indexing", note: "Enhanced emotional encoding during novelty" }
        ]
      }
    ],
    edges: [
      { id: "e-m1", source: "memory-psych-core", target: "reconsolidation", type: "related", label: "governed by" },
      { id: "e-m2", source: "memory-psych-core", target: "false-memories", type: "related", label: "vulnerable to" },
      { id: "e-m3", source: "memory-psych-core", target: "hippocampus-encoding", type: "related", label: "indexed by" },
      { id: "e-m4", source: "memory-psych-core", target: "flashbulb-memories", type: "cross", label: "perceives" },
      { id: "e-m5", source: "reconsolidation", target: "false-memories", type: "cross", label: "facilitates" },
      { id: "e-m6", source: "false-memories", target: "schema-theory", type: "cross", label: "shaped by" },
      { id: "e-m7", source: "hippocampus-encoding", target: "reminiscence-bump", type: "related", label: "encodes peak in" },
      { id: "e-m8", source: "flashbulb-memories", target: "schema-theory", type: "cross", label: "normalizes via" }
    ],
    followUps: [
      "Why do emotional flashbulb memories feel so vivid even when factually inaccurate?",
      "Can memory reconsolidation therapy completely erase irrational phobias?",
      "How do cultural schemas subtly rewrite eyewitness legal testimony?"
    ]
  },

  "are-we-alone-in-the-universe": {
    id: "are-we-alone-in-the-universe",
    query: "Are we alone in the universe?",
    title: "Are we alone in the universe?",
    summary: "The Fermi Paradox, Drake Equation, Great Filters, and biosignature exploration.",
    stats: {
      conceptsCount: 7,
      connectionsCount: 8,
    },
    rootConceptId: "fermi-paradox",
    concepts: [
      {
        id: "fermi-paradox",
        label: "The Fermi Paradox",
        type: "core",
        tagline: "If intelligent life is natural, where is everybody?",
        tags: ["Astrobiology", "SETI", "Cosmology", "Drake Equation"],
        overview: "Given the billons of habitable exoplanets in our galaxy and the age of the cosmos, intelligent civilizations should have spread across the stars millions of years ago. The apparent silence of the cosmos is the Fermi Paradox.",
        imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
        icon: "compass",
        sources: [
          {
            title: "Where is Everybody? An Examination of the Fermi Paradox - Stephen Webb",
            url: "https://link.springer.com/book/10.1007/978-0-387-74065-2",
            snippet: "Thorough review of 75 proposed scientific solutions to cosmic solitude.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "deep-ocean-vent-isolation",
            targetLabel: "Sub-Glacial Ocean Biospheres (Europa & Enceladus)",
            evidenceType: "evidence-supported",
            explanation: "Liquid oceans under miles of ice on Europa and Enceladus may teem with chemoautotrophic life that can never see the sky, unaware that outer space even exists."
          }
        ],
        keyConnections: [
          { id: "great-filter", label: "The Great Filter", note: "The evolutionary wall preventing civilization" },
          { id: "drake-equation", label: "The Drake Equation", note: "Estimating communicable civilizations" },
          { id: "biosignatures", label: "Atmospheric Biosignatures", note: "Detecting alien life with JWST" }
        ]
      },
      {
        id: "great-filter",
        label: "The Great Filter",
        type: "related",
        tagline: "An evolutionary hurdle so difficult that almost no species survives it.",
        tags: ["Robin Hanson", "Extinction", "Future of Humanity"],
        overview: "Robin Hanson proposed that some transition—abiogenesis, eukaryote evolution, tool use, or surviving nuclear / AI technological childhood—is astronomically rare or fatal. If the filter lies ahead, humanity faces high extinction risk.",
        imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
        icon: "shield",
        sources: [
          {
            title: "The Great Filter - Are We Almost Past It? - Robin Hanson",
            url: "https://mason.gmu.edu/~rhanson/greatfilter.html",
            snippet: "The foundational essay defining the probabilistic filtration steps of intelligent life.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "dark-forest-hypothesis",
            targetLabel: "The Dark Forest Game Theory",
            evidenceType: "speculative",
            explanation: "Liu Cixin's cosmic sociology posits that civilizations stay deliberately quiet because mutual suspicion makes pre-emptive annihilation the only rational defensive move."
          }
        ],
        keyConnections: [
          { id: "fermi-paradox", label: "The Fermi Paradox", note: "Primary theoretical resolution" },
          { id: "rare-earth-hypothesis", label: "Rare Earth Hypothesis", note: "Proposes the filter is far behind us" }
        ]
      },
      {
        id: "drake-equation",
        label: "The Drake Equation",
        type: "related",
        tagline: "A probabilistic framework for estimating active, communicative civilizations.",
        tags: ["Frank Drake", "N = R* · fp · ne · fl · fi · fc · L", "SETI"],
        overview: "Formulated by Frank Drake in 1961 for the Green Bank conference, this equation multiplies star formation rate, fraction of stars with planets, habitable worlds, origins of life, intelligence, radio technology, and civilization lifetime.",
        imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop",
        icon: "network",
        sources: [
          {
            title: "The Drake Equation: Estimating the Number of Alien Civilizations - SETI Institute",
            url: "https://www.seti.org/drake-equation-index",
            snippet: "The historical foundation and modern exoplanet parameters informing Drake's formula.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "doomsday-argument",
            targetLabel: "Carter's Anthropic Doomsday Argument",
            evidenceType: "speculative",
            explanation: "Using Bayesian probability, Brandon Carter argued that if humans are typical observers, our species is likely near its midpoint, bounding parameter 'L' to centuries."
          }
        ],
        keyConnections: [
          { id: "fermi-paradox", label: "The Fermi Paradox", note: "Mathematical framework quantifying the puzzle" },
          { id: "kardashev-scale", label: "The Kardashev Scale", note: "Civilization energy consumption tier" }
        ]
      },
      {
        id: "biosignatures",
        label: "Biosignatures",
        type: "related",
        tagline: "Spectroscopic fingerprints of biological metabolisms on distant worlds.",
        tags: ["JWST", "Methane-Oxygen Disequilibrium", "Exoplanets"],
        overview: "Astronomers analyze starlight filtering through exoplanet atmospheres using the James Webb Space Telescope. The simultaneous presence of oxygen and methane in thermodynamic disequilibrium strongly suggests active biological replenishment.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
        icon: "eye",
        sources: [
          {
            title: "Astrophysical Biosignatures in Exoplanetary Atmospheres - Sara Seager (Science)",
            url: "https://www.science.org/doi/10.1126/science.1232203",
            snippet: "Comprehensive guide to photochemical equilibrium and spectroscopic biomarker gases.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "chlorophyll-red-edge",
            targetLabel: "The Botanical Vegetation 'Red Edge' Glint",
            evidenceType: "evidence-supported",
            explanation: "Earth's plant chlorophyll creates an abrupt 700nm spectral reflectance jump ('red edge') visible from deep space, serving as a template to identify alien flora."
          }
        ],
        keyConnections: [
          { id: "fermi-paradox", label: "The Fermi Paradox", note: "Empirical pathway to the first detection" },
          { id: "rare-earth-hypothesis", label: "Rare Earth Hypothesis", note: "Testing how common biospheres are" }
        ]
      },
      {
        id: "rare-earth-hypothesis",
        label: "Rare Earth Hypothesis",
        type: "cross",
        tagline: "Complex multicellular life requires an exceptionally improbable planetary cocktail.",
        tags: ["Plate Tectonics", "Jupiter Shield", "Magnetic Dynamo"],
        overview: "Peter Ward and Donald Brownlee argue that while microbial life may be common in the universe, complex animal life requires an astonishingly rare convergence: a large stabilizing moon, plate tectonics, a protective gas giant, and a stable magnetic dynamo.",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
        icon: "mountain",
        sources: [
          {
            title: "Rare Earth: Why Complex Life Is Uncommon in the Universe - Ward & Brownlee",
            url: "https://link.springer.com/book/10.1007/b97457",
            snippet: "Synthesizes geology, astrobiology, and paleontological hurdles separating microbes from complex multicellularity.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "endosymbiosis-fluke",
            targetLabel: "Eukaryotic Mitochondrial Endosymbiosis",
            evidenceType: "evidence-supported",
            explanation: "All complex life on Earth traces to a single chance engulfment of an alpha-proteobacterium by an archaeon 1.8 billion years ago, which may be a once-in-a-galaxy biological fluke."
          }
        ],
        keyConnections: [
          { id: "great-filter", label: "The Great Filter", note: "Places the bottleneck at multicellular evolution" },
          { id: "biosignatures", label: "Biosignatures", note: "Predicts simple microbes are abundant but quiet" }
        ]
      },
      {
        id: "kardashev-scale",
        label: "The Kardashev Scale",
        type: "cross",
        tagline: "Classifying galactic civilizations by their total energy utilization.",
        tags: ["Type I, II, III", "Dyson Spheres", "Mega-engineering"],
        overview: "Soviet astrophysicist Nikolai Kardashev categorized technological civilizations into Type I (planetary energy), Type II (entire star energy via Dyson spheres), and Type III (galaxy-wide power). Humanity currently sits at approximately 0.73.",
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
        icon: "cpu",
        sources: [
          {
            title: "Transmission of Information by Extraterrestrial Civilizations - Nikolai Kardashev (1964)",
            url: "https://adsabs.harvard.edu/full/1964SvA.....8..217K",
            snippet: "The foundational paper defining energy-based civilization classifications.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "infrared-waste-heat",
            targetLabel: "Thermodynamic Waste Heat Signatures",
            evidenceType: "evidence-supported",
            explanation: "Second law of thermodynamics demands any mega-engineering Dyson swarm must radiate mid-infrared waste heat, giving SETI infrared telescopes like WISE direct targets."
          }
        ],
        keyConnections: [
          { id: "drake-equation", label: "The Drake Equation", note: "Defines maximum technological lifespan L" },
          { id: "fermi-paradox", label: "The Fermi Paradox", note: "Absence of Type III Dyson swarms deepens paradox" }
        ]
      },
      {
        id: "dark-forest-theory",
        label: "The Dark Forest",
        type: "weird-bridge",
        tagline: "The universe is a silent forest where every civilization is an armed hunter.",
        tags: ["Cosmic Sociology", "Game Theory", "Prisoner's Dilemma"],
        overview: "Popularized by Liu Cixin's sci-fi trilogy and debated by philosophers, this game-theoretic solution to the Fermi Paradox argues that civilizational chains of suspicion and exponential technological explosion make preemptive silence or destruction the dominant survival strategy.",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
        icon: "zap",
        sources: [
          {
            title: "The Dark Forest - Liu Cixin",
            url: "https://www.torforgeblog.com/2015/08/11/the-dark-forest-by-cixin-liu/",
            snippet: "The seminal philosophical exploration of cosmic sociology and strategic communication silence.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "submarine-passive-sonar",
            targetLabel: "Submarine Silent Running in Naval Warfare",
            evidenceType: "analogy",
            explanation: "Nuclear submarines run silently on passive sonar because pinging active sonar reveals their position to hostile torpedoes, mirroring cosmic SETI transmission caution."
          }
        ],
        keyConnections: [
          { id: "fermi-paradox", label: "The Fermi Paradox", note: "Explains why no one broadcasts" },
          { id: "great-filter", label: "The Great Filter", note: "Creates an artificial survival filter" }
        ]
      }
    ],
    edges: [
      { id: "e-f1", source: "fermi-paradox", target: "great-filter", type: "related", label: "explained by" },
      { id: "e-f2", source: "fermi-paradox", target: "drake-equation", type: "related", label: "quantified by" },
      { id: "e-f3", source: "fermi-paradox", target: "biosignatures", type: "related", label: "investigated via" },
      { id: "e-f4", source: "fermi-paradox", target: "rare-earth-hypothesis", type: "related", label: "resolved by" },
      { id: "e-f5", source: "great-filter", target: "dark-forest-theory", type: "weird-bridge", label: "enforced by" },
      { id: "e-f6", source: "drake-equation", target: "kardashev-scale", type: "cross", label: "scales into" },
      { id: "e-f7", source: "biosignatures", target: "rare-earth-hypothesis", type: "cross", label: "tests" },
      { id: "e-f8", source: "kardashev-scale", target: "fermi-paradox", type: "cross", label: "deepens silence" }
    ],
    followUps: [
      "Would discovering primitive microbial life on Mars be good or bad news for humanity?",
      "How could James Webb Space Telescope detect atmospheric pollutants from alien industry?",
      "Is technological intelligence an evolutionary fluke rather than an inevitable adaptation?"
    ]
  }
};

// Realistic node expansion mock data when user clicks "Explore Deeper" on a concept in demo mode
export const conceptExpansions = {
  "rem-sleep": {
    newConcepts: [
      {
        id: "rem-atonia",
        label: "REM Atonia",
        type: "related",
        tagline: "Motor neuron inhibition preventing acting out dreams.",
        tags: ["Neurochemistry", "Glycine", "GABA"],
        overview: "REM sleep atonia actively suppresses skeletal muscle tone via inhibitory glycine and GABA signaling from the pons to spinal motor neurons, preventing injuries from thrashing during dreams.",
        imageUrl: "https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=800&auto=format&fit=crop",
        icon: "shield",
        sources: [
          {
            title: "Mechanisms of REM sleep atonia - Sleep Medicine Reviews",
            url: "https://pubmed.ncbi.nlm.nih.gov/18314350/",
            snippet: "Elucidates glycinergic pontine descending pathways controlling muscular paralysis.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "sleep-paralysis-hallucinations",
            targetLabel: "Sleep Paralysis & Shadow Figures",
            evidenceType: "evidence-supported",
            explanation: "When atonia lingers for seconds after waking, the conscious mind rationalizes the paralysis through waking hypnopompic hallucinations, historically interpreted worldwide as demons or alien abductions."
          }
        ],
        keyConnections: [
          { id: "rem-sleep", label: "REM Sleep", note: "Primary biological protective mechanism" }
        ]
      },
      {
        id: "pgo-waves",
        label: "PGO Waves",
        type: "related",
        tagline: "Electrical bursts initiating sensory dream hallucinations.",
        tags: ["Pontine-Geniculate-Occipital", "EEG", "Sensory cortex"],
        overview: "Ponto-geniculo-occipital (PGO) waves are intense electrical volleys originating in the pons, traveling through the lateral geniculate nucleus of the thalamus, and terminating in the occipital visual cortex, sparking internal visual imagery.",
        imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
        icon: "zap",
        sources: [
          {
            title: "PGO Waves in Mammals - Journal of Sleep Research",
            url: "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1365-2869.2009.00767.x",
            snippet: "Documents the timing and pacemaker spikes preceding REM dream epiphanies.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "crt-raster-scans",
            targetLabel: "Cathode Ray Raster Scan Lines",
            evidenceType: "analogy",
            explanation: "PGO waves fire at rhythmic intervals to refresh internal occipital visual buffers, behaving much like electron beam sweeps illuminating phosphor pixels on vintage monitors."
          }
        ],
        keyConnections: [
          { id: "rem-sleep", label: "REM Sleep", note: "Generates visual raw material for dreams" }
        ]
      }
    ],
    newEdges: [
      { id: "exp-e1", source: "rem-sleep", target: "rem-atonia", type: "related", label: "induces" },
      { id: "exp-e2", source: "rem-sleep", target: "pgo-waves", type: "related", label: "driven by" }
    ]
  },

  "lucid-dreaming": {
    newConcepts: [
      {
        id: "metacognition",
        label: "Metacognitive Monitoring",
        type: "related",
        tagline: "Thinking about one's own thinking within dream states.",
        tags: ["Prefrontal Cortex", "Self-Reflection", "Cognitive Control"],
        overview: "Metacognition allows humans to evaluate their own cognitive processes. In lucid dreaming, this metacognitive loop reactivates, permitting the dreamer to realize 'this is not waking reality' while maintaining vivid immersion.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
        icon: "compass",
        sources: [
          {
            title: "Metacognition in Dream States - Consciousness and Cognition",
            url: "https://www.sciencedirect.com/science/article/pii/S1053810012000543",
            snippet: "Prefrontal volume correlates positively with lucid dreaming frequency.",
            isVerified: true
          }
        ],
        weirdBridges: [
          {
            targetConceptId: "virtual-machine-sandbox",
            targetLabel: "OS Hypervisors & Sandboxes",
            evidenceType: "analogy",
            explanation: "A virtual machine hypervisor monitors and pauses guest operating systems without crashing the physical host machine, precisely how metacognition operates inside a lucid dream."
          }
        ],
        keyConnections: [
          { id: "lucid-dreaming", label: "Lucid Dreaming", note: "Core cognitive faculty behind dream lucidity" }
        ]
      }
    ],
    newEdges: [
      { id: "exp-e3", source: "lucid-dreaming", target: "metacognition", type: "related", label: "enabled by" }
    ]
  }
};
