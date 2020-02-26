import React from 'react'
import { Link } from 'gatsby'

import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import github from '../img/github-icon.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div className="columns">
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li  className="menu-child">
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li  className="menu-child">
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                    </li>
                    <li  className="menu-child">
                      <Link className="navbar-item" to="/blog">
                        Blogs
                      </Link>
                    </li>
                    <li  className="menu-child">
                      <Link className="navbar-item" to="/privacy">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4">
              </div>
              <div className="column is-4 social">
                <a title="facebook" href="https://facebook.com/yagijim">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="twitter" href="https://twitter.com/yagijinjin">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="https://www.instagram.com/yagijimjim">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="github" href="https://github.com/yagijin">
                  <img
                    src={github}
                    alt="Github"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
            </div>
            <div className="columns">
              <div className="column is-12">
                <div>Copyright © Jin Yagi 2020 - All Rights Reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
