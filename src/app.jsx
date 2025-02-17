import React, { useCallback, useMemo } from 'react';
import { addEdge, Background, Controls, MiniMap, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState } from '@xyflow/react';

import style from './app.module.scss';
import AddNode from './nodes/add-node/add-node';
import FlowSideBar from './flow-bar/flow-side-bar';

export default function App({ }) {
	const initialNodes = [
		{
			id: 'add_node',
			sourcePosition: 'right',
			position: {
				x: 0, y: 0
			},
			data: { label: 'Add Node' },
			type: 'addNode'
		}
	];

	const nodeColor = node => {
		switch (node.type) {
		  case 'addNode':
				return '#6ede87';
		  case 'output':
				return '#6865A5';
		  default:
				return '#ff0072';
		}
	  };

	const initialEdges = [{ id: 'add_node->2', source: 'add_node', target: '2', label: 'to the', type: 'addNodeEdge' }];
	const [nodes,setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const nodeTypes = useMemo(() => ({ addNode: AddNode }), []);

	const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), [setEdges]);
	return (
		<>
			<div className={style['chat-layout']}>
				<ReactFlowProvider>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						nodeTypes={nodeTypes}
					>
						<MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
						<Controls />
						<Background />
					</ReactFlow>
					<FlowSideBar open={true} onCancel={() => void 0} />
				</ReactFlowProvider>
			</div>
		</>
	);
}
