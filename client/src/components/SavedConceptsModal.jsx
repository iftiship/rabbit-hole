import React, { useState } from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { getBookmarkedConcepts, toggleConceptBookmark } from '../services/storage.js';

export function SavedConceptsModal({ isOpen, onClose, onSelectConcept }) {
  if (!isOpen) return null;

  const [bookmarks, setBookmarks] = useState(getBookmarkedConcepts());

  const handleRemove = (concept) => {
    toggleConceptBookmark(concept);
    setBookmarks(getBookmarkedConcepts());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-[#ECE7DF] shadow-soft-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#ECE7DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-purple-brand" />
            <h2 className="font-serif text-lg font-bold text-charcoal-900">
              Bookmarked Concepts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-cream-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Bookmarked Concepts */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {bookmarks.length === 0 ? (
            <div className="py-12 text-center text-charcoal-400">
              <Bookmark className="w-10 h-10 mx-auto mb-3 opacity-40 text-purple-brand" />
              <p className="font-serif text-charcoal-700 font-medium">No bookmarked concepts</p>
              <p className="text-xs text-charcoal-500 mt-1 max-w-xs mx-auto">
                Click the bookmark icon in the details panel while exploring any concept to pin it here.
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.conceptId}
                className="p-4 rounded-2xl border border-[#ECE7DF] hover:border-purple-brand/40 bg-cream-50 hover:bg-white transition-all shadow-soft-sm flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-sm font-bold text-charcoal-900 truncate">
                      {bm.label}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-light text-purple-brand border border-purple-200 uppercase">
                      {bm.type}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-600 truncate">
                    {bm.tagline}
                  </p>
                  {bm.mapTitle && (
                    <p className="text-[10px] text-charcoal-400 mt-1">
                      From exploration: <span className="font-medium">{bm.mapTitle}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemove(bm.conceptData || { id: bm.conceptId })}
                    className="p-2 text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (bm.conceptData) {
                        onSelectConcept(bm.conceptData);
                      }
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-brand text-white text-xs font-semibold hover:bg-purple-hover transition-colors shadow-soft-sm"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
