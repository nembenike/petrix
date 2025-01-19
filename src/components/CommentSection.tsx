import { useState, useEffect } from 'react';
import { Comment } from '../types';
import { getComments, createComment } from '../services/api';
import toast from 'react-hot-toast';

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ name: '', content: '' });

  useEffect(() => {
    getComments(articleId).then(setComments);
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const promise = createComment({
      articleId,
      name: newComment.name,
      content: newComment.content,
    });

    toast.promise(promise, {
      loading: 'Hozzászólás küldése...',
      success: (comment) => {
        setComments(prev => [comment, ...prev]);
        setNewComment({ name: '', content: '' });
        return 'Hozzászólás sikeresen elküldve!';
      },
      error: 'Hiba történt a hozzászólás küldése során'
    });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-ctp-lavender">Hozzászólások</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          value={newComment.name}
          onChange={e => setNewComment(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Név"
          className="w-full p-3 rounded-lg bg-ctp-mantle border border-ctp-surface0 text-ctp-text"
        />
        <textarea
          value={newComment.content}
          onChange={e => setNewComment(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Írd ide a hozzászólásod..."
          className="w-full p-3 rounded-lg bg-ctp-mantle border border-ctp-surface0 text-ctp-text h-24"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-ctp-mauve text-ctp-base rounded-lg hover:bg-ctp-lavender"
        >
          Küldés
        </button>
      </form>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment._id} className="p-4 bg-ctp-mantle rounded-lg border border-ctp-surface0">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-ctp-lavender">{comment.name}</span>
              <span className="text-sm text-ctp-subtext0">
                {new Date(comment.createdAt).toLocaleDateString('hu-HU')}
              </span>
            </div>
            <p className="text-ctp-text">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 