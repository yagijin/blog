import React from 'react'
import Layout from '../../components/Layout'
import '../../components/all.sass'
import Header from '../../components/Header'

import facebook from '../../img/social/facebook.svg'
import instagram from '../../img/social/instagram.svg'
import twitter from '../../img/social/twitter.svg'
import github from '../../img/github-icon.svg'

const AboutPage = () => (
  <Layout>
    <Header/>
    <section className="section section--gradient" style={{paddingTop: "0px"}}>
      <div className="container">
        <div className="section" style={{paddingBottom: "0px"}}>
          <div className="columns">
            <div className="column is-10">
              <div className="content">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    このブログについて
                  </h3>
                  <p>
                    このサイトはやぎじんの技術や趣味のブログです．
                  </p>
                  <div className="column is-12 about-social">
                    <a title="facebook" href="https://facebook.com/yagijim">
                      <img
                        src={facebook}
                        alt="Facebook"
                        style={{ width: '2em', height: '2em' }}
                      />
                    </a>
                    <a title="twitter" href="https://twitter.com/yagijinjin">
                      <img
                        className="fas fa-lg"
                        src={twitter}
                        alt="Twitter"
                        style={{ width: '2em', height: '2em' }}
                      />
                    </a>
                    <a title="instagram" href="https://www.instagram.com/yagijimjim">
                      <img
                        src={instagram}
                        alt="Instagram"
                        style={{ width: '2em', height: '2em' }}
                      />
                    </a>
                    <a title="github" href="https://github.com/yagijin">
                      <img
                        src={github}
                        alt="Github"
                        style={{ width: '2em', height: '2em' }}
                      />
                    </a>
                  </div>
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