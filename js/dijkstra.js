/**
 * DIJKSTRA'S SHORTEST PATH ALGORITHM IMPLEMENTATION
 * 
 * Custom, pure JavaScript implementation of Dijkstra's Algorithm.
 * Computes the shortest distance path in a weighted graph from startNode to endNode.
 * Also records step-by-step execution details for presentation and debugging.
 */

class DijkstraCalculator {
    /**
     * Executes Dijkstra's Algorithm on a given weighted graph
     * 
     * @param {Object} graph Adjacency list: { nodeA: { nodeB: weight, nodeC: weight }, ... }
     * @param {string} startNode Starting node ID
     * @param {string} endNode Destination node ID
     * @returns {Object} { path: Array, distance: Number, visitedOrder: Array, steps: Array, success: Boolean }
     */
    static findShortestPath(graph, startNode, endNode) {
        // Validation: Check if start and end nodes exist in the graph
        if (!graph[startNode]) {
            return { success: false, error: `Start node '${startNode}' not found in campus graph.` };
        }
        if (!graph[endNode]) {
            return { success: false, error: `Destination node '${endNode}' not found in campus graph.` };
        }

        // Handle trivial case where start and destination are the exact same node
        if (startNode === endNode) {
            return {
                success: true,
                path: [startNode],
                distance: 0,
                visitedOrder: [startNode],
                steps: [{ step: 1, text: "Start and destination are identical." }]
            };
        }

        // Data structures for Dijkstra's Algorithm
        const distances = {};    // Stores shortest distance from startNode to each node
        const previous = {};     // Stores previous node in optimal path
        const unvisited = new Set(); // Track unvisited nodes
        const visitedOrder = []; // Track order of evaluated nodes
        const executionSteps = []; // Detailed step trace for presentation visualizer

        // Initialize distances to Infinity and previous pointers to null
        for (const node in graph) {
            distances[node] = Infinity;
            previous[node] = null;
            unvisited.add(node);
        }

        // Distance to start node is 0
        distances[startNode] = 0;

        let stepCounter = 1;

        while (unvisited.size > 0) {
            // Find unvisited node with the smallest distance
            let currentNode = null;
            let smallestDistance = Infinity;

            for (const node of unvisited) {
                if (distances[node] < smallestDistance) {
                    smallestDistance = distances[node];
                    currentNode = node;
                }
            }

            // If no reachable node remains or distance is infinite, break
            if (currentNode === null || distances[currentNode] === Infinity) {
                break;
            }

            // Mark node as visited
            unvisited.delete(currentNode);
            visitedOrder.push(currentNode);

            // Record step trace for visualizer
            const stepLog = {
                step: stepCounter++,
                node: currentNode,
                nodeName: typeof campusNodes !== 'undefined' && campusNodes[currentNode] ? campusNodes[currentNode].name : currentNode,
                currentDist: distances[currentNode],
                updates: []
            };

            // If we have reached the destination, we can early terminate!
            if (currentNode === endNode) {
                executionSteps.push(stepLog);
                break;
            }

            // Inspect all unvisited neighbors of the current node
            const neighbors = graph[currentNode] || {};
            for (const neighbor in neighbors) {
                if (unvisited.has(neighbor)) {
                    const edgeWeight = neighbors[neighbor];
                    const tentativeDistance = distances[currentNode] + edgeWeight;

                    if (tentativeDistance < distances[neighbor]) {
                        // Found a shorter path to neighbor! Update distance and pointer
                        const oldDist = distances[neighbor];
                        distances[neighbor] = tentativeDistance;
                        previous[neighbor] = currentNode;

                        stepLog.updates.push({
                            neighbor: neighbor,
                            neighborName: typeof campusNodes !== 'undefined' && campusNodes[neighbor] ? campusNodes[neighbor].name : neighbor,
                            oldDist: oldDist === Infinity ? '∞' : `${oldDist}m`,
                            newDist: `${tentativeDistance}m`,
                            via: currentNode
                        });
                    }
                }
            }

            executionSteps.push(stepLog);
        }

        // Reconstruct the shortest path from endNode back to startNode
        const path = [];
        let curr = endNode;

        // If destination node was never reached
        if (distances[endNode] === Infinity) {
            return {
                success: false,
                error: `No walkable route found between ${startNode} and ${endNode}.`,
                steps: executionSteps
            };
        }

        while (curr !== null) {
            path.unshift(curr); // Insert at the beginning
            curr = previous[curr];
        }

        return {
            success: true,
            path: path,                      // Array of node IDs in sequence
            distance: distances[endNode],     // Total shortest distance in meters
            visitedOrder: visitedOrder,       // All evaluated nodes
            steps: executionSteps            // Diagnostic step trace
        };
    }
}
