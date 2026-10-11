import React from 'react';
import {
  ArrowLeft,
  Bookmark,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Layers,
  HelpCircle,
  Network,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { getThematicImageUrl } from '../utils/imageService.js';

// Helper to normalize evidence types
function getNormalizedEvidenceType(type) {
  const norm = String(type || '').toLowerCase().replace(/_/g, '-');
  if (norm.includes('evidence') || norm.includes('empirical') || norm.includes('peer-reviewed')) {
    return 'evidence-supported';
  }
  if (norm.includes('speculat') || norm.includes('theory') || norm.includes('hypothesis')) {
    return 'speculative';
  }
  return 'analogy';
}

function getReliableSourceUrl(src, conceptLabel) {
  if (src.url && typeof src.url === 'string' && src.url.startsWith('http')) {
    return src.url;
  }
  const query = encodeURIComponent(`${src.title || conceptLabel} research paper`);
  return `https://scholar.google.com/scholar?q=${query}`;
}

function getDomainFromUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return 'scholar.google.com';
  }
}

export function DetailsPanel({
  concept,
  onBackToGraph,
  onSelectConceptById,
  onExploreDeeper,
  isExpanding,
  isBookmarked,
  onToggleBookmark,
  onAskFollowUp,
  followUpQuestions = [],
}) {
  if (!concept) {
    return (
      <aside className="w-full lg:w-96 bg-white border-l border-[#ECE7DF] h-full p-6 flex flex-col items-center justify-center text-center text-charcoal-400">
        <Network className="w-10 h-10 mb-3 text-purple-brand/40" />
        <p className="font-serif text-lg text-charcoal-700 font-medium">Select a concept</p>
        <p className="text-xs text-charcoal-500 mt-1 max-w-[220px]">
          Click on any node in the knowledge graph to view deep explanations, sources, and Weird Bridges.
        </p>
      </aside>
    );
  }

  // Evidence badge color map
  const getEvidenceBadge = (rawType) => {
    const type = getNormalizedEvidenceType(rawType);
    switch (type) {
      case 'evidence-supported':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-soft-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Evidence-supported
          </span>
        );
      case 'speculative':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300 shadow-soft-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Speculative
          </span>
        );
      case 'analogy':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200 shadow-soft-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Analogy
          </span>
        );
    }
  };

  const getEvidenceDescription = (rawType) => {
    const type = getNormalizedEvidenceType(rawType);
    switch (type) {
      case 'evidence-supported':
        return 'Documented empirical research & peer-reviewed literature';
      case 'speculative':
        return 'Theoretical hypothesis & emerging scientific exploration';
      case 'analogy':
      default:
        return 'Cross-disciplinary conceptual isomorphism';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'core':
        return 'bg-purple-light text-purple-brand border-purple-200';
      case 'weird-bridge':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'cross':
        return 'bg-violet-100 text-violet-800 border-violet-200';
      default:
        return 'bg-cream-200 text-charcoal-700 border-[#E0DBD2]';
    }
  };

  return (
    <aside className="w-full lg:w-96 bg-white border-l border-[#ECE7DF] h-full flex flex-col overflow-y-auto">
      {/* Top Bar: Back button & Bookmark toggle */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 px-5 py-3.5 border-b border-[#ECE7DF] flex items-center justify-between">
        <button
          onClick={onBackToGraph}
          className="flex items-center gap-1.5 text-xs font-medium text-charcoal-600 hover:text-purple-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to graph</span>
        </button>

        <button
          onClick={() => onToggleBookmark(concept)}
          className={`p-2 rounded-lg border transition-standard ${
            isBookmarked
              ? 'bg-purple-light text-purple-brand border-purple-brand/30'
              : 'text-charcoal-500 border-transparent hover:bg-cream-100 hover:text-charcoal-800'
          }`}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark this concept'}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this concept'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5 space-y-6 flex-1">
        {/* Hero Concept Image Banner */}
        {(() => {
          const isValidUrl =
            concept.imageUrl &&
            typeof concept.imageUrl === 'string' &&
            concept.imageUrl.startsWith('http') &&
            !concept.imageUrl.includes('placeholder');

          const heroImg = isValidUrl
            ? concept.imageUrl
            : getThematicImageUrl(concept.label, concept.tags, concept.overview);

          return (
            <div className="h-44 w-full rounded-2xl overflow-hidden shadow-soft-sm relative border border-[#EBE6DC] bg-cream-200">
              <img
                src={heroImg}
                alt={concept.label}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getThematicImageUrl(concept.label, concept.tags, concept.overview);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            </div>
          );
        })()}

        {/* Title, Badge & Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900 tracking-tight">
              {concept.label}
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${getTypeBadge(
                concept.type
              )}`}
            >
              {concept.type === 'core'
                ? 'Core Concept'
                : concept.type === 'weird-bridge'
                ? 'Weird Bridge'
                : 'Related Concept'}
            </span>
          </div>

          <p className="text-xs text-charcoal-500 font-sans leading-relaxed">
            {concept.tagline}
          </p>
        </div>

        {/* Topic Tags */}
        {concept.tags && concept.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {concept.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#F5F2EB] text-charcoal-700 border border-[#E9E4DC]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Overview Section */}
        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2">
            Overview
          </h3>
          <p className="text-xs text-charcoal-700 leading-relaxed font-sans">
            {concept.overview}
          </p>
        </div>

        {/* Key Connections */}
        {concept.keyConnections && concept.keyConnections.length > 0 && (
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2.5">
              Key Connections
            </h3>
            <div className="space-y-1.5">
              {concept.keyConnections.map((conn) => (
                <div
                  key={conn.id}
                  onClick={() => onSelectConceptById(conn.id)}
                  className="group flex items-center justify-between p-2.5 rounded-xl border border-[#ECE7DF] hover:border-purple-brand/40 hover:bg-purple-surface/40 cursor-pointer transition-standard"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded-full bg-cream-200 group-hover:bg-purple-light flex items-center justify-center flex-shrink-0 text-purple-brand">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-charcoal-800 group-hover:text-purple-brand truncate">
                        {conn.label}
                      </p>
                      {conn.note && (
                        <p className="text-[11px] text-charcoal-400 truncate">
                          {conn.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-charcoal-400 group-hover:text-purple-brand group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Signature Feature: Weird Bridges */}
        {concept.weirdBridges && concept.weirdBridges.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-amber-900">
                  Weird Bridges
                </h3>
              </div>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-medium">
                Cross-Disciplinary
              </span>
            </div>

            <div className="space-y-3">
              {concept.weirdBridges.map((bridge, idx) => {
                const normType = getNormalizedEvidenceType(bridge.evidenceType);
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FCFAF6] border border-amber-200/90 shadow-soft-xs hover:border-amber-300 hover:shadow-soft-sm transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-serif text-sm font-bold text-charcoal-900 tracking-tight">
                          {bridge.targetLabel}
                        </h4>
                        <p className="text-[10px] text-charcoal-500 mt-0.5">
                          {getEvidenceDescription(normType)}
                        </p>
                      </div>
                      {getEvidenceBadge(normType)}
                    </div>

                    <p className="text-xs text-charcoal-700 leading-relaxed font-sans">
                      {bridge.explanation}
                    </p>

                    {bridge.targetConceptId && (
                      <button
                        onClick={() => onSelectConceptById(bridge.targetConceptId)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-brand hover:text-purple-hover transition-colors pt-1"
                      >
                        <span>View concept in graph</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sources & Citations */}
        {concept.sources && concept.sources.length > 0 && (
          <div>
            <div className="mb-2.5">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-charcoal-500">
                  Sources & Empirical Evidence
                </h3>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Peer-reviewed / Factual
                </span>
              </div>
              <p className="text-[11px] text-charcoal-500 mt-1 leading-normal">
                Clickable citations ground factual claims. Analogies and speculations in Weird Bridges are distinguished as conceptual models.
              </p>
            </div>

            <div className="space-y-2.5">
              {concept.sources.map((src, i) => {
                const targetUrl = getReliableSourceUrl(src, concept.label);
                const domain = getDomainFromUrl(targetUrl);
                return (
                  <a
                    key={i}
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl border border-[#ECE7DF] hover:border-purple-brand/50 bg-[#FCFAF7] hover:bg-white transition-standard group shadow-soft-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-cream-200 text-charcoal-600 border border-[#E5E0D8]">
                            {domain}
                          </span>
                          {src.isVerified && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Verified Empirical Citation
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-charcoal-900 group-hover:text-purple-brand leading-snug">
                          {src.title}
                        </p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-purple-brand flex-shrink-0 mt-1" />
                    </div>
                    {src.snippet && (
                      <p className="text-[11px] text-charcoal-600 mt-1.5 leading-relaxed line-clamp-3">
                        "{src.snippet}"
                      </p>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Primary Action: Explore Deeper */}
        <div className="pt-2 space-y-3">
          <button
            onClick={() => onExploreDeeper(concept)}
            disabled={isExpanding}
            className="w-full py-3 px-4 rounded-xl bg-purple-brand text-white font-sans text-xs font-semibold shadow-soft hover:bg-purple-hover active:scale-[0.99] transition-standard flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isExpanding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Unearthing connections...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Explore deeper →</span>
              </>
            )}
          </button>

          {/* Follow-up Questions */}
          {followUpQuestions.length > 0 && (
            <div className="pt-3 border-t border-[#ECE7DF]">
              <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-charcoal-600">
                <HelpCircle className="w-3.5 h-3.5 text-purple-brand" />
                <span>Follow-up questions</span>
              </div>
              <div className="space-y-1.5">
                {followUpQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAskFollowUp(q)}
                    className="w-full text-left p-2 rounded-lg text-[11px] text-charcoal-700 bg-cream-200/80 hover:bg-purple-light hover:text-purple-brand transition-colors leading-relaxed block"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
