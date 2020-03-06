import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import Header from '../components/Header'
import GetAllTags from '../components/GetAllTags'

const IndexPage = () => (
  <Layout>
    <Header/>
    <section className="section section--gradient" style={{padding: "10px"}}>
      <div className="container">
        <div className="section" style={{paddingBottom: "0px"}}>
          <div className="columns">
            <div className="column is-three-quarters">
              <div className="content">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    最近の投稿
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered"  style={{marginTop: "20px"}}>
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="has-text-weight-semibold is-size-2 tag-title">
                人気のタグ
              </h3>
              <GetAllTags/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
