import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { getArticle } from '../services/api';
import CommentSection from '../components/CommentSection';

interface Article {
  _id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  imageUrl: string;
}

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      getArticle(id).then(setArticle);
    }
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-ctp-base text-ctp-text">
      <div className="container mx-auto px-8 py-6">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-lg"
        />
        <div className="mt-6">
          <span className="text-ctp-mauve font-bold">{article.category}</span>
          <h1 className="text-4xl font-bold mt-2">{article.title}</h1>
          <p className="mt-4 text-ctp-subtext0">{article.summary}</p>
          <div className="prose prose-invert max-w-none mt-8">
            <MDEditor.Markdown source={article.content} />
          </div>
        </div>

        {id && <CommentSection articleId={id} />}
      </div>
    </div>
  );
} 