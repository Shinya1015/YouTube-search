const apiKey = 'YOUR_YOUTUBE_API_KEY';  // 用您的 YouTube API 金鑰替換

document.getElementById('search-btn').addEventListener('click', function() {
    const query = document.getElementById('search-query').value;
    searchYouTube(query);
});

function searchYouTube(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayVideos(data.items);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayVideos(videos) {
    const resultsContainer = document.getElementById('video-results');
    resultsContainer.innerHTML = '';  // 清空之前的結果

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-item');
        videoElement.innerHTML = `
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
            <h3><a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">${video.snippet.title}</a></h3>
        `;
        resultsContainer.appendChild(videoElement);
    });
}
