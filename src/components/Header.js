import React from 'react'
import { Link } from 'gatsby'

export default function Header () {

  return(
    <div
    className="full-width-image margin-top-0 header-box"
    >
    <h1
      className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
      style={{
        boxShadow:
          '#698474 0.5rem 0px 0px, #698474 -0.5rem 0px 0px',
        backgroundColor: "white",
        lineHeight: '1',
        padding: '0.25em',
        fontFamily: 'TsukuARdGothic-Regular',
        fontWeight: "bold",
        borderRadius: "5px"
      }}
    >
      <Link to="/" className="title-link">
        YAGIJIN'S BLOG
      </Link>
    </h1>
    </div>
  )
}