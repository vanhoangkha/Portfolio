import { Helmet } from 'react-helmet-async';

export const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Kha Van Hoang</title>
        <meta name="description" content="Technical blog posts about cloud, AI/ML, and DevSecOps" />
      </Helmet>

      <section className="blog-page">
        <div className="container">
          <h1>Blog</h1>
          <p>Blog content will be implemented here</p>
        </div>
      </section>
    </>
  );
};
