/**
 * NIT MANIPUR NAVIGATOR - MAIN APPLICATION CONTROLLER
 * 
 * Handles UI interactions, Leaflet map rendering, Geolocation API,
 * Dijkstra path finding integration, turn-by-turn route presentation,
 * and responsive drawer controls.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Application State Variables
    let map = null;
    let markers = {};             // Map of nodeId -> Leaflet Marker
    let userGpsMarker = null;     // Marker for user's actual GPS position
    let routePolyline = null;     // Leaflet Polyline for calculated route
    let routeOutlinePolyline = null; // Background polyline for glow effect
    let graphEdgesGroup = null;   // Layer group for walking graph edges

    let userLocation = null;      // { lat, lng } from navigator.geolocation
    let nearestNodeFromGps = null; // { nodeId, node, distanceMeters }
    let currentCalculatedRoute = null; // Store last Dijkstra result

    // Map Tile Layers
    let satelliteLayer = null;
    let streetLayer = null;
    let labelsLayer = null;
    let isSatelliteMode = true;

    // DOM Element References
    const startSelect = document.getElementById('start-location-select');
    const startOptionsGroup = document.getElementById('start-location-options');
    const destSelect = document.getElementById('dest-location-select');
    const form = document.getElementById('nav-form');
    const btnFindRoute = document.getElementById('btn-find-route');
    const btnClearRoute = document.getElementById('btn-clear-route');
    const btnSwap = document.getElementById('btn-swap-nodes');
    const btnRecenter = document.getElementById('btn-recenter');
    const btnMapReset = document.getElementById('btn-map-reset');
    const btnToggleSatellite = document.getElementById('btn-toggle-satellite');
    const btnToggleMarkers = document.getElementById('btn-toggle-all-markers');
    const btnTogglePaths = document.getElementById('btn-toggle-paths');
    const btnToggleAlgo = document.getElementById('btn-toggle-algo');
    const btnCloseAlgo = document.getElementById('btn-close-algo');

    const geoBanner = document.getElementById('geo-status-banner');
    const geoText = document.getElementById('geo-status-text');
    const gpsCoordsText = document.getElementById('gps-coords-text');

    const resultCard = document.getElementById('route-result-card');
    const resDistance = document.getElementById('res-distance');
    const resTime = document.getElementById('res-time');
    const snapInfoBox = document.getElementById('snap-info-box');
    const snapNodeName = document.getElementById('snap-node-name');
    const waypointsList = document.getElementById('waypoints-list');

    const algoPanel = document.getElementById('algo-panel');
    const statVisitedCount = document.getElementById('stat-visited-count');
    const statPathLength = document.getElementById('stat-path-length');
    const algoStepsLog = document.getElementById('algo-steps-log');

    const sidebar = document.getElementById('sidebar');
    const sidebarHandle = document.getElementById('sidebar-handle');

    // -------------------------------------------------------------------------
    // 1. INITIALIZE APPLICATION & LEAFLET MAP
    // -------------------------------------------------------------------------
    function initApp() {
        initMap();
        populateLocationSelects();
        setupEventListeners();
        requestUserLocation();
    }

    function initMap() {
        // Create Leaflet Map centered on NIT Manipur Campus
        map = L.map('map', {
            center: CAMPUS_CONFIG.center,
            zoom: CAMPUS_CONFIG.defaultZoom,
            zoomControl: true
        });
        // TEMPORARY TOOL: Capture walking path coordinates
let capturedRoadPoints = [];

map.on('click', function (e) {
    const point = {
        id: `p_trace_${capturedRoadPoints.length + 1}`,
        lat: Number(e.latlng.lat.toFixed(6)),
        lng: Number(e.latlng.lng.toFixed(6))
    };

    capturedRoadPoints.push(point);

    console.log("Captured road point:", point);
    console.table(capturedRoadPoints);
});

        // High-resolution Esri Satellite Imagery Layer
        satelliteLayer = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                maxZoom: 19,
                maxNativeZoom: 17,
                attribution: 'Tiles &copy; Esri'
            }
        );

        // Satellite Road & Place Labels Overlay Layer
        labelsLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19
        });

        // OpenStreetMap Standard Street Vector Layer
        streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | NIT Manipur'
        });

        // Default to Satellite View + Place Labels overlay
        // Default to Satellite View + Place Labels overlay
        satelliteLayer.addTo(map);
        labelsLayer.addTo(map);


        // Create Layer Groups
        graphEdgesGroup = L.layerGroup();

        // Render Campus Building Markers on Map
        renderCampusMarkers();
        //renderGraphEdges();
    }

    // -------------------------------------------------------------------------
    // 2. RENDER MAP MARKERS & GRAPH EDGES
    // -------------------------------------------------------------------------
    function renderCampusMarkers() {
        for (const id in campusNodes) {
            const node = campusNodes[id];

            // Only render visual badges for selectable campus locations (or custom icons)
            if (node.isSelectable) {
                const customIcon = L.divIcon({
                    className: 'custom-leaflet-marker',
                    html: `
                        <div class="marker-pin-custom" style="background-color: ${node.color}; width: 32px; height: 32px;">
                            <i class="fa-solid ${node.icon}"></i>
                        </div>
                    `,
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                    popupAnchor: [0, -16]
                });

                const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);

                // Popup content with quick action buttons
                const popupContent = `
                    <div class="custom-popup-node">
                        <h4><i class="fa-solid ${node.icon}"></i> ${node.name}</h4>
                        <p>${node.description}</p>
                        <div style="display:flex; gap:6px;">
                            <button onclick="window.selectAsStart('${id}')" class="btn btn-primary btn-pop">Set Start</button>
                            <button onclick="window.selectAsDestination('${id}')" class="btn btn-secondary btn-pop">Set Dest</button>
                        </div>
                    </div>
                `;
                marker.bindPopup(popupContent);
                markers[id] = marker;
            }
        }
    }

    // Expose popup helper functions to window scope
    window.selectAsStart = function (nodeId) {
        startSelect.value = nodeId;
        map.closePopup();
        triggerRouteCalculation();
    };

    window.selectAsDestination = function (nodeId) {
        destSelect.value = nodeId;
        map.closePopup();
        triggerRouteCalculation();
    };

    function renderGraphEdges() {
        graphEdgesGroup.clearLayers();
        const drawnEdges = new Set();

        for (const u in campusGraph) {
            for (const v in campusGraph[u]) {
                const edgeKey = [u, v].sort().join('--');
                if (!drawnEdges.has(edgeKey) && campusNodes[u] && campusNodes[v]) {
                    drawnEdges.add(edgeKey);
                    const latlngs = [
                        [campusNodes[u].lat, campusNodes[u].lng],
                        [campusNodes[v].lat, campusNodes[v].lng]
                    ];
                    const polyline = L.polyline(latlngs, {
                        color: 'rgba(255, 255, 255, 0.25)',
                        weight: 2,
                        dashArray: '4, 6'
                    });
                    graphEdgesGroup.addLayer(polyline);
                }
            }
        }
    }

    // -------------------------------------------------------------------------
    // 3. POPULATE SELECT DROPDOWNS
    // -------------------------------------------------------------------------
    function populateLocationSelects() {
        // Group nodes by category
        const categories = {};

        for (const id in campusNodes) {
            const node = campusNodes[id];
            if (!node.isSelectable) continue;

            if (!categories[node.category]) {
                categories[node.category] = [];
            }
            categories[node.category].push(node);
        }

        // Build HTML for optgroups
        let optionsHtml = '';
        for (const catName in categories) {
            optionsHtml += `<optgroup label="${catName}">`;
            categories[catName].forEach(node => {
                optionsHtml += `<option value="${node.id}">${node.name}</option>`;
            });
            optionsHtml += `</optgroup>`;
        }

        startOptionsGroup.innerHTML = optionsHtml;
        destSelect.innerHTML = '<option value="" disabled selected>-- Select Campus Destination --</option>' + optionsHtml;
    }

    // -------------------------------------------------------------------------
    // 4. BROWSER GEOLOCATION API INTEGRATION
    // -------------------------------------------------------------------------
    function requestUserLocation() {
        if (!navigator.geolocation) {
            updateGeoStatus('warning', 'Browser does not support Geolocation. Using campus start selection.');
            fallbackGpsToMainGate();
            return;
        }

        updateGeoStatus('info', 'Requesting browser GPS location access...');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                userLocation = { lat, lng };

                gpsCoordsText.textContent = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;

                // Update Map with User Location Marker
                updateUserGpsMarker(lat, lng);

                // Find nearest campus node
                nearestNodeFromGps = findNearestNode(lat, lng);
                const insideCampus = isWithinCampusBounds(lat, lng);

                if (insideCampus) {
                    updateGeoStatus('success', `📍 GPS active! Snapped to nearest point: <strong>${nearestNodeFromGps.node.name}</strong>`);
                } else {
                    updateGeoStatus('warning', `📍 You are off-campus (${nearestNodeFromGps.distanceMeters}m away). Snapped GPS start to <strong>${nearestNodeFromGps.node.name}</strong>.`);
                }
            },
            (error) => {
                let errMsg = 'Location access denied or unavailable.';
                if (error.code === error.PERMISSION_DENIED) {
                    errMsg = 'Permission denied. Please select a starting campus location.';
                }
                updateGeoStatus('warning', `⚠️ ${errMsg}`);
                fallbackGpsToMainGate();
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000
            }
        );
    }

    function updateUserGpsMarker(lat, lng) {
        if (userGpsMarker) {
            map.removeLayer(userGpsMarker);
        }

        const pulseIcon = L.divIcon({
            className: 'user-gps-marker-wrapper',
            html: `<div class="user-gps-pulse-marker" title="Your Current Location"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        userGpsMarker = L.marker([lat, lng], { icon: pulseIcon, zIndexOffset: 1000 }).addTo(map);
        userGpsMarker.bindPopup(`<b>Your Current Position</b><br>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
    }

    function fallbackGpsToMainGate() {
        gpsCoordsText.textContent = "Using preset campus location";
        // Default snap to Main Gate if GPS fails
        nearestNodeFromGps = {
            nodeId: "main_gate",
            node: campusNodes["main_gate"],
            distanceMeters: 0
        };
    }

    function updateGeoStatus(type, htmlMessage) {
        geoBanner.className = `status-banner status-${type}`;
        geoText.innerHTML = htmlMessage;
    }

    // -------------------------------------------------------------------------
    // 5. ROUTE CALCULATION & DIJKSTRA INTEGRATION
    // -------------------------------------------------------------------------
    function triggerRouteCalculation() {
        let startNodeId = startSelect.value;
        const destNodeId = destSelect.value;

        // Validation
        if (!destNodeId) {
            alert('Please select a destination campus location.');
            return;
        }

        let isUsingGps = false;

        if (startNodeId === 'CURRENT_LOCATION') {
            if (!nearestNodeFromGps) {
                alert('GPS location not ready yet. Please select a start location manually or wait a moment.');
                return;
            }
            startNodeId = nearestNodeFromGps.nodeId;
            isUsingGps = true;
        }

        if (startNodeId === destNodeId) {
            alert('Start location and destination are the same! Please select different points.');
            return;
        }

        // Run Dijkstra Algorithm
        const result = DijkstraCalculator.findShortestPath(campusGraph, startNodeId, destNodeId);

        if (!result.success) {
            alert(`Unable to calculate route: ${result.error}`);
            return;
        }

        // currentCalculatedRoute = result;

        // // Display results on map & sidebar
        // drawRouteOnMap(result.path, isUsingGps);
        currentCalculatedRoute = result;

console.log("Selected Dijkstra path:", result.path);

result.path.forEach(id => {
    console.log(id, campusNodes[id]?.lat, campusNodes[id]?.lng);
});

// Display results on map & sidebar
drawRouteOnMap(result.path, isUsingGps);
        displayRouteMetrics(result, isUsingGps);
        displayDijkstraTrace(result);

        // Show result card
        resultCard.style.display = 'flex';
        btnClearRoute.style.display = 'block';

        // Auto scroll sidebar down to results on mobile
        if (window.innerWidth <= 850) {
            resultCard.scrollIntoView({ behavior: 'smooth' });
        }
    }

    

    function drawRouteOnMap(pathNodeIds, isUsingGps) {
        // Clear previous polylines
        if (routePolyline) map.removeLayer(routePolyline);
        if (routeOutlinePolyline) map.removeLayer(routeOutlinePolyline);

        const latlngs = [];

        // If GPS was used, include user's actual lat/lng as the initial line point
        if (isUsingGps && userLocation && isWithinCampusBounds(userLocation.lat, userLocation.lng)) {
            latlngs.push([userLocation.lat, userLocation.lng]);
        }

        pathNodeIds.forEach(id => {
            if (campusNodes[id]) {
                latlngs.push([campusNodes[id].lat, campusNodes[id].lng]);
            }
        });

        // Draw background glow outline
        routeOutlinePolyline = L.polyline(latlngs, {
            color: '#0284c7',
            weight: 8,
            opacity: 0.5,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);

        // Draw main animated glowing route line
        routePolyline = L.polyline(latlngs, {
            color: '#38bdf8',
            weight: 5,
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);

        // Zoom map to fit the route bounds nicely
        map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
    }

    function displayRouteMetrics(result, isUsingGps) {
        const totalDist = result.distance;

        // Formatted distance (meters or kilometers)
        resDistance.textContent = totalDist >= 1000 ? `${(totalDist / 1000).toFixed(2)} km` : `${totalDist} m`;

        // Estimated walking time (assumes average walking speed of 1.2 m/s = 72 m/min)
        const walkingMinutes = Math.max(1, Math.ceil(totalDist / 72));
        resTime.textContent = `${walkingMinutes} min${walkingMinutes > 1 ? 's' : ''}`;

        // Snap info box
        if (isUsingGps && nearestNodeFromGps) {
            snapInfoBox.style.display = 'flex';
            snapNodeName.textContent = nearestNodeFromGps.node.name;
        } else {
            snapInfoBox.style.display = 'none';
        }

        // Render turn-by-turn waypoints
        waypointsList.innerHTML = '';

        result.path.forEach((nodeId, index) => {
            const node = campusNodes[nodeId];
            if (!node) return;

            const li = document.createElement('li');
            let itemClass = 'waypoint-item';
            if (index === 0) itemClass += ' start';
            if (index === result.path.length - 1) itemClass += ' end';

            li.className = itemClass;

            let stepLabel = node.name;
            if (index === 0 && isUsingGps) {
                stepLabel = `Your Location → ${node.name}`;
            }

            li.innerHTML = `
                <span><strong>${index + 1}.</strong> ${stepLabel}</span>
                <span class="waypoint-dist"><i class="fa-solid ${node.icon}"></i></span>
            `;
            waypointsList.appendChild(li);
        });
    }

    function displayDijkstraTrace(result) {
        statVisitedCount.textContent = result.visitedOrder.length;
        statPathLength.textContent = result.path.length;

        let logHtml = '';
        result.steps.forEach((step, idx) => {
            let updatesText = step.updates && step.updates.length > 0
                ? step.updates.map(u => `↳ Dist[${u.neighborName}] updated: ${u.oldDist} → ${u.newDist}`).join('<br>')
                : '↳ No shorter paths found for neighbors.';

            logHtml += `
                <div class="algo-step-line">
                    <div><strong>Step ${step.step}:</strong> Selected <u>${step.nodeName}</u> (Min Dist: ${step.currentDist}m)</div>
                    <div style="color: #94a3b8; font-size: 0.7rem; margin-top: 2px;">${updatesText}</div>
                </div>
            `;
        });

        algoStepsLog.innerHTML = logHtml;
    }

    function clearCalculatedRoute() {
        if (routePolyline) map.removeLayer(routePolyline);
        if (routeOutlinePolyline) map.removeLayer(routeOutlinePolyline);
        routePolyline = null;
        routeOutlinePolyline = null;

        resultCard.style.display = 'none';
        btnClearRoute.style.display = 'none';
        algoPanel.style.display = 'none';

        // Recenter map
        map.setView(CAMPUS_CONFIG.center, CAMPUS_CONFIG.defaultZoom);
    }

    // -------------------------------------------------------------------------
    // 6. EVENT LISTENERS
    // -------------------------------------------------------------------------
    function setupEventListeners() {
        // Form Submit
        btnFindRoute.addEventListener('click', triggerRouteCalculation);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            triggerRouteCalculation();
        });

        // Clear Route
        btnClearRoute.addEventListener('click', clearCalculatedRoute);

        // Swap Start & Dest
        btnSwap.addEventListener('click', () => {
            if (startSelect.value === 'CURRENT_LOCATION') {
                alert('Cannot swap when Start is set to live GPS. Please select a specific start building first.');
                return;
            }
            const temp = startSelect.value;
            startSelect.value = destSelect.value;
            destSelect.value = temp;

            if (startSelect.value && destSelect.value) {
                triggerRouteCalculation();
            }
        });

        // Quick Choice Chips
        document.querySelectorAll('#quick-chips .chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const targetNode = chip.getAttribute('data-node');
                destSelect.value = targetNode;
                triggerRouteCalculation();
            });
        });

        // Map Buttons
        btnToggleSatellite.addEventListener('click', () => {
            isSatelliteMode = !isSatelliteMode;
            if (isSatelliteMode) {
                map.removeLayer(streetLayer);
                map.addLayer(satelliteLayer);
                map.addLayer(labelsLayer);
                btnToggleSatellite.classList.add('active');
                btnToggleSatellite.innerHTML = '<i class="fa-solid fa-satellite"></i> Satellite';
            } else {
                map.removeLayer(satelliteLayer);
                map.removeLayer(labelsLayer);
                map.addLayer(streetLayer);
                btnToggleSatellite.classList.remove('active');
                btnToggleSatellite.innerHTML = '<i class="fa-solid fa-map"></i> Streets';
            }
        });

        btnRecenter.addEventListener('click', () => {
            if (userLocation) {
                map.setView([userLocation.lat, userLocation.lng], 18);
            } else {
                map.setView(CAMPUS_CONFIG.center, CAMPUS_CONFIG.defaultZoom);
            }
        });

        btnMapReset.addEventListener('click', () => {
            map.setView(CAMPUS_CONFIG.center, CAMPUS_CONFIG.defaultZoom);
        });

        btnToggleMarkers.addEventListener('click', () => {
            const active = btnToggleMarkers.classList.toggle('active');
            for (const id in markers) {
                if (active) {
                    map.addLayer(markers[id]);
                } else {
                    map.removeLayer(markers[id]);
                }
            }
        });

        // btnTogglePaths.addEventListener('click', () => {
        //     const active = btnTogglePaths.classList.toggle('active');
        //     if (active) {
        //         map.addLayer(graphEdgesGroup);
        //     } else {
        //         map.removeLayer(graphEdgesGroup);
        //     }
        // });

        btnTogglePaths.addEventListener('click', () => {
    map.removeLayer(graphEdgesGroup);
    btnTogglePaths.classList.remove('active');
});

        // Algo Visualizer Toggle
        btnToggleAlgo.addEventListener('click', () => {
            if (algoPanel.style.display === 'none' || !algoPanel.style.display) {
                algoPanel.style.display = 'flex';
                algoPanel.scrollIntoView({ behavior: 'smooth' });
            } else {
                algoPanel.style.display = 'none';
            }
        });

        btnCloseAlgo.addEventListener('click', () => {
            algoPanel.style.display = 'none';
        });

        // Mobile Drawer Handle
        if (sidebarHandle) {
            sidebarHandle.addEventListener('click', () => {
                sidebar.classList.toggle('expanded');
            });
        }
    }

    // Start App
    initApp();
});
