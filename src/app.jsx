import React, { useCallback } from 'react';
import { addEdge, Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';

import style from './app.module.scss';

export default function App({ }) {
	const initialNodes = [
		{
			id: 'add_node',
			sourcePosition: 'right',
			position: {
				x: 0, y: 0
			},
			data: { label: <div className={style['add-node-text']}>
                Add Node
			</div> },
			type: 'add-node',
			className: 'add-node',
			focusable: true
		}
	];

	const nodeColor = node => {
		switch (node.type) {
		  case 'add-node':
				return '#6ede87';
		  case 'output':
				return '#6865A5';
		  default:
				return '#ff0072';
		}
	  };

	const initialEdges = [{ id: 'add_node-2', source: 'add_node', target: '2', label: 'to the', type: 'step' }];
	const [nodes,setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), [setEdges]);
	return (
		<>
		 <div className={style['chat-layout']}>
		 <ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
				>
					<MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
					<Controls />
					<Background />
				</ReactFlow>
			</div>
		</>
	);
}
