import { useEffect, useState } from 'react';
import { getArticles } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface Article {
  _id: string;
  title: string;
  category: string;
  summary: string;
  imageUrl: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then(data => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch articles:', error);
        toast.error('Hiba történt a cikkek betöltése során');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-ctp-base text-ctp-text">
      <div className="container mx-auto px-8 py-6">
        {/* Featured Article */}
        <div className="mb-12">
          {articles[0] && (
            <article className="bg-ctp-mantle rounded-lg overflow-hidden border border-ctp-surface0">
              <Link to={`/article/${articles[0]._id}`}>
                <img 
                  src={articles[0].imageUrl} 
                  alt={articles[0].title} 
                  className="w-full h-[500px] object-cover"
                />
                <div className="p-6">
                  <span className="text-ctp-red font-bold">{articles[0].category.toUpperCase()}</span>
                  <h2 className="text-4xl font-bold mt-2 text-ctp-text hover:text-ctp-lavender transition-colors">
                    {articles[0].title}
                  </h2>
                  <p className="mt-3 text-lg text-ctp-subtext0">{articles[0].summary}</p>
                </div>
              </Link>
            </article>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map(article => (
            <article key={article._id} className="bg-ctp-mantle rounded-lg overflow-hidden border border-ctp-surface0 hover:border-ctp-surface1 transition-colors">
              <Link to={`/article/${article._id}`}>
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-ctp-blue font-bold text-sm">{article.category.toUpperCase()}</span>
                  <h3 className="text-xl font-bold mt-2 hover:text-ctp-lavender transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-ctp-subtext0 line-clamp-2">{article.summary}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 