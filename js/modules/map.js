
import { openPopup } from './popup.js';

// Map initialization and GeoJSON handling
export const initMap = async () => {
    console.log('Initializing Map...');
    const map = L.map('map', {
        minZoom: 2,
        maxBounds: [[-90, -180], [90, 180]],
        maxBoundsViscosity: 1.0
    }).setView([35, 130], 4); // Center on East Asia

    // Add tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors & CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
        noWrap: true
    }).addTo(map);

    // Expose map globally for compatibility with legacy scripts (interactivePopup.js)
    window.map = map;

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'country-tooltip';
    document.body.appendChild(tooltip);

    // Fetch and add GeoJSON
    try {
        const response = await fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson');
        const data = await response.json();

        const geoJsonLayer = L.geoJSON(data, {
            style: feature => ({
                color: '#999',
                weight: 1.5,
                fillColor: '#888',
                fillOpacity: 0.4,
            }),
            onEachFeature: (feature, layer) => {
                let originalStyle = null;

                layer.on({
                    mouseover: e => {
                        const targetLayer = e.target;
                        originalStyle = { ...targetLayer.options };
                        targetLayer.setStyle({
                            fillColor: '#333',
                            fillOpacity: 0.9,
                        });

                        const countryName = feature.properties.ADMIN || feature.properties.name || 'Unknown';
                        tooltip.innerText = countryName;
                        tooltip.style.display = 'block';
                    },
                    mousemove: e => {
                        tooltip.style.left = `${e.originalEvent.pageX}px`;
                        tooltip.style.top = `${e.originalEvent.pageY}px`;
                    },
                    mouseout: e => {
                        const targetLayer = e.target;
                        targetLayer.setStyle(originalStyle);
                        tooltip.style.display = 'none';
                    },
                    click: e => {
                        const countryName = feature.properties.ADMIN || feature.properties.name || 'Unknown';
                        openPopup(countryName, e);
                    }
                });
            },
        }).addTo(map);

        console.log('Map initialized and GeoJSON loaded.');
        return { map, geoJsonLayer, geoJsonData: data };
    } catch (error) {
        console.error('Error loading GeoJSON:', error);
        return { map, geoJsonLayer: null, geoJsonData: null };
    }
};
