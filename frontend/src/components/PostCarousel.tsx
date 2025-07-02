import { JSX, useEffect, useState } from "react";

/**
 * PostCarousel component that automatically cycles through posts every 10 seconds.
 * Displays the title and content of the current post.
 */
export default function PostCarousel(): JSX.Element {
  const [posts, setPosts] = useState<{ title: string; content: string }[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts(): Promise<void> {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${apiUrl}/posts`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedPosts = data.map((post: { title: string; content: string }) => ({
          title: post.title,
          content: post.content,
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [posts.length]);

  if (loading) {
    return (
      <section className="flex flex-col h-[60dvh] justify-center items-center p-20">
        <p className="text-lg">Carregant merakis...</p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="flex flex-col h-[60dvh] justify-center items-center p-20">
        <p className="text-lg text-red-500">No s'han trobat merakis disponibles.</p>
      </section>
    );
  }

  const currentPost = posts[currentPostIndex];

  return (
    <section className="flex flex-col h-[60dvh] justify-center items-center p-20">
      <h2 className="text-2xl font-bold mb-4">{currentPost.title}</h2>
      <p className="text-lg whitespace-pre-line">{currentPost.content}</p>
    </section>
  );
};