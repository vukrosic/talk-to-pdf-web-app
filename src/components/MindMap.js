import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const NetworkGraph = () => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const options = {
      layout: {
        hierarchical: {
          direction: 'LR', // Horizontal layout (left to right)
          sortMethod: 'directed', // Sort nodes in the order of the edges
          levelSeparation: 200, // Horizontal spacing between levels
          nodeSpacing: 100, // Vertical spacing between nodes
        },
      },
      edges: {
        smooth: {
          type: 'cubicBezier',
          forceDirection: 'horizontal',
        },
      },
      nodes: {
        shape: 'box',
        shapeProperties: {
          borderRadius: 0, // Rectangle with sharp edges
        },
        color: {
          border: '#2B7CE9',
          background: '#FFFFFF',
          highlight: {
            border: '#2B7CE9',
            background: '#FFFFFF',
          },
        },
        font: {
          color: '#2B7CE9',
          face: 'Arial',
          size: 14,
        },
        widthConstraint: {
          minimum: 100, // Fixed width for all nodes
        },
        heightConstraint: {
          minimum: 50, // Fixed height for all nodes
        },
      },
      interaction: {
        hover: true,
      },
    };

    const data = {
      nodes: new DataSet([
        { id: 'Python', label: "Python" },
        { id: 'Basics', label: "Basics" },
        { id: 'Intermediate', label: "Intermediate" },
        { id: 'Advanced', label: "Advanced" },
      ]),
      edges: new DataSet([
        { from: 'Python', to: 'Basics' },
        { from: 'Python', to: 'Intermediate' },
        { from: 'Python', to: 'Advanced' },
      ]),
    };

    networkRef.current = new Network(container, data, options);

    return () => {
      if (networkRef.current !== null) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: '500px' }} />;
};

export default NetworkGraph;