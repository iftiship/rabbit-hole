import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { GraphView } from './components/GraphView.jsx';
import { DetailsPanel } from './components/DetailsPanel.jsx';
import { MyMapsModal } from './components/MyMapsModal.jsx';
import { SavedConceptsModal } from './components/SavedConceptsModal.jsx';
import { SettingsModal } from './components/SettingsModal.jsx';

import {
  fetchExploration,
  expandConcept,
  getBackendStatus,
} from './services/api.js';

import {
  getRecentExplorations,
  addRecentExploration,
  saveMap,
  isMapSaved,
  isConceptBookmarked,
  toggleConceptBookmark,
  getBookmarkedConcepts,
  getSavedMaps,
} from './services/storage.js';

import { sampleExplorations } from './data/sampleData.js';

export default function App() {
  const [currentQuery, setCurrentQuery] = useState('Why do humans dream?');
  const [graphData, setGraphData] = useState(sampleExplorations['why-do-humans-dream']);
  const [selectedConcept, setSelectedConcept] = useState(
    sampleExplorations['why-do-humans-dream'].concepts[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [recentExplorations, setRecentExplorations] = useState(getRecentExplorations());
  const [activeNav, setActiveNav] = useState('explore');
  
  // Modals & Drawers
  const [isMyMapsOpen, setIsMyMapsOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);

  // Status & local storage tracking
  const [backendStatus, setBackendStatus] = useState({ demoMode: true });
  const [isCurrentMapSaved, setIsCurrentMapSaved] = useState(false);
  const [bookmarkedSet, setBookmarkedSet] = useState(new Set());
  const [demoBannerDismissed, setDemoBannerDismissed] = useState(false);

  // Check backend health & initial bookmarks
  useEffect(() => {
    async function init() {
      const status = await getBackendStatus();
      setBackendStatus(status);

      const bms = getBookmarkedConcepts();
      setBookmarkedSet(new Set(bms.map(b => b.conceptId)));
      setIsCurrentMapSaved(isMapSaved(graphData?.id));
    }
    init();
  }, [graphData?.id]);

  // Execute exploration search
  const handleSearch = useCallback(async (query) => {
    if (!query || !query.trim()) return;
    setIsLoading(true);
    setCurrentQuery(query);

    try {
      const response = await fetchExploration(query);
      if (response && response.graph) {
        setGraphData(response.graph);
        // Select root concept
        const rootConcept = response.graph.concepts.find(
          c => c.id === response.graph.rootConceptId
        ) || response.graph.concepts[0];
        
        setSelectedConcept(rootConcept);
        setIsCurrentMapSaved(isMapSaved(response.graph.id));
        setRecentExplorations(addRecentExploration(query, response.graph.id));
      }
    } catch (err) {
      console.error('Exploration error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Select a concept from node click or connection click
  const handleSelectConcept = useCallback((concept) => {
    setSelectedConcept(concept);
    setIsMobileDetailsOpen(true);
  }, []);

  // Select concept by ID (e.g. from Key Connections list)
  const handleSelectConceptById = useCallback((conceptId) => {
    if (!graphData || !graphData.concepts) return;
    const found = graphData.concepts.find(c => c.id === conceptId);
    if (found) {
      setSelectedConcept(found);
      setIsMobileDetailsOpen(true);
    }
  }, [graphData]);

  // Expand concept with child nodes ("Explore Deeper")
  const handleExploreDeeper = useCallback(async (concept) => {
    if (!concept || isExpanding) return;
    setIsExpanding(true);
    setIsMobileDetailsOpen(true);

    try {
      const result = await expandConcept(concept, graphData.title || currentQuery);
      if (result && Array.isArray(result.newConcepts) && result.newConcepts.length > 0) {
        // Filter out any IDs already in graph
        const existingIds = new Set(graphData.concepts.map(c => c.id));
        const filteredNewConcepts = result.newConcepts.filter(c => !existingIds.has(c.id));

        if (filteredNewConcepts.length > 0) {
          const updatedConcepts = [...graphData.concepts, ...filteredNewConcepts];
          const updatedEdges = [...graphData.edges, ...(result.newEdges || [])];

          const updatedGraph = {
            ...graphData,
            stats: {
              conceptsCount: updatedConcepts.length,
              connectionsCount: updatedEdges.length,
            },
            concepts: updatedConcepts,
            edges: updatedEdges,
          };

          setGraphData(updatedGraph);
          // Auto select first new expanded concept
          setSelectedConcept(filteredNewConcepts[0]);
        }
      }
    } catch (err) {
      console.error('Failed to expand concept:', err);
    } finally {
      setIsExpanding(false);
    }
  }, [graphData, currentQuery, isExpanding]);

  // Bookmark toggle
  const handleToggleBookmark = useCallback((concept) => {
    const isAdded = toggleConceptBookmark(concept, graphData);
    setBookmarkedSet(prev => {
      const next = new Set(prev);
      if (isAdded) next.add(concept.id);
      else next.delete(concept.id);
      return next;
    });
  }, [graphData]);

  // Save current map
  const handleSaveCurrentMap = useCallback(() => {
    if (!graphData) return;
    const ok = saveMap(graphData);
    if (ok) {
      setIsCurrentMapSaved(true);
    }
  }, [graphData]);

  // Load a saved map
  const handleLoadMap = useCallback((loadedGraph) => {
    if (!loadedGraph) return;
    setGraphData(loadedGraph);
    setCurrentQuery(loadedGraph.query || loadedGraph.title);
    setSelectedConcept(loadedGraph.concepts[0]);
    setIsCurrentMapSaved(true);
  }, []);

  // Reset local storage
  const handleResetData = useCallback(() => {
    localStorage.clear();
    setRecentExplorations(getRecentExplorations());
    setBookmarkedSet(new Set());
    setIsCurrentMapSaved(false);
    setIsSettingsOpen(false);
  }, []);

  const isSelectedConceptBookmarked = selectedConcept
    ? bookmarkedSet.has(selectedConcept.id)
    : false;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#FAF8F5] text-charcoal-800">
      {/* Top Header */}
      <Header
        onSearch={handleSearch}
        isLoading={isLoading}
        currentQuery={currentQuery}
        isDemo={backendStatus.demoMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />

      {/* Main 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          recentExplorations={recentExplorations}
          currentQuery={currentQuery}
          onSelectQuery={handleSearch}
          onOpenMyMaps={() => setIsMyMapsOpen(true)}
          onOpenSaved={() => setIsSavedOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Center Interactive Graph */}
        <main className="flex-1 h-full overflow-hidden flex flex-col relative">
          <GraphView
            graphData={graphData}
            selectedConcept={selectedConcept}
            onSelectConcept={handleSelectConcept}
            isLoading={isLoading}
            onSaveMap={handleSaveCurrentMap}
            isSaved={isCurrentMapSaved}
          />
        </main>

        {/* Right Concept Details Panel */}
        {/* Desktop always visible; mobile drawer */}
        <div
          className={`fixed lg:static inset-y-0 right-0 z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isMobileDetailsOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          <DetailsPanel
            concept={selectedConcept}
            onBackToGraph={() => {
              setIsMobileDetailsOpen(false);
            }}
            onSelectConceptById={handleSelectConceptById}
            onExploreDeeper={handleExploreDeeper}
            isExpanding={isExpanding}
            isBookmarked={isSelectedConceptBookmarked}
            onToggleBookmark={handleToggleBookmark}
            onAskFollowUp={handleSearch}
            followUpQuestions={graphData?.followUps || []}
          />
        </div>
      </div>

      {/* Modals */}
      <MyMapsModal
        isOpen={isMyMapsOpen}
        onClose={() => setIsMyMapsOpen(false)}
        onLoadMap={handleLoadMap}
      />

      <SavedConceptsModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        onSelectConcept={handleSelectConcept}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        backendStatus={backendStatus}
        onResetData={handleResetData}
      />
    </div>
  );
}
