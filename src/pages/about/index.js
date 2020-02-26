import React from 'react'
import Layout from '../../components/Layout'
import '../../components/all.sass'
import headerPic from '../../img/header.jpg'

const AboutPage = () => (
  <Layout>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          headerPic
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
        height: '150px'
      }}
    >
      <h1
        className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
        style={{
          boxShadow:
            '#698474 0.5rem 0px 0px, #698474 -0.5rem 0px 0px',
          backgroundColor: '#698474',
          color: 'white',
          lineHeight: '1',
          padding: '0.25em',
        }}
      >
        やぎじんのブログ
      </h1>
    </div>
    <section className="section section--gradient" style={{paddingTop: "0px"}}>
      <div className="container">
        <div className="section" style={{paddingBottom: "0px"}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    このブログについて
                  </h3>
                  <p>
                    このサイトはやぎじんの技術や趣味のブログです．
                  </p>
                  <h3 className="has-text-weight-semibold is-size-2">
                    僕について
                  </h3>
                  <p>
                    静岡出身のエンジニア，名城大学大学院在学中
                  </p>
                  <h3 className="has-text-weight-semibold is-size-2">
                    連絡先
                  </h3>
                  <p>
                    連絡は下部フッターのSNSにお願いいたします．
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default AboutPage