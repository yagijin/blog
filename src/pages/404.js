import React from 'react'
import Layout from '../components/Layout'
import '../components/all.sass'
import Header from '../components/Header'

const NotFound = () => (
  <Layout>
    <Header/>
      <div className="notfound-main">
        <h3 className="has-text-weight-bold is-size-big has-text-centered">
          404 
        </h3>
        <h3 className="has-text-weight-bold is-size-1 has-text-centered">
          <span role="img" aria-label="cry">😭</span>
        </h3>
        <h3 className="has-text-weight-bold is-size-2 has-text-centered">
          Page Not Found
        </h3>
        <p className="has-text-centered">
          お探しのページは存在しません．
        </p>
      </div>
  </Layout>
)

export default NotFound
