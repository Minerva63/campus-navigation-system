/**
 * NIT MANIPUR CAMPUS DATA & GRAPH CONFIGURATION
 * 
 * Physically verified location data for NIT Manipur Permanent Campus at Langol, Imphal.
 * 
 * Separates actual building coordinates from the walkway navigation graph.
 * Walkways are represented using path junction nodes (p_*) so Dijkstra route calculations
 * follow real campus roads/walkways rather than cutting through buildings.
 */

// NIT Manipur Campus Configuration (Langol, Imphal)
const CAMPUS_CONFIG = {
    campusName: "National Institute of Technology Manipur",
    locationName: "Langol, Imphal, Manipur - 795004",
    center: [24.8325, 93.9130],
    defaultZoom: 17,

    // Geographical Bounding Box for NIT Manipur Permanent Campus area validation
    bounds: {
        minLat: 24.8250,
        maxLat: 24.8420,
        minLng: 93.9050,
        maxLng: 93.9220
    }
};

/**
 * Campus Nodes Definition
 * 
 * Contains both:
 * 1. Selectable Campus Landmarks (isSelectable: true) with real geographic lat/lng.
 * 2. Walkway Path Junctions (isSelectable: false) representing real campus road intersections.
 */
const campusNodes = {
    // =========================================================================
    // 1. SELECTABLE CAMPUS LANDMARKS (POIs)
    // =========================================================================

    "main_gate": {
        id: "main_gate",
        name: "Main Gate",
        category: "Gates & Entrances",
        lat: 24.833236158984715,
        lng: 93.91406698289151,
        description: "Primary entrance gate to NIT Manipur campus on Thangmeiband Langol Road.",
        icon: "fa-door-open",
        color: "#3b82f6",
        isSelectable: true
    },

    "admin_block": {
        id: "admin_block",
        name: "Administrative Block",
        category: "Administrative",
        lat: 24.832994,
        lng: 93.914171,
        description: "Directorate, Dean Offices, Academic & General Administration.",
        icon: "fa-building-columns",
        color: "#8b5cf6",
        isSelectable: true
    },

    "central_library": {
        id: "central_library",
        name: "Library",
        category: "Academic",
        lat: 24.832731955340428,
        lng: 93.91360788865191,
        description: "Central Library housing books, digital resources & reading halls.",
        icon: "fa-book-bookmark",
        color: "#06b6d4",
        isSelectable: true
    },

    "cse_dept": {
        id: "cse_dept",
        name: "CSE Department",
        category: "Departments",
        lat: 24.831743,
        lng: 93.912335,
        description: "Computer Science & Engineering Department & High-Performance Computing Labs.",
        icon: "fa-laptop-code",
        color: "#3b82f6",
        isSelectable: true
    },

    "ece_dept": {
        id: "ece_dept",
        name: "ECE Department",
        category: "Departments",
        lat: 24.831586,
        lng: 93.912851,
        description: "Electronics & Communication Engineering Department.",
        icon: "fa-microchip",
        color: "#10b981",
        isSelectable: true
    },

    "ee_dept": {
        id: "ee_dept",
        name: "Electrical Engineering Department",
        category: "Departments",
        lat: 24.831904,
        lng: 93.913379,
        description: "Electrical Engineering Department & Power Systems Labs.",
        icon: "fa-bolt",
        color: "#f97316",
        isSelectable: true
    },

    "mech_dept": {
        id: "mech_dept",
        name: "Mechanical Engineering Department",
        category: "Departments",
        lat: 24.832460,
        lng: 93.912974,
        description: "Mechanical Engineering Department & Thermodynamics / Robotics Labs.",
        icon: "fa-gears",
        color: "#64748b",
        isSelectable: true
    },

    "civil_dept": {
        id: "civil_dept",
        name: "Civil Engineering Department",
        category: "Departments",
        lat: 24.832478,
        lng: 93.913710,
        description: "Civil Engineering Department & Structural Design Labs.",
        icon: "fa-compass-drafting",
        color: "#a855f7",
        isSelectable: true
    },

    "workshop": {
        id: "workshop",
        name: "Workshop",
        category: "Academic",
        lat: 24.832101,
        lng: 93.912864,
        description: "Central Workshop, Carpentry, Welding & Machining blocks.",
        icon: "fa-hammer",
        color: "#78716c",
        isSelectable: true
    },

    "auditorium": {
        id: "auditorium",
        name: "Auditorium",
        category: "Facilities",
        lat: 24.831574,
        lng: 93.911741,
        description: "Multipurpose auditorium for events, fests & cultural gatherings.",
        icon: "fa-masks-theater",
        color: "#f59e0b",
        isSelectable: true
    },

    "canteen": {
        id: "canteen",
        name: "Canteen",
        category: "Facilities",
        lat: 24.832621127362657,
        lng: 93.91385824711766,
        description: "Campus cafeteria, food stalls & refreshment area.",
        icon: "fa-utensils",
        color: "#eab308",
        isSelectable: true
    },

    "hostel_boys_1": {
        id: "hostel_boys_1",
        name: "Boys Hostel 1",
        category: "Hostels",
        lat: 24.832412,
        lng: 93.914429,
        description: "Senior Boys Residential Hostel Block.",
        icon: "fa-bed",
        color: "#3b82f6",
        isSelectable: true
    },

    "hostel_boys_2": {
        id: "hostel_boys_2",
        name: "Boys Hostel 2",
        category: "Hostels",
        lat: 24.831100,
        lng: 93.911176,
        description: "Junior Boys Residential Hostel Block.",
        icon: "fa-hotel",
        color: "#2563eb",
        isSelectable: true
    },

    "hostel_girls": {
        id: "hostel_girls",
        name: "Girls Hostel",
        category: "Hostels",
        lat: 24.835619,
        lng: 93.915138,
        description: "Girls Residential Hostel with 24x7 security.",
        icon: "fa-person-shelter",
        color: "#ec4899",
        isSelectable: true
    },

    "sports_complex": {
        id: "sports_complex",
        name: "NIT Ground",
        category: "Facilities",
        lat: 24.833575,
        lng: 93.915305,
        description: "Football Ground, Basketball Court & Indoor Sports Complex.",
        icon: "fa-volleyball",
        color: "#10b981",
        isSelectable: true
    },

    "health_centre": {
        id: "health_centre",
        name: "Health Centre",
        category: "Facilities",
        lat: 24.832814,
        lng: 93.913521,
        description: "Campus medical unit & emergency medical aid.",
        icon: "fa-notes-medical",
        color: "#ef4444",
        isSelectable: true
    },

    // =========================================================================
    // 2. WALKWAY & ROAD NETWORK PATH NODES (NON-SELECTABLE JUNCTIONS)
    // =========================================================================

    "p_gate": {
        id: "p_gate",
        name: "Main Entrance Road Node",
        category: "Walkway Node",
        lat: 24.833253740337025, 
        lng: 93.91411926574261,
        description: "Walkway node at campus entrance gate.",
        icon: "fa-circle-dot",
        color: "#64748b",
        isSelectable: false
    },

    
    "p_admin_jct": {
        id: "p_admin_jct",
        name: "Admin & Library Walkway Junction",
        category: "Walkway Node",
        lat: 24.833239504891367,
        lng: 93.9139802595141,
        description: "Intersection between Admin Block, Library, and Auditorium walkway.",
        icon: "fa-circle-dot",
        color: "#64748b",
        isSelectable: false
    },

    "p_academic_jct": {
        id: "p_academic_jct",
        name: "Academic Quad Junction",
        category: "Walkway Node",
        lat: 24.83260,
        lng: 93.91220,
        description: "Central Academic Quadrangle intersection.",
        icon: "fa-circle-dot",
        color: "#64748b",
        isSelectable: false
    },

    "p_dept_jct": {
        id: "p_dept_jct",
        name: "Department Spine Corridor Node",
        category: "Walkway Node",
        lat: 24.83300,
        lng: 93.91230,
        description: "Main department corridor walkway.",
        icon: "fa-circle-dot",
        color: "#64748b",
        isSelectable: false
    },

    "p_workshop_jct": {
        id: "p_workshop_jct",
        name: "Workshop Road Junction",
        category: "Walkway Node",
        lat: 24.83211006526585,
        lng: 93.91298624706346,
        description: "Road junction near Civil Dept and Workshop.",
        icon: "fa-circle-dot",
        color: "#64748b",
        isSelectable: false
    },

    "p_hostel_jct": {
        id: "p_hostel_jct",
        name: "Hostel Road Junction",
        category: "Walkway Node",
        lat: 24.832414877305336,
        lng: 93.91473930759474,
        description: "Junction leading to Boys Hostels.",
        icon: "fa-circle-dot",
        color: "#64748b",
        isSelectable: false
    },

   
    "p_west_path": {
    id: "p_west_path",
    name: "West Campus Pathway Node",
    category: "Walkway Node",
    lat: 24.834182096403406,
    lng: 93.91514375514986,
    description: "West pathway connecting Sports Ground and Girls Hostel.",
    icon: "fa-circle-dot",
    color: "#64748b",
    isSelectable: false
},

"p_girls_road_1": {
    id: "p_girls_road_1",
    name: "Girls Hostel Road Junction 1",
    category: "Walkway Node",
    lat: 24.835503208782995,
    lng: 93.91549259497602,
    description: "Walking path junction towards Girls Hostel.",
    icon: "fa-circle-dot",
    color: "#64748b",
    isSelectable: false
},

"p_junction_1": {
    id: "p_junction_1",
    name: "Path junction 1",
    category: "Walkway Node",
    lat: 24.833018287739243,
    lng: 93.91366456081899,
    description: "Walking path junction towards library or rightmost road.",
    icon: "fa-circle-dot",
    color: "#64748b",
    isSelectable: false
},

"p_junction_3": {
    id: "p_junction_3",
    name: "path junction 3",
    category: "Walkway Node",
    lat: 24.832753779918956,
    lng: 93.91384965168919,
    description: "Walking path junction towards library or canteen.",
    icon: "fa-circle-dot",
    color: "#64748b",
    isSelectable: false
},

"p_junction_5": {
    id: "p_junction_5",
    name: "path junction 5",
    category: "Walkway Node",
    lat: 24.832651943690177,
    lng: 93.91367080674796,
    description: "infront of library",
    icon: "fa-circle-dot",
    color: "#64748b",
    isSelectable: false
},

"p_junction_2": {
    id: "p_junction_2",
    name: "path junction 2",
    category: "Walkway Node",
    lat: 24.83299294170042,
    lng: 93.91426042170863,
    description: "infront of admin",
    icon: "fa-circle-dot",
    color: "#64748b",
    isSelectable: false
},

"p_junction_4": {
    id: "p_junction_4",
    name: "path junction 4",
    category: "Walkway Node",
    lat: 24.832901974468193,
    lng: 93.91345411651032,
    description: "infront of healthcenter",
    icon: "fa-circle-dot",
    color: "#64748b",
    isSelectable: false
}

};

