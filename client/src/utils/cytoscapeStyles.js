// Cytoscape styles matching the Rabbit Hole UI mockup

// Helper to generate SVG icon data URI for nodes
export function getSvgIconUri(iconType, bgColor = '#EDE9FE', iconColor = '#5B4FE1') {
  const iconSvgs = {
    'brain': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/></svg>`,
    'moon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    'sparkles': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
    'eye': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    'activity': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    'tree-pine': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2a1 1 0 0 1-.8-1.6L12 3l4 4.4a1 1 0 0 1-.8 1.6H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 22v-3"/></svg>`,
    'sunset': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>`,
    'mountain': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`,
    'network': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>`,
    'book-open': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    'cpu': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    'disc': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/></svg>`,
    'clock': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    'zap': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    'shield': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`,
    'compass': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    'cloud-moon': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z"/><path d="M10.1 9A6 6 0 0 1 16 4a4.24 4.24 0 0 0 6 6 6 6 0 0 1-3 5.19"/></svg>`,
  };

  const svgInner = iconSvgs[iconType] || iconSvgs['sparkles'];
  const fullSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="${bgColor}" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#bg)" stroke="${bgColor}" stroke-width="2"/>
      <g transform="translate(16, 16) scale(1.33)">
        ${svgInner}
      </g>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
}

export function createCytoscapeStyles(rootId) {
  return [
    // Base node style
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'width': 'data(nodeSize)',
        'height': 'data(nodeSize)',
        'shape': 'ellipse',
        'background-color': '#EDE8E1',
        'background-image': 'data(bgImage)',
        'background-fit': 'cover',
        'background-clip': 'node',
        'border-width': 2.5,
        'border-color': '#E2DDD5',
        'color': '#1E1E24',
        'font-family': 'Plus Jakarta Sans, sans-serif',
        'font-size': '11px',
        'font-weight': 600,
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 10,
        'text-max-width': '105px',
        'text-wrap': 'wrap',
        // Pill background for crisp legibility over crossing lines
        'text-background-color': '#FAF8F5',
        'text-background-opacity': 0.95,
        'text-background-padding': '4px',
        'text-background-shape': 'roundrectangle',
        'text-border-color': '#EAE5DC',
        'text-border-width': 1,
        'text-border-opacity': 0.9,
        'shadow-blur': 16,
        'shadow-color': 'rgba(0, 0, 0, 0.08)',
        'shadow-opacity': 0.7,
        'transition-property': 'border-color, border-width, width, height, shadow-blur, opacity',
        'transition-duration': '0.2s',
      }
    },

    // Core Concept focal node (large, glowing)
    {
      selector: 'node[type = "core"]',
      style: {
        'width': 84,
        'height': 84,
        'font-size': '13px',
        'font-weight': 700,
        'text-max-width': '125px',
        'border-width': 3.5,
        'border-color': '#5B4FE1',
        'shadow-blur': 26,
        'shadow-color': 'rgba(91, 79, 225, 0.4)',
        'shadow-opacity': 0.85,
        'shadow-offset-x': 0,
        'shadow-offset-y': 0,
        'text-background-color': '#FAF8F5',
        'text-background-opacity': 0.96,
        'text-border-color': '#DDD6FE',
        'text-border-width': 1.5,
        'z-index': 10,
      }
    },

    // Related concept nodes (primary orbit)
    {
      selector: 'node[type = "related"]',
      style: {
        'width': 62,
        'height': 62,
        'border-width': 2.5,
        'border-color': '#DDD7CC',
        'shadow-blur': 14,
        'shadow-color': 'rgba(0, 0, 0, 0.08)',
      }
    },

    // Cross-connection nodes
    {
      selector: 'node[type = "cross"]',
      style: {
        'width': 62,
        'height': 62,
        'border-width': 2.5,
        'border-color': '#C4B5FD',
        'shadow-blur': 16,
        'shadow-color': 'rgba(196, 181, 253, 0.35)',
      }
    },

    // Weird Bridge node (amber accent with glow)
    {
      selector: 'node[type = "weird-bridge"]',
      style: {
        'width': 66,
        'height': 66,
        'border-width': 3,
        'border-color': '#F59E0B',
        'border-style': 'solid',
        'shadow-blur': 20,
        'shadow-color': 'rgba(245, 158, 11, 0.38)',
      }
    },

    // Hover state
    {
      selector: 'node:hover',
      style: {
        'border-color': '#5B4FE1',
        'border-width': 3.5,
        'cursor': 'pointer',
      }
    },

    // Selected state
    {
      selector: 'node:selected, node.selected',
      style: {
        'border-color': '#5B4FE1',
        'border-width': 3.5,
        'shadow-blur': 28,
        'shadow-color': 'rgba(91, 79, 225, 0.5)',
        'shadow-opacity': 0.95,
        'z-index': 20,
      }
    },

    // Base edge style - faint, celestial constellation lines
    {
      selector: 'edge',
      style: {
        'width': 1,
        'line-color': '#E5E0D8',
        'curve-style': 'bezier',
        'target-arrow-shape': 'none',
        'opacity': 0.55,
        'transition-property': 'line-color, width, opacity',
        'transition-duration': '0.2s',
      }
    },

    // Direct radial edges connected to the central root node
    // These radiate outward straight like subtle cosmic rays
    {
      selector: `edge[source = "${rootId}"], edge[target = "${rootId}"]`,
      style: {
        'curve-style': 'straight',
        'line-color': '#E5E0D8',
        'width': 1,
        'opacity': 0.55,
      }
    },

    // Cross-connection edges between perimeter nodes (gentle curved arc)
    {
      selector: 'edge[type = "cross"]',
      style: {
        'curve-style': 'bezier',
        'control-point-step-size': 25,
        'line-color': '#DDD6FE',
        'width': 1.2,
        'opacity': 0.75,
      }
    },

    // Suggested edge (delicate dashed lavender)
    {
      selector: 'edge[type = "suggested"]',
      style: {
        'curve-style': 'bezier',
        'control-point-step-size': 25,
        'line-color': '#DDD6FE',
        'line-style': 'dashed',
        'line-dash-pattern': [3, 4],
        'width': 1.1,
        'opacity': 0.7,
      }
    },

    // Weird Bridge edge (distinct dashed amber)
    {
      selector: 'edge[type = "weird-bridge"]',
      style: {
        'curve-style': 'bezier',
        'control-point-step-size': 40,
        'line-color': '#F59E0B',
        'width': 1.6,
        'line-style': 'dashed',
        'line-dash-pattern': [5, 4],
        'opacity': 0.85,
      }
    },

    // Connected to selected node (clear vibrant purple glow)
    {
      selector: 'edge.highlighted',
      style: {
        'line-color': '#7C3AED',
        'width': 2,
        'line-style': 'solid',
        'opacity': 0.95,
        'z-index': 15,
      }
    },

    // Dimmed nodes and edges when a node is hovered or selected
    {
      selector: 'node.dimmed',
      style: {
        'opacity': 0.3,
      }
    },
    {
      selector: 'edge.dimmed',
      style: {
        'opacity': 0.12,
      }
    }
  ];
}
