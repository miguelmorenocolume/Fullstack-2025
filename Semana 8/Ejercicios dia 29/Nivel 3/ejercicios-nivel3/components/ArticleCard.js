export default function ArticleCard({ title, description }) {
  return (
    <div style={{
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: '#1e1e1e',
      color: '#fff'
    }}>
      <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
