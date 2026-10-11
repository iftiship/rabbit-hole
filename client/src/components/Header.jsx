import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { RabbitLogo } from './RabbitLogo.jsx';

export function Header({
  onSearch,
  isLoading,
  currentQuery,
  onOpenSettings,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}) {
  const [inputValue, setInputValue] = useState(currentQuery || '');
  const [isDark, setIsDark] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(currentQuery || '');
  }, [currentQuery]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K to focus search bar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSearch(inputValue.trim());
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-[#ECE7DF] bg-[#FAF8F5]/90 backdrop-blur-md z-30 sticky top-0 transition-standard">
      {/* Left: Premium Brand Logo & Tagline */}
      <div className="flex items-center gap-3 min-w-[220px]">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="md:hidden p-2 rounded-lg text-charcoal-700 hover:bg-[#F0ECE4]"
          aria-label="Toggle navigation"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div
          className="flex items-center gap-3 cursor-pointer group select-none"
          onClick={() => onSearch('Why do humans dream?')}
          title="Rabbit Hole - Home"
        >
          {/* High-end freestanding rabbit silhouette mark (no background container) */}
          <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
            <RabbitLogo className="w-7 h-7 text-charcoal-900 fill-current" />
          </div>

          <div>
            <span className="font-serif font-semibold text-[20px] tracking-tight text-charcoal-900 block leading-none">
              Rabbit Hole
            </span>
            <span className="text-[10px] text-charcoal-500 font-sans tracking-wide mt-1 block font-normal">
              Explore. Connect. Discover.
            </span>
          </div>
        </div>
      </div>

      {/* Center: Search Question Input Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything... (e.g. Why do humans dream?)"
              className="w-full pl-10 pr-20 py-2.5 rounded-full bg-white border border-[#E4DFD7] text-sm text-charcoal-800 placeholder-charcoal-400 shadow-soft-sm focus:outline-none focus:border-purple-brand focus:ring-2 focus:ring-purple-brand/15 transition-standard"
              disabled={isLoading}
            />
            {/* Keyboard shortcut hint */}
            <div className="absolute right-3 flex items-center gap-1.5">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-purple-brand border-t-transparent rounded-full animate-spin" />
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-sans font-medium text-charcoal-400 bg-cream-200 border border-cream-300 rounded shadow-xs">
                  <span className="text-xs">⌘</span> K
                </kbd>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Right: Clean Theme Toggle & Profile Avatar (matching mockup) */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-charcoal-600 hover:bg-cream-200 transition-colors"
          title="Toggle appearance"
          aria-label="Toggle appearance"
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* User profile avatar */}
        <div
          onClick={onOpenSettings}
          className="w-8 h-8 rounded-full bg-charcoal-700 text-white font-medium text-xs flex items-center justify-center cursor-pointer shadow-soft-sm hover:opacity-90 transition-opacity"
          title="Settings & Info"
        >
          I
        </div>
      </div>
    </header>
  );
}
