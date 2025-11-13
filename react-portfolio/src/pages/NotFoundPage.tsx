import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</p>
        <Link
          to="/"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#FF9900',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
          }}
        >
          Go Home
        </Link>
      </section>
    </>
  );
};
