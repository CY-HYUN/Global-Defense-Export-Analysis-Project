
import { initMap } from './modules/map.js';
import { initUI } from './modules/ui.js';
import { initNews } from './modules/news.js';
import { initSearch } from './modules/search.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Main script loaded.');
    
    // Initialize Map and get the map instance
    const { map } = await initMap();

    // Initialize UI components
    initUI();

    // Initialize News
    initNews();

    // Initialize Search with map instance
    initSearch(map);
});
