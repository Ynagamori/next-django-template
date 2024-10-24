import { useEffect, useState } from "react";
import axios from "axios";

// Create a type for articles
type ArticleType = {
  article_id: number;
  article_heading: string;
  article_body: string;
}

export default function Home() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");

  // Fetch articles from the backend
  const getArticles = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BE_BASEURL}/api/article/`);
      setArticles(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  // Post new article to the backend
  const postNewArticle = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BE_BASEURL}/api/article/`, {
        article_heading: heading,
        article_body: body
      });
      getArticles();  // Refresh the article list
      setHeading(""); // Clear form
      setBody("");
    } catch (error) {
      console.error(error);
    }
  };

  // delete
  const deleteArticle = async (article_id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BE_BASEURL}/api/article/${article_id}/`);
      getArticles(); // Refresh the list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">記事投稿ページ</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="タイトル"
          className="input input-bordered w-full mb-4 px-4 py-2 rounded text-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        <textarea
          placeholder="本文"
          className="textarea textarea-bordered w-full mb-4 px-4 py-2 rounded text-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          onClick={postNewArticle}
          className="btn btn-primary w-1/2 py-2 text-lg border-2 rounded border-gray-300 hover:border-blue-500 mx-auto block"
        >
          送信
        </button>
      </div>
      <div>
        {articles.map((article) => (
          <div key={article.article_id} className="p-4 mb-2 shadow-lg rounded-lg relative">
            <button
              onClick={() => deleteArticle(article.article_id)}
              className="absolute top-0 right-0 p-2 text-lg"
            >
              ✗
            </button>
            <h2 className="text-2xl font-bold">{article.article_heading}</h2>
            <p>{article.article_body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}