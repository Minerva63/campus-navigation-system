# NIT Manipur Navigator

> **Smart Campus Navigation System for NIT Manipur using Dijkstra's Algorithm**

A web application developed for **NIT Manipur** to help students, faculty, and visitors find the shortest walking route between any locations on the NIT Manipur campus.

---

## 🌟 Project Highlights

- 🛰️ **High-Resolution Satellite Map View**: Uses Esri World Imagery satellite layer with transportation/road label overlays. Includes a 1-click **Satellite / Streets** toggle button on the map overlay.
- 📍 **Browser Geolocation Integration**: Requests browser position (`navigator.geolocation`) and snaps to the nearest campus node. If off-campus or permission is denied, gracefully allows manual campus start selection.
- 🗺️ **Interactive Leaflet Map**: Powered by Leaflet.js and OpenStreetMap (no paid API key required). Shows building markers, walking graph edges, and glowing shortest path polylines.
- 🧠 **Pure JavaScript Dijkstra Engine**: Handcrafted, explainable Dijkstra shortest-path calculation (no black-box routing API).
- 📊 **Dijkstra Step Trace & Visualizer**: Interactive presentation tab displaying algorithm execution steps, evaluated nodes count, and updated distance matrices—ideal for college project presentations!
- ⏱️ **Distance & Walking Time Estimation**: Calculates total path length in meters/kilometers and estimates walking time based on average walking speeds (~1.2 m/s).
- 📱 **Modern & Responsive UI**: Built with HTML5, CSS3 glassmorphism design, FontAwesome icons, and Google Fonts (`Outfit`). Optimized for mobile phones, tablets, and laptops.

---

## 📁 Project Structure

```text
c:\Users\Thoibi\OBC Project\
│
├── index.html            # Main HTML layout & UI structure
├── css/
│   └── style.css         # Styling system, responsive drawer, animations & map themes
├── js/
│   ├── campusData.js     # NIT Manipur building coordinates & weighted walking graph
│   ├── dijkstra.js       # Handcrafted Dijkstra's Shortest Path Algorithm class
│   └── app.js            # Leaflet map setup, geolocation & event handlers
└── README.md             # Project documentation & presentation guide
```

---

## 🏫 Campus Locations Included

- **Main Gate**
- **Administrative Block**
- **Central Library**
- **CSE Department**
- **ECE Department**
- **Electrical Engineering Department**
- **Mechanical Engineering Department**
- **Civil Engineering Department**
- **Central Workshop**
- **Auditorium / Open Air Theatre (OAT)**
- **Central Canteen**
- **Boys Hostel 1 & Boys Hostel 2**
- **Girls Hostel**
- **Sports Complex & Ground**
- **Health Centre**
- *Intermediate Walkway Junctions* (Main Gate Junction, Academic Square Junction, Hostel Road Intersection, Sports Gate Junction)

---

## ⚡ How Dijkstra's Algorithm Works in This System

1. **Graph Representation**:
   Campus locations are stored as nodes with latitude/longitude coordinates in `js/campusData.js`. Walkable connections are stored as an adjacency list:
   ```javascript
   const campusGraph = {
       "main_gate": { "j_main": 85, "hostel_girls": 140 },
       "admin_block": { "j_main": 120, "central_library": 80, ... }
   };
   ```
2. **Algorithm Execution (`js/dijkstra.js`)**:
   - Maintains a `distances` array initialized to `Infinity` for all nodes except start (`0`).
   - Picks the unvisited node with the minimum tentative distance.
   - Updates distances to its neighboring nodes if a shorter path is discovered via the current node.
   - Records pointers in a `previous` mapping to reconstruct the shortest path.
3. **Route & Map Rendering**:
   - The computed path sequence is drawn on the Leaflet map as an animated cyan polyline (`L.polyline`).
   - Total distance is calculated in meters, and walking time is estimated.

---

## 🛠️ How to Edit or Add Campus Locations

All geographical data and graph connections are isolated in `js/campusData.js`:

1. **To Add/Update a Building Coordinate**:
   Edit `campusNodes` object:
   ```javascript
   "new_building": {
       id: "new_building",
       name: "New Research Center",
       category: "Academic",
       lat: 24.8255,
       lng: 93.9025,
       description: "Description of building...",
       icon: "fa-flask",
       color: "#10b981",
       isSelectable: true
   }
   ```
2. **To Add a Walking Path (Edge)**:
   Edit `campusGraph` object with distance in meters:
   ```javascript
   "new_building": {
       "central_library": 60,
       "cse_dept": 40
   }
   ```

---

## 🚀 How to Run Locally

1. Open a terminal in the project directory:
   ```bash
   cd "c:\Users\Thoibi\OBC Project"
   ```
2. Start a simple HTTP server (e.g. Python):
   ```bash
   python -m http.server 8080
   ```
3. Open your browser at:
   `http://localhost:8080`

---

## 🎓 Technology Stack

- **HTML5** & **CSS3** (Custom Vanilla CSS design system)
- **JavaScript (ES6+)**
- **Leaflet.js** (Interactive Open-Source Map)
- **OpenStreetMap** (Map Tile Provider)
- **FontAwesome 6** & **Google Fonts (Outfit)**
