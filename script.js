document.addEventListener('DOMContentLoaded', () => {
  const loadContent = async (url, containerId) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Sort data by date (ascending)
      data.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Group news by date
      const groupedByDate = {};
      data.forEach(item => {
        if (!groupedByDate[item.date]) {
          groupedByDate[item.date] = [];
        }
        groupedByDate[item.date].push(item);
      });

      // Render the grouped content
      const container = document.getElementById(containerId);
      for (const date in groupedByDate) {
        const dateHeading = document.createElement('h3');
        dateHeading.textContent = date;
        container.appendChild(dateHeading);

        const newsList = document.createElement('ul');
        groupedByDate[date].forEach(item => {
          const newsItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = item.link;
          link.textContent = item.title;
          link.target = '_blank'; // Open in a new tab
          newsItem.appendChild(link);
          newsList.appendChild(newsItem);
        });
        container.appendChild(newsList);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  loadContent('data/papers.json', 'papers-container');
  loadContent('data/news.json', 'news-container');
});