/**
 * Weighted Graph Adjacency List for Dijkstra Calculation
 * 
 * Maps actual walkable pathways connecting building spur nodes to walkway road nodes.
 * Edge weights are actual ground walking distances in meters.
 */
const campusGraph = {
    // -------------------------------------------------------------------------
    // Main Walkway Road Network (Inter-junction connections)
    // -------------------------------------------------------------------------
    // "p_gate": {
    //     "main_gate": 0,
    //     "p_avenue_1": 45
    // },

    "p_avenue_1": {
        "p_gate": 45,
        "p_admin_jct": 60,
        "health_centre": 25
    },

    // "p_admin_jct": {
    //     "p_avenue_1": 60,
    //     "p_academic_jct": 70,
    //     "p_west_path": 80,
    //     "admin_block": 25,
    //     "central_library": 45,
    //     "auditorium": 40
    // },

    "p_gate": {
    "main_gate": 0,
},

"p_admin_jct": {
    "p_academic_jct": 70,
    "p_west_path": 80,
    "admin_block": 25,
    "auditorium": 40
},

    "p_academic_jct": {
        "p_admin_jct": 70,
        "p_dept_jct": 45,
        "p_west_path": 75,
        "central_library": 40,
        "canteen": 35,
        "cse_dept": 35
    },

    "p_dept_jct": {
        "p_academic_jct": 45,
        "p_workshop_jct": 70,
        "cse_dept": 20,
        "ece_dept": 15,
        "ee_dept": 35,
        "mech_dept": 35
    },

    "p_workshop_jct": {
        "p_dept_jct": 70,
        "p_hostel_jct": 40,
        "mech_dept": 35,
        "civil_dept": 35,
        "workshop": 25
    },

    "p_hostel_jct": {
        "p_workshop_jct": 40,
        "p_west_path": 180,
        "hostel_boys_1": 15,
        "hostel_boys_2": 45
    },

    "p_west_path": {
    "p_admin_jct": 80,
    "p_academic_jct": 75,
    "p_hostel_jct": 180,
    "sports_complex": 60,
    "p_girls_road_1": 151
},

"p_girls_road_1": {
    "p_west_path": 151,
    "hostel_girls": 25
},

    // -------------------------------------------------------------------------
    // Building Spur Connections to Walkway Network
    // -------------------------------------------------------------------------
    "main_gate": {
        "p_gate": 0,
        "p_junction_1": 47,
        "p_junction_2": 33
    },

    "admin_block": {
        "p_admin_jct": 25
    },

    "central_library": {
        "p_academic_jct": 40,
        "p_junction_5": 11
    },

    "auditorium": {
        "p_admin_jct": 40
    },

    // "health_centre": {
    //     "p_avenue_1": 25
    // },
    "health_centre": {
    "p_admin_jct": 25
},

    "canteen": {
        "p_academic_jct": 35
    },

    "cse_dept": {
        "p_academic_jct": 35,
        "p_dept_jct": 20
    },

    "ece_dept": {
        "p_dept_jct": 15
    },

    "ee_dept": {
        "p_dept_jct": 35
    },

    "mech_dept": {
        "p_dept_jct": 35,
        "p_workshop_jct": 35
    },

    "civil_dept": {
        "p_workshop_jct": 35
    },

    "workshop": {
        "p_workshop_jct": 25
    },

    "hostel_boys_1": {
        "p_hostel_jct": 15
    },

    "hostel_boys_2": {
        "p_hostel_jct": 45
    },

   "hostel_girls": {
    "p_girls_road_1": 25
},

    "sports_complex": {
        "p_west_path": 60
    },

    "p_junction_1": {
        "main_gate": 47,
        "p_junction_3": 35,
        "p_junction_4": 24
    },

    "p_junction_3": {
        "p_junction_1": 35,
        "p_junction_5": 21
    },

    "p_junction_5": {
        "p_junction_3": 21,
        "central_library": 11
    },
    
    "p_junction_2": {
        "main_gate": 33,
        "admin_block": 0
    },

    "p_junction_4": {
        "health_centre": 11,
        "p_junction_1": 24
    }

};

/**
 * Calculate Haversine distance in meters between two lat/lng coordinates
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

/**
 * Finds the nearest campus node (landmark or walkway node) to a given lat/lng position
 * @param {number} lat Latitude
 * @param {number} lng Longitude
 * @returns {Object} { nodeId, node, distanceMeters }
 */
function findNearestNode(lat, lng) {
    let nearestId = null;
    let minDistance = Infinity;

    for (const id in campusNodes) {
        const node = campusNodes[id];
        const dist = haversineDistance(lat, lng, node.lat, node.lng);
        if (dist < minDistance) {
            minDistance = dist;
            nearestId = id;
        }
    }

    return {
        nodeId: nearestId,
        node: campusNodes[nearestId],
        distanceMeters: minDistance
    };
}

/**
 * Checks if a given coordinate is within NIT Manipur permanent campus geographical bounds
 */
function isWithinCampusBounds(lat, lng) {
    const { minLat, maxLat, minLng, maxLng } = CAMPUS_CONFIG.bounds;
    return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
}
