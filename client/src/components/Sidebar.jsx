import React from 'react';
import { Compass, BookOpen, Bookmark, Settings, History } from 'lucide-react';

export function Sidebar({
  activeNav,
  setActiveNav,
  recentExplorations,
  currentQuery,
  onSelectQuery,
  onOpenMyMaps,
  onOpenSaved,
  onOpenSettings,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const handleNavClick = (nav) => {
    setActiveNav(nav);
    if (nav === 'my-maps') onOpenMyMaps();
    if (nav === 'saved') onOpenSaved();
    if (nav === 'settings') onOpenSettings();
    if (isMobileOpen) setIsMobileOpen(false);
  };

  const handleSelectRecent = (q) => {
    onSelectQuery(q);
    if (isMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#FAF8F5] border-r border-[#ECE7DF] flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-soft-lg' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Main Navigation */}
          <nav className="space-y-1">
            <button
              onClick={() => handleNavClick('explore')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeNav === 'explore'
                  ? 'bg-purple-light text-purple-brand font-semibold shadow-soft-sm'
                  : 'text-charcoal-700 hover:bg-[#F2EFE8]'
              }`}
            >
              <Compass className={`w-4 h-4 ${activeNav === 'explore' ? 'text-purple-brand' : 'text-charcoal-500'}`} />
              <span>Explore</span>
            </button>

            <button
              onClick={() => handleNavClick('my-maps')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeNav === 'my-maps'
                  ? 'bg-purple-light text-purple-brand font-semibold shadow-soft-sm'
                  : 'text-charcoal-700 hover:bg-[#F2EFE8]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-charcoal-500" />
              <span>My Maps</span>
            </button>

            <button
              onClick={() => handleNavClick('saved')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeNav === 'saved'
                  ? 'bg-purple-light text-purple-brand font-semibold shadow-soft-sm'
                  : 'text-charcoal-700 hover:bg-[#F2EFE8]'
              }`}
            >
              <Bookmark className="w-4 h-4 text-charcoal-500" />
              <span>Saved</span>
            </button>

            <button
              onClick={() => handleNavClick('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeNav === 'settings'
                  ? 'bg-purple-light text-purple-brand font-semibold shadow-soft-sm'
                  : 'text-charcoal-700 hover:bg-[#F2EFE8]'
              }`}
            >
              <Settings className="w-4 h-4 text-charcoal-500" />
              <span>Settings</span>
            </button>
          </nav>

          <hr className="border-[#ECE7DF]" />

          {/* Recent Explorations Section */}
          <div>
            <div className="flex items-center gap-2 px-3 mb-2.5 text-xs font-medium text-charcoal-500">
              <History className="w-3.5 h-3.5" />
              <span>Recent Explorations</span>
            </div>

            <div className="space-y-1">
              {recentExplorations.map((item) => {
                const isActive = currentQuery?.toLowerCase() === item.query?.toLowerCase();
                return (
                  <button
                    key={item.id || item.query}
                    onClick={() => handleSelectRecent(item.query)}
                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                      isActive
                        ? 'text-charcoal-900 font-semibold bg-[#F0ECE4]'
                        : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-[#F4F1EA]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        isActive ? 'bg-purple-brand' : 'bg-charcoal-400'
                      }`}
                    />
                    <span className="truncate">{item.query}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Quote & Landscape Card */}
        <div className="pt-4">
          <div className="rounded-2xl overflow-hidden bg-white/70 border border-[#ECE7DF] p-2.5 shadow-soft-sm">
            <div className="h-20 w-full rounded-xl overflow-hidden mb-2.5">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop"
                alt="Scenic mountain valley"
                className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="font-serif italic text-xs leading-relaxed text-charcoal-700 px-1">
              “The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.”
            </p>
            <p className="text-[11px] text-charcoal-400 font-sans mt-1.5 px-1 font-medium">
              — Marcel Proust
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
