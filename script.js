document.addEventListener('DOMContentLoaded', () => {
  const loadContent = async (url, containerId) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const container = document.getElementById(containerId);
      data.forEach(item => {
        const card = document.createElement('div');
        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.link}" target="_blank">Read more</a>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  loadContent('data/papers.json', 'papers-container');
  loadContent('data/news.json', 'news-container');
});