import { articles } from '../data';
import ArticleCard from '../components/ArticleCard';
import Header from '../components/Header';

export default function Blog({ posts }) {
  return (
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        <h1 style={{ color: '#fff' }}>Blog</h1>
        {posts.map(article => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
          />
        ))}
      </main>
    </>
  );
}

// Ejecutado en build time
export async function getStaticProps() {
  return {
    props: {
      posts: articles
    }
  };
}
