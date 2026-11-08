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
        description: "Primary entrance gate to NIT Manipur campus with 24/7 security.",
        icon: "fa-door-open",
        color: "#3b82f6",
        isSelectable: true
    },

    "admin_block": {
        id: "admin_block",
        name: "Administrative Block",
        category: "Administrative",
        lat: 24.832943444832342,
        lng: 93.91417640087442,
        description: "Directorate, Dean Offices, Academic & General Administration, Account Section.",
        icon: "fa-building-columns",
        color: "#f65c97",
        isSelectable: true
    },

    "central_library": {
        id: "central_library",
        name: "Library",
        category: "Academic",
        lat: 24.832731955340428,
        lng: 93.91360788865191,
        description: "Central Library housing books, digital resources & reading halls.",
        icon: "fa-book-open",
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
        icon: "fa-graduation-cap",
        color: "#a855f7",
        isSelectable: true
    },

    "ece_dept": {
        id: "ece_dept",
        name: "ECE Department",
        category: "Departments",
        lat: 24.831586,
        lng: 93.912851,
        description: "Electronics & Communication Engineering Department.",
        icon: "fa-graduation-cap",
        color: "#a855f7",
        isSelectable: true
    },

    "ee_dept": {
        id: "ee_dept",
        name: "Electrical Engineering Department",
        category: "Departments",
        lat: 24.831904,
        lng: 93.913379,
        description: "Electrical Engineering Department & Power Systems Labs.",
        icon: "fa-graduation-cap",
        color: "#a855f7",
        isSelectable: true
    },

    "mech_dept": {
        id: "mech_dept",
        name: "Mechanical Engineering Department",
        category: "Departments",
        lat: 24.832460,
        lng: 93.912974,
        description: "Mechanical Engineering Department & Thermodynamics / Robotics Labs.",
        icon: "fa-graduation-cap",
        color: "#a855f7",
        isSelectable: true
    },

    "civil_dept": {
        id: "civil_dept",
        name: "Civil Engineering Department",
        category: "Departments",
        lat: 24.83257780551877,
        lng: 93.91372836690779,
        description: "Civil Engineering Department & Structural Design Labs.",
        icon: "fa-graduation-cap",
        color: "#a855f7",
        isSelectable: true
    },

    "math_dept": {
        id: "math_dept",
        name: "Mathematics Department",
        category: "Departments",
        lat: 24.832377466436835,
        lng: 93.91341582992422,
        description: "Mathematics Faculties Offices.",
        icon: "fa-graduation-cap",
        color: "#a855f7",
        isSelectable: true
    },

    "chem_dept": {
        id: "chem_dept",
        name: "Chemistry Department",
        category: "Departments",
        lat: 24.832471613973265,
        lng: 93.91384858653731,
        description: "Chemistry laboratory, Chemistry faculties Offices.",
        icon: "fa-graduation-cap",
        color: "#a855f7",
        isSelectable: true
    },

    "ece_lab": {
        id: "ece_lab",
        name: "ECE LAB 1",
        category: "Labs",
        lat: 24.832332991222174,
        lng: 93.91333764179836,
        description: "Electronics & Communication Laboratory 1.",
        icon: "fa-flask",
        color: "#10B981",
        isSelectable: true
    },

    "ee_lab": {
        id: "ee_lab",
        name: "EE LAB 1",
        category: "Labs",
        lat: 24.83221779755039,
        lng: 93.91313864226846,
        description: "Electrical Laboratory 1.",
        icon: "fa-flask",
        color: "#10B981",
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
        description: "Campus cafeteria, Printing, Xerox.",
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
        description: "Boys Residential Hostel Block 1.",
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
        description: "Boys Residential Hostel Block 2.",
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

    "LH_18": {
        id: "LH_18",
        name: "LH-18",
        category: "Lecture Halls",
        lat:24.832181769590196,
        lng:93.9136470338649,
        description: "Lecture hall 18",
        icon: "fa-chalkboard-user",
        color: "#F59E0B",
        isSelectable: true
    },

    "LH_19": {
        id: "LH_19",
        name: "LH-19",
        category: "Lecture Halls",
        lat:24.832094137762134,
        lng:93.91349683016747,
        description: "Lecture hall 19",
        icon: "fa-chalkboard-user",
        color: "#F59E0B",
        isSelectable: true
    },

    "LH_17": {
        id: "LH_17",
        name: "LH-17",
        category: "Lecture Halls",
        lat:24.831537695324297,
        lng:93.91250076804586,
        description: "Lecture hall 17",
        icon: "fa-chalkboard-user",
        color: "#F59E0B",
        isSelectable: true
    },

    "LH_16": {
        id: "LH_16",
        name: "LH-16",
        category: "Lecture Halls",
        lat:24.831617562247658,
        lng:93.91243692262368,
        description: "Lecture hall 16",
        icon: "fa-chalkboard-user",
        color: "#F59E0B",
        isSelectable: true
    },

    "LH_15": {
        id: "LH_15",
        name: "LH-15",
        category: "Lecture Halls",
        lat:24.831705259202185,
        lng:93.91236444944174,
        description: "Lecture hall 15",
        icon: "fa-chalkboard-user",
        color: "#F59E0B",
        isSelectable: true
    },


// ADDED JUNCTIONS

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
    // Building Spur Connections to Walkway Network
    // -------------------------------------------------------------------------
    "main_gate": {
        "p_gate": 0,
        "p_junction_1": 47,
        "p_junction_2": 33
    },

    "admin_block": {
        "p_junction_2": 0
    },

    "central_library": {
        "p_academic_jct": 40,
        "p_junction_5": 11
    },

    // ADDED JUNCTIONS
    "health_centre": {
    "p_junction_4": 11
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
