const map = L.map("map").setView([9.0765, 7.3986], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

function styleFeature(f) {
  return {
    fillColor: f.properties.color,
    color: "#000",
    weight: 1,
    fillOpacity: 0.6
  };
}

function onEachFeature(f, l) {
  l.bindPopup(
    `<b>Rock:</b> ${f.properties.rock}<br>
     <b>Age:</b> ${f.properties.age}`
  );
}

let geoLayer, lastSearched = [];

function loadGeoData(data) {
  if (geoLayer) map.removeLayer(geoLayer);

  geoLayer = L.geoJSON(data, {
    style: styleFeature,
    onEachFeature
  }).addTo(map);

  updateStats(data);
}

function updateStats(data) {
  const count = {};
  data.features.forEach(f => {
    count[f.properties.rock] = (count[f.properties.rock] || 0) + 1;
  });

  let html = "<b>Rock Statistics</b><br>";
  for (let r in count) html += `${r}: ${count[r]}<br>`;

  stats.innerHTML = html;
}

// for the search icon area */
searchInput.addEventListener("keyup", e => {
  lastSearched = geologyData.features.filter(f =>
    f.properties.rock.toLowerCase().includes(e.target.value.toLowerCase())
  );

  loadGeoData({ type: "FeatureCollection", features: lastSearched });
});

// filter side */
filterSelect.addEventListener("change", e => {
  const f = e.target.value === "all"
    ? geologyData.features
    : geologyData.features.filter(g => g.properties.rock === e.target.value);

  loadGeoData({ type: "FeatureCollection", features: f });
});

// for the spatial zoom */
zoomBtn.addEventListener("click", () => {
  if (!lastSearched.length) return alert("No feature found");
  map.fitBounds(L.geoJSON(lastSearched).getBounds());
});

// for layer control */
L.control.layers(null, {
  Granite: L.geoJSON(geologyData, { filter: f => f.properties.rock === "Granite" }),
  Basalt: L.geoJSON(geologyData, { filter: f => f.properties.rock === "Basalt" })
}).addTo(map);

// map explanation panel aka "LEGEND" */
const legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div", "legend");
  div.innerHTML = "<b>Legend</b><br>";

  const unique = {};
  geologyData.features.forEach(f => {
    unique[f.properties.rock] = f.properties.color;
  });

  for (let rock in unique) {
    div.innerHTML +=
      `<i style="background:${unique[rock]}"></i> ${rock}<br>`;
  }

  return div;
};

legend.addTo(map);
