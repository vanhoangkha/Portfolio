import { Helmet } from 'react-helmet-async';

export const ResumePage = () => {
  return (
    <>
      <Helmet>
        <title>Resume - Kha Van Hoang</title>
        <meta name="description" content="Professional resume of Kha Van Hoang" />
      </Helmet>

      <section className="resume-page">
        <div className="container">
          <h1>Resume</h1>
          <p>Resume content will be implemented here</p>
        </div>
      </section>
    </>
  );
};
