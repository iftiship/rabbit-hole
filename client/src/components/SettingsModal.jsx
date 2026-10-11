import React from 'react';
import { X, Settings, Sparkles, Search, Key, ShieldCheck, Database, RefreshCw } from 'lucide-react';

export function SettingsModal({ isOpen, onClose, backendStatus, onResetData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-[#ECE7DF] shadow-soft-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#ECE7DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-purple-brand" />
            <h2 className="font-serif text-lg font-bold text-charcoal-900">
              Settings & API Configuration
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-cream-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-charcoal-700 text-xs">
          {/* Status Overview */}
          <div className="space-y-3">
            <h3 className="font-sans font-bold uppercase tracking-wider text-charcoal-500">
              Current Environment
            </h3>

            <div className="p-4 rounded-2xl border border-[#ECE7DF] bg-cream-50 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-brand" />
                  <span className="font-semibold text-charcoal-800">Gemini AI Synthesis</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-semibold ${
                    backendStatus?.geminiConfigured
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {backendStatus?.geminiConfigured ? 'Live AI Mode' : 'Curated Demo Mode'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-charcoal-800">Tavily Web Research</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-semibold ${
                    backendStatus?.tavilyConfigured
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-cream-200 text-charcoal-600 border border-[#E0DBD2]'
                  }`}
                >
                  {backendStatus?.tavilyConfigured ? 'Active' : 'Curated Sources'}
                </span>
              </div>
            </div>
          </div>

          {/* How to add API keys */}
          <div className="space-y-2">
            <h3 className="font-sans font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-purple-brand" />
              <span>How to Configure Live AI Keys</span>
            </h3>
            <p className="leading-relaxed text-charcoal-600">
              To generate knowledge graphs on any custom question, copy <code className="bg-cream-200 px-1 py-0.5 rounded text-charcoal-900 font-mono">.env.example</code> to <code className="bg-cream-200 px-1 py-0.5 rounded text-charcoal-900 font-mono">.env</code> in the project root:
            </p>
            <pre className="p-3 bg-charcoal-900 text-cream-100 rounded-xl font-mono text-[11px] overflow-x-auto">
{`GEMINI_API_KEY=your_gemini_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
PORT=5001`}
            </pre>
            <p className="text-[11px] text-charcoal-500">
              Keys are strictly kept server-side and never exposed to the browser client or git.
            </p>
          </div>

          {/* About Weird Bridges */}
          <div className="p-4 rounded-2xl bg-purple-surface/50 border border-purple-200 space-y-2">
            <h3 className="font-sans font-bold text-xs text-purple-brand uppercase tracking-wider">
              Signature Feature: Weird Bridges
            </h3>
            <p className="leading-relaxed text-charcoal-700">
              Rabbit Hole discovers unexpected connections across disparate disciplines, categorizing them into:
            </p>
            <ul className="space-y-1 pl-1">
              <li><strong className="text-emerald-700">● Evidence-supported:</strong> Peer-reviewed empirical research.</li>
              <li><strong className="text-amber-700">▲ Speculative:</strong> Emerging theoretical proposals.</li>
              <li><strong className="text-purple-brand">◈ Analogy:</strong> Structural isomorphism between distant systems.</li>
            </ul>
          </div>

          {/* Local storage management */}
          <div className="pt-2 flex items-center justify-between border-t border-[#ECE7DF]">
            <div>
              <span className="font-semibold text-charcoal-800 block">Reset Local Data</span>
              <span className="text-[11px] text-charcoal-500">Clear saved maps and history from localStorage</span>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset all saved maps and local bookmarks?')) {
                  onResetData();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
