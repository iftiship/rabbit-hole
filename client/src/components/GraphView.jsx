import React, { useEffect, useRef, useState, useCallback } from 'react';
import cytoscape from 'cytoscape';
import { GitFork, Compass, Plus, Minus, Maximize2, Sparkles, Bookmark, Share2 } from 'lucide-react';
import { createCytoscapeStyles, getSvgIconUri } from '../utils/cytoscapeStyles.js';
import { getThematicImageUrl } from '../utils/imageService.js';

export function computeBalancedGraphPositions(concepts, edges = [], rootId) {
  const positions = {};
  if (!concepts || concepts.length === 0) return positions;

  const actualRootId = rootId || concepts[0]?.id;
  positions[actualRootId] = { x: 0, y: 0 };

  const nonRoot = concepts.filter((c) => c.id !== actualRootId);
  if (nonRoot.length === 0) return positions;

  // Distinguish Weird Bridge nodes and perimeter constellation nodes
  const weirdBridges = nonRoot.filter((c) => c.type === 'weird-bridge');
  const perimeterNodes = nonRoot.filter((c) => c.type !== 'weird-bridge');

  // Adjacency ordering for perimeter nodes so interconnected concepts cluster naturally
  const adjacency = new Map();
  perimeterNodes.forEach((c) => adjacency.set(c.id, new Set()));
  edges.forEach((e) => {
    if (adjacency.has(e.source) && adjacency.has(e.target)) {
      adjacency.get(e.source).add(e.target);
      adjacency.get(e.target).add(e.source);
    }
  });

  const orderedPerimeter = [];
  const visited = new Set();
  let current = perimeterNodes[0];

  while (orderedPerimeter.length < perimeterNodes.length) {
    if (current && !visited.has(current.id)) {
      visited.add(current.id);
      orderedPerimeter.push(current);
    }
    const neighbors = current ? Array.from(adjacency.get(current.id) || []) : [];
    const nextNeighborId = neighbors.find((nId) => !visited.has(nId));
    if (nextNeighborId) {
      current = perimeterNodes.find((c) => c.id === nextNeighborId);
    } else {
      current = perimeterNodes.find((c) => !visited.has(c.id));
    }
  }

  // Staggered Concentric Constellation:
  // Alternating between Inner Orbit (Rx=230, Ry=195) and Outer Orbit (Rx=360, Ry=310)
  // Guarantees >180px separation between all adjacent nodes and eliminates label collisions.
  const R_inner_x = 230;
  const R_inner_y = 195;
  const R_outer_x = 360;
  const R_outer_y = 310;
  const pCount = orderedPerimeter.length;
  const perimeterAngles = new Map();

  orderedPerimeter.forEach((c, idx) => {
    // Start at top (-PI/2) and rotate clockwise
    const angle = -Math.PI / 2 + (2 * Math.PI * idx) / pCount;
    perimeterAngles.set(c.id, angle);

    const isOuter = idx % 2 === 1;
    const rx = isOuter ? R_outer_x : R_inner_x;
    const ry = isOuter ? R_outer_y : R_inner_y;

    positions[c.id] = {
      x: Math.round(rx * Math.cos(angle)),
      y: Math.round(ry * Math.sin(angle)),
    };
  });

  // Distant Outer Satellite Orbit for Weird Bridges (Rx=500, Ry=430):
  // Places unexpected bridges on an outer flank so edges don't pierce across center nodes.
  const R_weird_x = 500;
  const R_weird_y = 430;

  weirdBridges.forEach((wb, wbIdx) => {
    const connectedPerimeterIds = edges
      .filter(
        (e) =>
          (e.source === wb.id && perimeterAngles.has(e.target)) ||
          (e.target === wb.id && perimeterAngles.has(e.source))
      )
      .map((e) => (e.source === wb.id ? e.target : e.source));

    let wbAngle;
    if (connectedPerimeterIds.length > 0) {
      const neighborAngles = connectedPerimeterIds.map((id) => perimeterAngles.get(id));
      const avgAngle = neighborAngles.reduce((a, b) => a + b, 0) / neighborAngles.length;
      // Generous angular offset so weird bridge sits smoothly apart from outer orbit nodes
      wbAngle = avgAngle + 0.55 * (wbIdx % 2 === 0 ? 1 : -1);
    } else {
      wbAngle = -Math.PI / 4 + (wbIdx * Math.PI) / 3;
    }

    positions[wb.id] = {
      x: Math.round(R_weird_x * Math.cos(wbAngle)),
      y: Math.round(R_weird_y * Math.sin(wbAngle)),
    };
  });

  return positions;
}

