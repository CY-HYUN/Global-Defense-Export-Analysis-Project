
import config from '../../js/config.js'; // Import from original location for now

export const initNews = async () => {
    console.log('Initializing News...');
    await fetchNews();
};

async function fetchNews() {
    const apiKey = config.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=defense OR military OR war OR armed conflict&language=en&apiKey=${apiKey}`;
    
    const newsContainer = document.getElementById("news-container");
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayHighlightedNews(data.articles[0]);
            displaySliderNews(data.articles.slice(1, 6));
            displayAdditionalNews(data.articles.slice(6));
        } else {
            if(newsContainer) newsContainer.innerHTML = "<p>No news available at the moment.</p>";
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        if(newsContainer) newsContainer.innerHTML = `<p>Failed to load news. Please try again later. (${error.message})</p>`;
    }
}

function displayHighlightedNews(article) {
    const img = document.querySelector(".highlighted-news-image");
    const title = document.querySelector(".highlighted-news-content h2 a");
    const desc = document.querySelector(".highlighted-news-content p");
    const author = document.querySelector(".highlighted-news-content .author");

    if(img) img.src = article.urlToImage || "assets/images/placeholder.jpg";
    if(title) {
        title.innerText = article.title || "No Title";
        title.href = article.url || "#";
    }
    if(desc) desc.innerText = article.description || "No Description";
    if(author) author.innerText = `By ${article.author || "Unknown"} - ${new Date(article.publishedAt).toLocaleDateString()}`;
}

function displaySliderNews(articles) {
    const slider = document.querySelector(".news-slider");
    if (!slider) return;
    
    slider.innerHTML = "";

    articles.forEach(article => {
        const newsHTML = `
            <div class="news-item">
                <img src="${article.urlToImage || 'assets/images/placeholder.jpg'}" alt="News Image" />
                <h3><a href="${article.url || '#'}" target="_blank">${article.title || "No Title"}</a></h3>
                <p class="author">By ${article.author || "Unknown"} - ${new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
        `;
        slider.innerHTML += newsHTML;
    });
}

function displayAdditionalNews(articles) {
    const container = document.getElementById("news-container");
    if (!container) return;

    container.innerHTML = "";

    articles.slice(0, 3).forEach((article) => {
        const newsHTML = `
            <div class="news-item">
                <img src="${article.urlToImage || 'assets/images/placeholder.jpg'}" alt="News Image">
                <div class="news-content">
                    <h3><a href="${article.url}" target="_blank">${article.title || 'No Title'}</a></h3>
                    <p>${article.description || 'No description available.'}</p>
                    <p class="news-date">${new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.innerHTML += newsHTML;
    });
}
