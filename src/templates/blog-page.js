import React from 'react'
import Layout from '../components/Layout'
import { Link, graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import PagenationBar from '../components/PagenationBar'
import headerPic from '../img/header.jpg'

export default class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
 
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url(${
              headerPic
            })`,
            height: '150px',
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #698474, -0.5rem 0 0 #698474',
              backgroundColor: '#698474',
              color: 'white',
              padding: '0.25rem',
            }}
          >
            記事アーカイブ
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <div className="columns is-multiline">
                {posts &&
                  posts.map(({ node: post }) => (
                    <div className="is-parent column is-6" key={post.id}>
                      <article
                        className={`blog-list-item tile is-child box notification ${
                          post.frontmatter.featuredpost ? 'is-featured' : ''
                        }`}
                      >
                        <header>
                          {post.frontmatter.featuredimage ? (
                            <div className="featured-thumbnail">
                              <PreviewCompatibleImage
                                imageInfo={{
                                  image: post.frontmatter.featuredimage,
                                  alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                }}
                              />
                            </div>
                          ) : null}
                          <p className="post-meta">
                            <Link
                              className="title has-text-primary is-size-4"
                              to={post.fields.slug}
                            >
                              {post.frontmatter.title}
                            </Link>
                            <span> &bull; </span>
                            <span className="subtitle is-size-5 is-block">
                              {post.frontmatter.date}
                            </span>
                          </p>
                        </header>
                        <p>
                          {post.excerpt}
                          <br />
                          <br />
                          <Link className="button" to={post.fields.slug}>
                            Read →
                          </Link>
                        </p>
                      </article>
                    </div>
                  ))}
              </div>
              <PagenationBar pageContext={this.props.pageContext}/>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export const BlogIndexPageQuery = graphql`
  query BlogIndexPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
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
  }`
