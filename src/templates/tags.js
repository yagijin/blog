import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Header from '../components/Header'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `"${tag}"とタグ付けされた記事が${totalCount}つ見つかりました．`

    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug} className="outtag">
        <Link to={post.node.fields.slug} className="intag intag-h">
        {post.node.frontmatter.title}
        {post.node.frontmatter.featuredimage ? (
          <div className="featured-thumbnail">
            <PreviewCompatibleImage
              imageInfo={{
                image: post.node.frontmatter.featuredimage,
                alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
              }}
            />
          </div>
        ) : null}
        </Link>
      </li>
    ))

    return (
      <Layout>
        <Header/>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: '6rem' }}
              >
                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
                <ul className="taglist">{postLinks}</ul>
                <p>
                  <Link to="/tags/">→全てのタグを見る</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
