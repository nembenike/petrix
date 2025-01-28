const API_URL = 'https://petrix-backend-git-main-drinkmonsters-projects.vercel.app/api';

export const getArticles = async (category?: string, page = 1) => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(category && { category })
  });
  const response = await fetch(`${API_URL}/articles?${params}`);
  return response.json();
};

export const getArticle = async (id: string) => {
  const response = await fetch(`${API_URL}/articles/${id}`);
  return response.json();
};

export const createArticle = async (articleData: any) => {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  });
  return response.json();
};

export const getComments = async (articleId: string) => {
  const response = await fetch(`${API_URL}/comments/${articleId}`);
  return response.json();
};

export const createComment = async (comment: { articleId: string; name: string; content: string }) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  return response.json();
}; 
