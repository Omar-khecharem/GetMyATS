import { Helmet } from 'react-helmet-async'

const defaultTitle = 'GetMyATS – AI-Powered CV Analyzer & ATS Scanner'
const defaultDescription =
  'Optimize your CV to pass ATS filters with GetMyATS. AI-powered CV analysis, job matching, bullet point enhancement, and interview preparation. Built by Omar Khecharem.'
const siteUrl = 'https://get-my-ats.vercel.app'
const defaultImage = `${siteUrl}/og-image.png`

export default function Seo({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  jsonLd,
}) {
  const pageTitle = title ? `${title} | GetMyATS` : defaultTitle
  const pageDesc = description || defaultDescription
  const canonical = canonicalUrl || siteUrl
  const image = ogImage || defaultImage

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Omar Khecharem" />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="GetMyATS" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
