import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import Problem from '../sections/Problem'
import Solution from '../sections/Solution'
import Demo from '../sections/Demo'
import Features from '../sections/Features'
import Pricing from '../sections/Pricing'
import CtaFinal from '../sections/CtaFinal'

export default function Landing() {
  return (
    <>
      <Seo
        title="AI-Powered CV Analyzer & ATS Scanner"
        description="Optimize your CV to pass ATS filters with GetMyATS. AI-powered analysis, job matching, bullet point enhancement, and interview practice. Created by Omar Khecharem."
        keywords="ATS scanner, CV analyzer, resume optimizer, AI CV analysis, job matching, bullet enhancer, interview preparation, Omar Khecharem, GetMyATS"
        canonicalUrl="https://get-my-ats.vercel.app/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'GetMyATS',
          url: 'https://get-my-ats.vercel.app',
          author: { '@type': 'Person', name: 'Omar Khecharem' },
          description:
            'AI-powered CV analysis platform to help job seekers pass ATS filters, match CVs with job descriptions, enhance bullet points, and practice interviews.',
          applicationCategory: 'Multimedia',
          operatingSystem: 'All',
        }}
      />
      <Hero />
      <Problem />
      <Solution />
      <Demo />
      <Features />
      <Pricing />
      <CtaFinal />
    </>
  )
}
