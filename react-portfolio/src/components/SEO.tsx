import { Helmet } from 'react-helmet-async';
import { SEOConfig, defaultSEO } from '@utils/seo';

interface SEOProps extends Partial<SEOConfig> {
  // Article-specific props
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  // Enhanced props
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: string;
  url?: string;
  locale?: string;
  siteName?: string;
  noindex?: boolean;
}

export const SEO = ({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  ogImage = defaultSEO.ogImage,
  ogType = defaultSEO.ogType,
  twitterCard = defaultSEO.twitterCard,
  canonicalUrl,
  // New props
  article = false,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  image,
  imageAlt,
  imageWidth = 1200,
  imageHeight = 630,
  type,
  url,
  locale = 'en_US',
  siteName = 'Kha Van Hoang Portfolio',
  noindex = false,
}: SEOProps) => {
  const fullTitle = title.includes('|') ? title : `${title} | Kha Van Hoang`;
  const pageUrl = url || canonicalUrl || window.location.href;
  const ogImageUrl = image || ogImage;
  const contentType = type || ogType || (article ? 'article' : 'website');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />}
      <link rel="canonical" href={pageUrl} />

      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph - Basic */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={contentType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Open Graph - Image */}
      {ogImageUrl && (
        <>
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:image:secure_url" content={ogImageUrl} />
          <meta property="og:image:width" content={String(imageWidth)} />
          <meta property="og:image:height" content={String(imageHeight)} />
          {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
        </>
      )}

      {/* Open Graph - Article */}
      {article && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@vanhoangkha" />
      <meta name="twitter:site" content="@vanhoangkha" />
      {ogImageUrl && (
        <>
          <meta name="twitter:image" content={ogImageUrl} />
          {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="author" content={author || "Kha Van Hoang"} />
      <meta name="language" content="English" />
      
      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#007bff" />
    </Helmet>
  );
};
