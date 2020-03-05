import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div>
      <Helmet>
        <html lang="ja"/>
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="Yagijin\'s Blog" />
        <meta property="og:url" content="https://blog.yagijin.com" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.png`}
        />
      </Helmet>
      <div className="main-page-content">
        <div className="main-content">{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default TemplateWrapper
