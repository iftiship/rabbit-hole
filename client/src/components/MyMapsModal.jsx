import React, { useState } from 'react';
import { X, BookOpen, Trash2, Edit2, Check, ArrowRight, Clock } from 'lucide-react';
import { getSavedMaps, deleteMap, renameMap } from '../services/storage.js';

export function MyMapsModal({ isOpen, onClose, onLoadMap }) {
  if (!isOpen) return null;

  const [maps, setMaps] = useState(getSavedMaps());
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleDelete = (id) => {
    deleteMap(id);
    setMaps(getSavedMaps());
  };

  const handleStartRename = (map) => {
    setEditingId(map.id);
    setNewTitle(map.title);
  };

  const handleSaveRename = (id) => {
    if (newTitle.trim()) {
      renameMap(id, newTitle.trim());
      setMaps(getSavedMaps());
    }
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-[#ECE7DF] shadow-soft-lg overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#ECE7DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-purple-brand" />
            <h2 className="font-serif text-lg font-bold text-charcoal-900">
              My Saved Maps
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-400 hover:text-charcoal-800 hover:bg-cream-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Maps */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {maps.length === 0 ? (
            <div className="py-12 text-center text-charcoal-400">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40 text-purple-brand" />
              <p className="font-serif text-charcoal-700 font-medium">No saved maps yet</p>
              <p className="text-xs text-charcoal-500 mt-1 max-w-xs mx-auto">
                Click "Save Map" while exploring any knowledge graph to preserve it in your personal collection.
              </p>
            </div>
          ) : (
            maps.map((map) => (
              <div
                key={map.id}
                className="p-4 rounded-2xl border border-[#ECE7DF] hover:border-purple-brand/40 bg-cream-50 hover:bg-white transition-all shadow-soft-sm flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  {editingId === map.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="px-2.5 py-1 text-sm border border-purple-brand rounded-lg w-full focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveRename(map.id)}
                        className="p-1.5 rounded-lg bg-purple-brand text-white hover:bg-purple-hover"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-serif text-sm font-bold text-charcoal-900 truncate">
                        {map.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-charcoal-500">
                        <span>{map.stats?.conceptsCount || 0} concepts</span>
                        <span>•</span>
                        <span>{map.stats?.connectionsCount || 0} connections</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-charcoal-400" />
                          {new Date(map.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartRename(map)}
                    className="p-2 text-charcoal-400 hover:text-charcoal-700 hover:bg-cream-200 rounded-lg transition-colors"
                    title="Rename map"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(map.id)}
                    className="p-2 text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete map"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      onLoadMap(map.graphData);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-brand text-white text-xs font-semibold hover:bg-purple-hover transition-colors shadow-soft-sm ml-1"
                  >
                    <span>Open</span>
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