export function GraphView({
  graphData,
  selectedConcept,
  onSelectConcept,
  isLoading,
  onSaveMap,
  isSaved,
}) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [minimapNodes, setMinimapNodes] = useState([]);
  const [viewportBox, setViewportBox] = useState({ x: 0, y: 0, width: 100, height: 100 });

  // Update Cytoscape instance when graphData changes
  useEffect(() => {
    if (!containerRef.current || !graphData || !graphData.concepts) return;

    // Build Cytoscape elements with deterministic balanced positions
    const rootId = graphData.rootConceptId || (graphData.concepts[0]?.id);
    const positions = computeBalancedGraphPositions(graphData.concepts, graphData.edges, rootId);

    // Prepare Cytoscape elements with coordinates
    const usedImages = new Set();
    const elements = [
      ...graphData.concepts.map((concept) => {
        const isRoot = concept.id === rootId;
        const isValidUrl =
          concept.imageUrl &&
          typeof concept.imageUrl === 'string' &&
          concept.imageUrl.startsWith('http') &&
          !concept.imageUrl.includes('placeholder') &&
          !usedImages.has(concept.imageUrl);

        const bgImage = isValidUrl
          ? concept.imageUrl
          : getThematicImageUrl(concept.label, concept.tags, concept.overview, usedImages);

        usedImages.add(bgImage);

        return {
          data: {
            id: concept.id,
            label: concept.label,
            type: concept.type,
            conceptData: concept,
            bgImage: bgImage,
            nodeSize: isRoot ? 84 : concept.type === 'weird-bridge' ? 66 : 62,
          },
          position: positions[concept.id] || { x: 0, y: 0 },
        };
      }),
      ...(graphData.edges || []).map((edge, idx) => ({
        data: {
          id: edge.id || `e-${idx}`,
          source: edge.source,
          target: edge.target,
          type: edge.type || 'related',
          label: edge.label || '',
        },
      })),
    ];

    // Initialize Cytoscape
    if (cyRef.current) {
      cyRef.current.destroy();
    }

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: createCytoscapeStyles(rootId),
      layout: {
        name: 'preset',
        positions: (node) => positions[node.id()] || { x: 0, y: 0 },
        fit: true,
        padding: 50,
      },
      minZoom: 0.3,
      maxZoom: 2.5,
      wheelSensitivity: 0.25,
      boxSelectionEnabled: false,
    });

    cyRef.current = cy;

    // Node click handler
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const concept = node.data('conceptData');
      if (concept) {
        onSelectConcept(concept);
      }
    });

    // Background click handler -> deselect or reselect root
    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        // clicked background
        cy.elements().removeClass('selected highlighted dimmed');
      }
    });

    // Hover interactions for high-contrast focus
    cy.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      const isRoot = node.id() === rootId;
      const connectedEdges = node.connectedEdges();
      const connectedNodes = connectedEdges.connectedNodes();

      cy.elements().addClass('dimmed');
      node.removeClass('dimmed').addClass('selected');
      connectedNodes.removeClass('dimmed');
      if (!isRoot) {
        connectedEdges.removeClass('dimmed').addClass('highlighted');
      } else {
        connectedEdges.removeClass('dimmed');
      }
    });

    cy.on('mouseout', 'node', () => {
      cy.elements().removeClass('dimmed highlighted');
      if (selectedConcept) {
        const selNode = cy.getElementById(selectedConcept.id);
        if (selNode.length) {
          selNode.addClass('selected');
          if (selectedConcept.id !== rootId) {
            selNode.connectedEdges().addClass('highlighted');
          }
        }
      } else {
        cy.elements().removeClass('selected');
      }
    });

    // Sync minimap nodes and pan/zoom viewport
    const updateMinimap = () => {
      const extent = cy.extent();
      const nodes = cy.nodes().map(n => ({
        id: n.id(),
        x: n.position('x'),
        y: n.position('y'),
        type: n.data('type'),
      }));
      setMinimapNodes(nodes);

      // Viewport bounds relative to extent
      const w = extent.x2 - extent.x1;
      const h = extent.y2 - extent.y1;
      setViewportBox({
        x: extent.x1,
        y: extent.y1,
        width: Math.max(w, 100),
        height: Math.max(h, 100),
      });
    };

    cy.on('render pan zoom', updateMinimap);
    updateMinimap();

    // Center and fit with breathing room
    cy.fit(undefined, 40);

    return () => {
      cy.destroy();
    };
  }, [graphData]);

  // Sync selected node styling with state
  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cyRef.current;
    const rootId = graphData?.rootConceptId || (graphData?.concepts?.[0]?.id);

    cy.elements().removeClass('selected highlighted');

    if (selectedConcept) {
      const targetNode = cy.getElementById(selectedConcept.id);
      if (targetNode.length) {
        targetNode.addClass('selected');
        // Only illuminate connected edges for non-root child nodes
        // Root node remains a quiet, elegant constellation hub
        if (selectedConcept.id !== rootId) {
          targetNode.connectedEdges().addClass('highlighted');
        }
      }
    }
  }, [selectedConcept, graphData]);

  // Zoom and fit controls
  const handleZoomIn = () => {
    if (!cyRef.current) return;
    cyRef.current.animate({
      zoom: cyRef.current.zoom() * 1.3,
      duration: 250,
    });
  };

  const handleZoomOut = () => {
    if (!cyRef.current) return;
    cyRef.current.animate({
      zoom: cyRef.current.zoom() * 0.7,
      duration: 250,
    });
  };

  const handleFit = () => {
    if (!cyRef.current) return;
    cyRef.current.animate({
      fit: { padding: 40 },
      duration: 400,
    });
  };

  return (
    <div className="relative flex-1 h-full flex flex-col bg-[#FAF8F5] overflow-hidden">
      {/* Top Header inside Central Graph panel */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-[#ECE7DF] bg-[#FAF8F5]/80 backdrop-blur-xs z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-light/70 text-purple-brand">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-xl md:text-2xl font-bold text-charcoal-900 tracking-tight">
              {graphData?.title || 'Knowledge Exploration'}
            </h1>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-charcoal-500">
              <span>{graphData?.stats?.conceptsCount || graphData?.concepts?.length || 0} concepts</span>
              <span>•</span>
              <span>{graphData?.stats?.connectionsCount || graphData?.edges?.length || 0} connections</span>
            </div>
          </div>
        </div>

        {/* Action icons: Save Map / Star */}
        <div className="flex items-center gap-2">
          {onSaveMap && (
            <button
              onClick={onSaveMap}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-standard ${
                isSaved
                  ? 'bg-purple-brand text-white border-purple-brand shadow-soft-sm'
                  : 'bg-white text-charcoal-700 border-[#E4DFD7] hover:bg-cream-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved to Maps' : 'Save Map'}</span>
            </button>
          )}

          <div className="p-2 text-charcoal-400" title="Rabbit Hole Compass">
            <Compass className="w-5 h-5 text-charcoal-400 animate-spin-slow opacity-60" />
          </div>
        </div>
      </div>

      {/* Main Cytoscape Canvas Area */}
      <div className="relative flex-1 w-full h-full">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#FAF8F5]/70 backdrop-blur-xs transition-opacity">
            <div className="w-12 h-12 border-3 border-purple-brand border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-serif text-charcoal-800 text-base font-semibold">
              Exploring knowledge graph...
            </p>
            <p className="text-xs text-charcoal-500 mt-1">
              Synthesizing connections and Weird Bridges
            </p>
          </div>
        )}

        {/* Cytoscape Container */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Bottom Left: Minimap & Zoom Controls */}
        <div className="absolute bottom-6 left-6 z-10 flex items-end gap-3 pointer-events-auto">
          {/* Minimap card */}
          <div className="w-32 h-24 bg-white/90 backdrop-blur-md rounded-2xl border border-[#ECE7DF] shadow-soft p-2 hidden sm:block">
            <svg className="w-full h-full viewBox-full" viewBox="-250 -250 500 500">
              {/* Background ring */}
              <circle cx="0" cy="0" r="140" fill="none" stroke="#E4DFD7" strokeDasharray="3 3" strokeWidth="1.5" />
              {/* Central root */}
              <circle cx="0" cy="0" r="12" fill="#5B4FE1" opacity="0.9" />
              {/* Node dots */}
              {minimapNodes.map((n) => {
                const isSelected = selectedConcept?.id === n.id;
                return (
                  <circle
                    key={n.id}
                    cx={n.x * 0.45}
                    cy={n.y * 0.45}
                    r={isSelected ? 6 : n.type === 'core' ? 8 : 4.5}
                    fill={isSelected ? '#5B4FE1' : n.type === 'weird-bridge' ? '#F59E0B' : '#8B5CF6'}
                    opacity={isSelected ? 1 : 0.6}
                  />
                );
              })}
            </svg>
          </div>

          {/* Zoom controls */}
          <div className="flex flex-col bg-white/90 backdrop-blur-md rounded-2xl border border-[#ECE7DF] shadow-soft overflow-hidden p-1">
            <button
              onClick={handleZoomIn}
              className="p-2 text-charcoal-600 hover:text-purple-brand hover:bg-cream-200 rounded-xl transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 text-charcoal-600 hover:text-purple-brand hover:bg-cream-200 rounded-xl transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={handleFit}
              className="p-2 text-charcoal-600 hover:text-purple-brand hover:bg-cream-200 rounded-xl transition-colors"
              title="Center & fit graph"
              aria-label="Center and fit graph"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Right: Graph Legend */}
        <div className="absolute bottom-6 right-6 z-10 bg-white/90 backdrop-blur-md rounded-2xl border border-[#ECE7DF] shadow-soft p-3 hidden sm:block pointer-events-auto">
          <div className="space-y-1.5 text-[11px] text-charcoal-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-brand" />
              <span>Core Concept</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              <span>Related Concept</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C4B5FD]" />
              <span>Cross-Connection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span>Weird Bridge</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 border-b-2 border-dashed border-[#A78BFA]" />
              <span>Suggested Path</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
