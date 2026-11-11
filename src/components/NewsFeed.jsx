
import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

function NewsFeed() {
  // TAHAP 1: STATE SUMBER BERITA
  const [source, setSource] = useState('kompas');

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // TAHAP 2: DINAMISASI URL FETCH
  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `https://api.siputzx.my.id/api/berita/${source}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const json = await res.json();

      // TAHAP 3: NORMALISASI DATA ADAPTER
      const rawData = Array.isArray(json.data)
        ? json.data
        : [];

      const cleanData = rawData.map((d) => ({
        ...d,
        title: d.title || d.headline || d.judul || 'Tanpa Judul',
        headline: d.headline || d.title || d.judul || 'Tanpa Judul',
        description: d.description || d.content || d.summary || '',
        image: d.image || d.image_thumbnail || d.thumbnail || '',
        date: d.date || d.time || d.publishedAt || '',
        category: d.category || source.toUpperCase(),
        url: d.url || d.link || d.link_url || '#'
      }));

      setNews(cleanData);

    } catch (err) {
      setError(err.message || 'Gagal mengambil berita terkini.');
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  // TAHAP 4: REAKTIVITAS USEEFFECT
  useEffect(() => {
    fetchNews();
  }, [source]);

  return (
    <div className="news-container">

      <div className="news-toolbar">
        <div>
          <h2>Berita Terkini {source.toUpperCase()}</h2>
          <p>Menampilkan {news.length} artikel berita</p>
        </div>

        <button
          className="btn-refresh"
          onClick={fetchNews}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Memuat...' : '🔄 Segarkan Berita'}
        </button>
      </div>

      {/* PILIHAN SUMBER BERITA */}
      <div className="source-selector">
        <button
          className={`source-btn ${source === 'kompas' ? 'active' : ''}`}
          onClick={() => setSource('kompas')}
        >
          📰 Kompas
        </button>

        <button
          className={`source-btn ${source === 'cnn' ? 'active' : ''}`}
          onClick={() => setSource('cnn')}
        >
          🌐 CNN
        </button>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="spinner-box">
          <div className="css-spinner"></div>
          <p>Mengunduh berita terbaru...</p>
        </div>
      )}

      {/* ERROR */}
      {error && !isLoading && (
        <div className="error-banner">
          <h5>Terjadi Kesalahan Jaringan</h5>
          <p>{error}</p>

          <button onClick={fetchNews}>
            Coba Lagi
          </button>
        </div>
      )}

      {/* DAFTAR BERITA */}
      {!isLoading && !error && (
        <div className="news-grid">
          {news.length > 0 ? (
            news.map((item, i) => (
              <NewsCard key={item.url + i} {...item} />
            ))
          ) : (
            <p>Belum ada berita tersedia.</p>
          )}
        </div>
      )}

    </div>
  );
}

export default NewsFeed;
