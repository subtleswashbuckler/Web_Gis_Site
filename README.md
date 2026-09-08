# Central Nigeria Geology Web GIS

## Project brief

### Spatial question

**Where are the mapped granite and basalt units distributed within the central-Nigeria study area, and how do their locations compare spatially?**

This is a single, place-based and answerable question: the application displays the two mapped rock units, lets a user toggle each unit, search by rock type, inspect attributes, and zoom to matching features.

### Study area

The study area is a small illustrative geology extent in **central Nigeria**, approximately **7.2–8.7° E and 8.5–9.2° N**, centred near Abuja. The map opens over Nigeria and the two geology polygons fall within this named study area.

## Datasets and sources

Every dataset used by the application is listed below with its source beside it.

| Dataset | How it is used | Source |
|---|---|---|
| OpenStreetMap standard tile basemap | Provides geographic context beneath the geology layer. | [OpenStreetMap](https://www.openstreetmap.org/) and [standard tile service](https://tile.openstreetmap.org/) |
| Illustrative central-Nigeria geology polygons | Two GeoJSON features representing Granite and Basalt, with rock type, geological age, colour, and polygon geometry. This is the project’s locally authored teaching dataset, stored in `Geodata.js`. | [Geodata.js in this repository](./Geodata.js) |

> The geology polygons are **illustrative project data**, not an official geological survey. They are included to demonstrate browser-based GIS layer display, filtering, attribute inspection, and spatial zooming. No additional hidden datasets are required to run the project.

## What the application does

- Displays an interactive Leaflet map with the OpenStreetMap basemap.
- Loads the local GeoJSON geology dataset.
- Shows Granite and Basalt with distinct colours.
- Provides layer controls, a rock-type filter, a text search, a zoom-to-results button, pop-up attributes, and rock-count statistics.

## Technology

- HTML5, CSS3, and JavaScript (ES6)
- [Leaflet](https://leafletjs.com/)
- GeoJSON

## Run locally

No build step or package installation is required. Clone the repository and serve the folder with any local static web server:

```bash
git clone https://github.com/SaviourNwibariKoki/Web_Gis_Site.git
cd Web_Gis_Site
python3 -m http.server 8000
```

Open [http://localhost:8000/](http://localhost:8000/) in a browser. Because the project loads JavaScript and map resources, use a local server rather than opening `Index.html` directly with a `file://` URL.

## Repository structure

- `Index.html` — application page and controls.
- `map.js` — Leaflet map, layer controls, filtering, searching, zooming, and statistics.
- `Geodata.js` — local illustrative GeoJSON dataset.
- `Style.css` — application styling.
- `auth.js` and `reg.html` — supporting pages included in the project.

## Live demo

[Web GIS Analyser](https://web-gis-analyser.netlify.app/)

## Author

Saviour Nwibari Koki
